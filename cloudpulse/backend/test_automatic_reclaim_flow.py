import asyncio
import json
import unittest
from httpx import AsyncClient, ASGITransport
from main import app
from app.core.database import AsyncSessionLocal
from app.models.resource import Resource
from sqlalchemy.future import select
from app.services.vega_controller import vega_controller
from app.services.simulated_driver import SimulatedCloudDriver
from unittest.mock import MagicMock

class TestAutomaticReclaimFlow(unittest.IsolatedAsyncioTestCase):

    async def asyncSetUp(self):
        self.transport = ASGITransport(app=app)
        self.client = AsyncClient(transport=self.transport, base_url="http://test")
        
        # Reset demo database state
        await self.client.post("/api/v1/resources/demo/reset")

    async def asyncTearDown(self):
        await self.client.aclose()

    async def test_1_true_idle_safe_vega_approved_auto_reclaims(self):
        """TEST 1: Resource becomes TRUE_IDLE + Safety Gate PASSED + VEGA approved -> auto reclaim occurs -> state becomes RECLAIMED."""
        print("\n=== RUNNING TEST 1: TRUE_IDLE + Safety Gate PASSED + VEGA approved ===")
        
        # Mock physical VEGA hardware serial responding APPROVED
        mock_serial = MagicMock()
        mock_serial.is_open = True
        mock_serial.in_waiting = 8
        mock_serial.readline.return_value = b"APPROVED\n"
        vega_controller.serial_connection = mock_serial
        vega_controller.simulation_mode = False

        # Staging-api is configured as idle in SimulatedCloudDriver
        r = await self.client.post("/api/v1/resources/staging-api/analyze")
        data = r.json()
        
        self.assertEqual(r.status_code, 200)
        self.assertEqual(data["evaluation"]["is_idle"], True)
        self.assertEqual(data["evaluation"]["ml_classification"], "TRUE_IDLE")
        self.assertEqual(data["safety_gate"]["status"], "PASSED")
        self.assertEqual(data["safety_gate"]["state"], "SAFE_TO_RECLAIM")
        self.assertEqual(data["state"], "RECLAIMED")
        self.assertIsNotNone(data["auto_reclaim"])
        self.assertEqual(data["auto_reclaim"]["status"], "success")
        self.assertEqual(data["auto_reclaim"]["new_state"], "RECLAIMED")

        # Verify in database
        async with AsyncSessionLocal() as db:
            q = await db.execute(select(Resource).where(Resource.resource_name == "staging-api"))
            res = q.scalars().first()
            self.assertEqual(res.state, "RECLAIMED")
            
        print(" [PASS] TEST 1 passed: Resource safely auto-reclaimed to RECLAIMED state.")

    async def test_2_running_active_workload_no_auto_reclaim(self):
        """TEST 2: Resource is RUNNING/ACTIVE -> no automatic reclaim."""
        print("\n=== RUNNING TEST 2: Active Busy Workload Protection ===")
        
        # sandbox-01 is configured as ACTIVE in SimulatedCloudDriver (CPU ~78%, Sockets 14)
        vega_controller.set_simulation_mode(True)

        r = await self.client.post("/api/v1/resources/sandbox-01/analyze")
        data = r.json()

        self.assertEqual(r.status_code, 200)
        self.assertEqual(data["evaluation"]["is_idle"], False)
        self.assertEqual(data["safety_gate"]["status"], "BLOCKED")
        self.assertEqual(data["state"], "RUNNING")
        self.assertIsNone(data["auto_reclaim"])

        # Verify in database
        async with AsyncSessionLocal() as db:
            q = await db.execute(select(Resource).where(Resource.resource_name == "sandbox-01"))
            res = q.scalars().first()
            self.assertEqual(res.state, "RUNNING")

        print(" [PASS] TEST 2 passed: Active workload stayed RUNNING, no auto-reclaim.")

    async def test_3_idle_but_safety_gate_fails_no_auto_reclaim(self):
        """TEST 3: Resource is idle (CPU low) but Safety Gate fails (sockets > 0) -> no automatic reclaim."""
        print("\n=== RUNNING TEST 3: Idle with Open Socket Blocked by Safety Gate ===")
        
        # dev-worker simulated with active sockets
        orig_get_metrics = SimulatedCloudDriver.get_simulated_metrics
        def mock_metrics(resource_id, environment=None):
            m = orig_get_metrics(resource_id, environment)
            m["active_connections"] = 3 # Safety violation
            m["cpu_utilization"] = 1.2
            return m

        SimulatedCloudDriver.get_simulated_metrics = staticmethod(mock_metrics)
        vega_controller.set_simulation_mode(True)

        try:
            r = await self.client.post("/api/v1/resources/dev-worker/analyze")
            data = r.json()

            self.assertEqual(r.status_code, 200)
            self.assertEqual(data["safety_gate"]["status"], "BLOCKED")
            self.assertEqual(data["state"], "RUNNING")
            self.assertIsNone(data["auto_reclaim"])

            # Verify in database
            async with AsyncSessionLocal() as db:
                q = await db.execute(select(Resource).where(Resource.resource_name == "dev-worker"))
                res = q.scalars().first()
                self.assertEqual(res.state, "RUNNING")

            print(" [PASS] TEST 3 passed: Safety gate failure blocked auto-reclaim.")
        finally:
            SimulatedCloudDriver.get_simulated_metrics = orig_get_metrics

    async def test_4_vega_unavailable_blocks_auto_reclaim(self):
        """TEST 4: VEGA unavailable when VEGA approval is required -> no automatic reclaim."""
        print("\n=== RUNNING TEST 4: VEGA Hardware Offline Protection ===")
        
        # Disconnect VEGA and disable simulation mode on non-existent port
        vega_controller.disconnect()
        vega_controller.port = "COM99_OFFLINE"
        vega_controller.simulation_mode = False

        r = await self.client.post("/api/v1/resources/staging-api/analyze")
        data = r.json()

        self.assertEqual(r.status_code, 200)
        self.assertEqual(data["hardware_connected"], False)
        self.assertEqual(data["vega_status"], "VEGA_OFFLINE")
        # Since VEGA was offline during auto_reclaim, reclaim was blocked and state remains RUNNING
        self.assertEqual(data["state"], "RUNNING")
        if data["auto_reclaim"]:
            self.assertEqual(data["auto_reclaim"]["status"], "blocked")
            self.assertEqual(data["auto_reclaim"]["vega_status"], "VEGA_OFFLINE")

        # Verify in database
        async with AsyncSessionLocal() as db:
            q = await db.execute(select(Resource).where(Resource.resource_name == "staging-api"))
            res = q.scalars().first()
            self.assertEqual(res.state, "RUNNING")

        print(" [PASS] TEST 4 passed: VEGA offline successfully prevented auto-reclaim.")

    async def test_5_already_reclaimed_prevents_duplicate_reclaim(self):
        """TEST 5: Already RECLAIMED resource -> do not repeatedly reclaim it."""
        print("\n=== RUNNING TEST 5: Duplicate Reclaim Prevention ===")
        
        vega_controller.set_simulation_mode(True)

        # 1. First reclaim
        r1 = await self.client.post("/api/v1/resources/staging-api/reclaim")
        data1 = r1.json()
        self.assertEqual(data1["status"], "success")
        self.assertEqual(data1["new_state"], "RECLAIMED")

        # 2. Duplicate reclaim attempt
        r2 = await self.client.post("/api/v1/resources/staging-api/reclaim")
        data2 = r2.json()
        self.assertEqual(data2["status"], "already_reclaimed")
        self.assertEqual(data2["state"], "RECLAIMED")
        self.assertIn("already in RECLAIMED state", data2["message"])

        # 3. Analyze on already reclaimed workload
        r3 = await self.client.post("/api/v1/resources/staging-api/analyze")
        data3 = r3.json()
        self.assertEqual(data3["state"], "RECLAIMED")
        self.assertIsNone(data3["auto_reclaim"]) # No second auto_reclaim triggered

        print(" [PASS] TEST 5 passed: Duplicate reclaim prevented safely.")

    async def test_6_restore_hydrate_returns_to_running(self):
        """TEST 6: After RECLAIMED, use the EXISTING restore/hydrate functionality -> returns to RUNNING."""
        print("\n=== RUNNING TEST 6: Restore / Hydration Flow ===")
        
        vega_controller.set_simulation_mode(True)

        # 1. Reclaim
        await self.client.post("/api/v1/resources/staging-api/reclaim")
        
        # 2. Restore
        r_restore = await self.client.post("/api/v1/resources/staging-api/restore")
        data_restore = r_restore.json()

        self.assertEqual(r_restore.status_code, 200)
        self.assertEqual(data_restore["status"], "success")
        self.assertEqual(data_restore["state"], "RUNNING")
        self.assertGreater(data_restore["hydration_time_seconds"], 0)

        # Verify in database
        async with AsyncSessionLocal() as db:
            q = await db.execute(select(Resource).where(Resource.resource_name == "staging-api"))
            res = q.scalars().first()
            self.assertEqual(res.state, "RUNNING")

        print(" [PASS] TEST 6 passed: Hydration returned resource to RUNNING state.")

if __name__ == "__main__":
    unittest.main()
