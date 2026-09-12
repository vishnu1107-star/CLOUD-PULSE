import asyncio
from unittest.mock import MagicMock
from app.services.vega_controller import VegaController
from app.api.v1.endpoints.resources import reclaim_resource, analyze_resource
from app.core.database import AsyncSessionLocal, init_db

def test_vega_disconnected_behavior():
    print("\n--- TEST: Physical VEGA Disconnected Behavior ---")
    # Point to a non-existent port or offline port
    controller = VegaController(port="COM99_NONEXISTENT", simulation_mode=False)
    
    # 1. connect() must fail safely
    conn = controller.connect()
    assert conn is False, "Expected connect() to return False when hardware is offline"
    print(" [PASS] controller.connect() failed safely (returned False)")

    # 2. evaluate_reclamation() must return VEGA_OFFLINE and approved=False
    eval_res = controller.evaluate_reclamation(cpu=1.2, network=1.5, sockets=0, iops=1.0)
    assert eval_res["approved"] is False, "Offline hardware must NOT be approved"
    assert eval_res["status"] == "VEGA_OFFLINE", f"Expected VEGA_OFFLINE, got {eval_res['status']}"
    assert "offline" in eval_res["reason"].lower() or "disconnected" in eval_res["reason"].lower()
    print(f" [PASS] evaluate_reclamation() returned VEGA_OFFLINE: {eval_res}")

    # 3. set_led_status() must return VEGA_OFFLINE and success=False
    led_res = controller.set_led_status("RUNNING")
    assert led_res["success"] is False, "Offline hardware must return success=False"
    assert led_res["status"] == "VEGA_OFFLINE"
    assert "OFFLINE" in led_res["led_info"]
    print(f" [PASS] set_led_status() returned VEGA_OFFLINE: {led_res}")


def test_vega_simulation_mode_behavior():
    print("\n--- TEST: Software Simulation Fallback Mode ---")
    controller = VegaController(port="COM99_NONEXISTENT", simulation_mode=True)
    
    # 1. In simulation mode with safe metrics -> SIMULATED_APPROVED
    eval_safe = controller.evaluate_reclamation(cpu=1.2, network=1.5, sockets=0, iops=1.0)
    assert eval_safe["approved"] is True
    assert eval_safe["status"] == "SIMULATED_APPROVED"
    assert eval_safe["mode"] == "SIMULATION"
    print(f" [PASS] Simulation mode safe metrics returned: {eval_safe}")

    # 2. In simulation mode with unsafe metrics (sockets > 0) -> SIMULATED_REJECTED
    eval_unsafe = controller.evaluate_reclamation(cpu=1.2, network=1.5, sockets=3, iops=1.0)
    assert eval_unsafe["approved"] is False
    assert eval_unsafe["status"] == "SIMULATED_REJECTED"
    print(f" [PASS] Simulation mode unsafe metrics returned: {eval_unsafe}")

    # 3. set_led_status in simulation mode -> success=True, mode=SIMULATION
    led_sim = controller.set_led_status("RUNNING")
    assert led_sim["success"] is True
    assert led_sim["mode"] == "SIMULATION"
    print(f" [PASS] Simulation mode LED returned: {led_sim}")


def test_vega_connected_hardware_mock():
    print("\n--- TEST: Physical VEGA Connected (Hardware Mock) ---")
    controller = VegaController(port="COM6", simulation_mode=False)
    
    mock_serial = MagicMock()
    mock_serial.is_open = True
    mock_serial.in_waiting = 1
    mock_serial.readline.return_value = b"APPROVED\n"
    controller.serial_connection = mock_serial

    # 1. connect() returns True
    assert controller.connect() is True
    print(" [PASS] controller.connect() returned True with active connection")

    # 2. evaluate_reclamation() with APPROVED from hardware
    eval_res = controller.evaluate_reclamation(cpu=1.2, network=1.5, sockets=0, iops=1.0)
    assert eval_res["approved"] is True
    assert eval_res["status"] == "APPROVED"
    assert eval_res["hardware_connected"] is True
    print(f" [PASS] evaluate_reclamation() with hardware response APPROVED: {eval_res}")

    # 3. evaluate_reclamation() with REJECTED from hardware
    mock_serial.readline.return_value = b"REJECTED_HIGH_SOCKETS\n"
    eval_rej = controller.evaluate_reclamation(cpu=1.2, network=1.5, sockets=2, iops=1.0)
    assert eval_rej["approved"] is False
    assert eval_rej["status"] == "REJECTED"
    print(f" [PASS] evaluate_reclamation() with hardware response REJECTED: {eval_rej}")

    # 4. set_led_status('RUNNING') sends command and returns GREEN info
    led_run = controller.set_led_status("RUNNING")
    assert led_run["success"] is True
    assert "GREEN" in led_run["led_info"]
    print(f" [PASS] set_led_status('RUNNING') returned: {led_run}")

    # 5. set_led_status('IDLE') sends command and returns RED info
    led_idle = controller.set_led_status("IDLE")
    assert led_idle["success"] is True
    assert "RED" in led_idle["led_info"]
    print(f" [PASS] set_led_status('IDLE') returned: {led_idle}")


async def test_reclaim_blocks_when_vega_disconnected():
    print("\n--- TEST: Reclaim Endpoint Blocks When VEGA is Disconnected ---")
    await init_db()
    from app.engine.discovery import DiscoveryEngine
    from app.services.vega_controller import vega_controller
    # Ensure controller is in REAL_VEGA mode and disconnected
    orig_port = vega_controller.port
    vega_controller.port = "COM99_NONEXISTENT"
    vega_controller.simulation_mode = False
    vega_controller.disconnect()
    
    async with AsyncSessionLocal() as db:
        engine = DiscoveryEngine(db)
        await engine.run_discovery()

        # Attempt reclaim on staging-api
        res = await reclaim_resource("staging-api", db=db)
        print("Reclaim response when VEGA is disconnected:", res)
        assert res["status"] == "blocked", f"Expected blocked status, got {res['status']}"
        assert res["vega_status"] == "VEGA_OFFLINE"
        assert "VEGA hardware" in res["message"] or "offline" in res["message"].lower()
        vega_controller.port = orig_port
        print(" [PASS] Reclaim safely blocked when physical VEGA is disconnected.")


async def test_reclaim_succeeds_when_vega_approves():
    print("\n--- TEST: Reclaim Endpoint Succeeds When VEGA Approves (Connected) ---")
    await init_db()
    from app.services.vega_controller import vega_controller
    
    # Mock connected serial on global vega_controller
    mock_serial = MagicMock()
    mock_serial.is_open = True
    mock_serial.in_waiting = 1
    mock_serial.readline.return_value = b"APPROVED\n"
    vega_controller.serial_connection = mock_serial
    vega_controller.simulation_mode = False

    async with AsyncSessionLocal() as db:
        res = await reclaim_resource("staging-api", db=db)
        print("Reclaim response when VEGA approves:", res)
        assert res["status"] == "success", f"Expected success, got {res['status']}"
        assert res["new_state"] == "RECLAIMED"
        assert res["vega_status"] == "APPROVED"
        print(" [PASS] Reclaim succeeded when VEGA hardware returned APPROVED.")

    vega_controller.disconnect()


async def main():
    test_vega_disconnected_behavior()
    test_vega_simulation_mode_behavior()
    test_vega_connected_hardware_mock()
    await test_reclaim_blocks_when_vega_disconnected()
    await test_reclaim_succeeds_when_vega_approves()
    print("\n========================================================")
    print(" ALL VEGA HARDWARE INTEGRATION TESTS PASSED SUCCESSFULLY! ")
    print("========================================================\n")

if __name__ == "__main__":
    asyncio.run(main())
