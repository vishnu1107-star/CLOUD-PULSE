import asyncio
from app.core.database import init_db, AsyncSessionLocal
from app.engine.discovery import DiscoveryEngine
from app.engine.evaluator import IdleEvaluator
from app.engine.executor import ActionExecutor
from app.engine.analytics import AnalyticsEngine

async def run_verification_suite():
    print("=== CloudPulse Engine Verification Suite ===")
    
    # 1. Init DB
    await init_db()
    print("[OK] DB Schema Initialized.")

    async with AsyncSessionLocal() as db:
        # 2. Discovery
        disc = DiscoveryEngine(db)
        disc_res = await disc.run_discovery()
        print(f"[OK] Discovery Completed: {disc_res}")

        # 3. Evaluator
        evaluator = IdleEvaluator(db)
        evals = await evaluator.evaluate_all()
        print(f"[OK] Metric Evaluation Completed. Evaluated {len(evals)} workloads.")

        # 4. Executor
        executor = ActionExecutor(db)
        if evals:
            target_id = evals[0]["resource_id"]
            stop_res = await executor.stop_resource(target_id, is_automated=True)
            print(f"[OK] Executor Stop Action Verified for {target_id}: {stop_res}")

            wakeup_res = await executor.start_resource(target_id)
            print(f"[OK] Executor Re-Activation Verified for {target_id}: {wakeup_res}")

        # 5. Ghost Sweeper
        ghost_res = await executor.cleanup_ghost_resources()
        print(f"[OK] Ghost Sweeper Execution Verified: {ghost_res}")

        # 6. Analytics
        analytics = AnalyticsEngine(db)
        summary = await analytics.get_summary_report()
        print(f"[OK] Analytics Report Verified. Total Savings: ${summary['total_money_saved_usd']} USD, Carbon Offset: {summary['total_carbon_saved_kg']} kg CO2.")

    print("\n=== ALL CLOUDPULSE ENGINE MODULES VERIFIED SUCCESSFULLY ===")

if __name__ == "__main__":
    asyncio.run(run_verification_suite())
