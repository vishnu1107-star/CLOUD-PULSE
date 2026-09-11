import random
from typing import List, Dict, Any
from datetime import datetime, timedelta

class SimulatedCloudDriver:
    """Generates realistic multi-cloud resources & metrics for zero-cloud credential testing."""

    @staticmethod
    def get_initial_seed_resources() -> List[Dict[str, Any]]:
        return [
            {
                "provider": "AWS",
                "resource_id": "staging-api",
                "resource_name": "staging-api",
                "resource_type": "EC2",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Staging",
                "hourly_cost": 0.192,
                "tags": {"Environment": "Staging", "Team": "Backend", "CloudPulse": "Managed", "Role": "API"}
            },
            {
                "provider": "K8S",
                "resource_id": "dev-cluster",
                "resource_name": "dev-cluster",
                "resource_type": "EKS_DEPLOYMENT",
                "region": "us-west-2",
                "state": "RUNNING",
                "environment": "Dev",
                "hourly_cost": 0.280,
                "tags": {"Environment": "Dev", "Team": "Platform", "CloudPulse": "Managed"}
            },
            {
                "provider": "AWS",
                "resource_id": "test-db",
                "resource_name": "test-db",
                "resource_type": "RDS",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Test",
                "hourly_cost": 0.350,
                "tags": {"Environment": "Test", "Engine": "PostgreSQL", "SafetyTest": "ActiveSockets"}
            },
            {
                "provider": "GCP",
                "resource_id": "ci-runner",
                "resource_name": "ci-runner",
                "resource_type": "GCE",
                "region": "us-central1",
                "state": "RUNNING",
                "environment": "Dev",
                "hourly_cost": 0.145,
                "tags": {"Environment": "Dev", "Pipeline": "CI"}
            },
            {
                "provider": "K8S",
                "resource_id": "analytics-worker",
                "resource_name": "analytics-worker",
                "resource_type": "EKS_DEPLOYMENT",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Staging",
                "hourly_cost": 0.220,
                "tags": {"Environment": "Staging", "Team": "Data"}
            },
            {
                "provider": "AWS",
                "resource_id": "preview-app",
                "resource_name": "preview-app",
                "resource_type": "EC2",
                "region": "us-west-2",
                "state": "RUNNING",
                "environment": "Dev",
                "hourly_cost": 0.096,
                "tags": {"Environment": "Dev", "PR": "492"}
            },
            {
                "provider": "GCP",
                "resource_id": "qa-api",
                "resource_name": "qa-api",
                "resource_type": "GCE",
                "region": "us-central1",
                "state": "RUNNING",
                "environment": "QA",
                "hourly_cost": 0.160,
                "tags": {"Environment": "QA", "Criticality": "ActiveLoad"}
            },
            {
                "provider": "AWS",
                "resource_id": "dev-cache",
                "resource_name": "dev-cache",
                "resource_type": "ELASTICACHE",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Dev",
                "hourly_cost": 0.068,
                "tags": {"Environment": "Dev", "Engine": "Redis"}
            },
            {
                "provider": "AWS",
                "resource_id": "test-worker",
                "resource_name": "test-worker",
                "resource_type": "EC2",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Test",
                "hourly_cost": 0.096,
                "tags": {"Environment": "Test", "Queue": "SQS"}
            },
            {
                "provider": "K8S",
                "resource_id": "build-runner",
                "resource_name": "build-runner",
                "resource_type": "EKS_DEPLOYMENT",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Staging",
                "hourly_cost": 0.210,
                "tags": {"Environment": "Staging", "SafetyTest": "OpenSocket"}
            }
        ]

    @staticmethod
    def get_initial_ghost_resources() -> List[Dict[str, Any]]:
        return [
            {
                "provider": "AWS",
                "resource_id": "vol-0a1b2c3d4e5f6g7h8",
                "resource_name": "unattached-staging-backup-disk",
                "resource_type": "UNATTACHED_VOLUME",
                "region": "us-east-1",
                "size_gb": 250.0,
                "monthly_cost": 25.0
            },
            {
                "provider": "AWS",
                "resource_id": "eipalloc-0123456789abcdef0",
                "resource_name": "orphaned-dev-eip",
                "resource_type": "UNASSOCIATED_EIP",
                "region": "us-east-1",
                "size_gb": 0.0,
                "monthly_cost": 3.60
            },
            {
                "provider": "AWS",
                "resource_id": "app/idle-elb-qa/1234567890",
                "resource_name": "unused-qa-loadbalancer",
                "resource_type": "UNUSED_ELB",
                "region": "us-east-1",
                "size_gb": 0.0,
                "monthly_cost": 22.50
            },
            {
                "provider": "GCP",
                "resource_id": "gcp-disk-orphaned-temp-100gb",
                "resource_name": "temp-build-disk-unused",
                "resource_type": "UNATTACHED_VOLUME",
                "region": "us-central1",
                "size_gb": 100.0,
                "monthly_cost": 10.0
            }
        ]

    @staticmethod
    def get_simulated_metrics(resource_id: str, environment: str) -> Dict[str, Any]:
        """Multi-signal telemetry simulation supporting Active, True Idle, and False Idle profiles."""
        r_id = resource_id.lower()
        
        # 1. False Idle / Safety Test Cases (Low CPU, but holding active sockets!)
        if "test-db" in r_id or "build-runner" in r_id:
            return {
                "cpu_utilization": round(random.uniform(1.8, 2.4), 2),
                "network_kbps": round(random.uniform(2.1, 4.5), 2),
                "active_connections": 3 if "test-db" in r_id else 1,
                "disk_io_iops": random.randint(1, 4),
                "memory_pct": round(random.uniform(32.0, 42.0), 1),
                "active_process_count": 3
            }
        
        # 2. Active Load Case (qa-api)
        if "qa-api" in r_id:
            return {
                "cpu_utilization": round(random.uniform(45.0, 72.0), 2),
                "network_kbps": round(random.uniform(320.0, 850.0), 2),
                "active_connections": random.randint(15, 60),
                "disk_io_iops": random.randint(25, 80),
                "memory_pct": round(random.uniform(62.0, 78.0), 1),
                "active_process_count": 8
            }
            
        # 3. True Idle Candidates (staging-api, dev-cluster, ci-runner, analytics-worker, preview-app, dev-cache, test-worker)
        return {
            "cpu_utilization": round(random.uniform(0.4, 1.4), 2),
            "network_kbps": round(random.uniform(0.5, 2.8), 2),
            "active_connections": 0,
            "disk_io_iops": random.randint(0, 2),
            "memory_pct": round(random.uniform(14.0, 26.0), 1),
            "active_process_count": 1
        }
