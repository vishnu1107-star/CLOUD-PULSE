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
                "resource_id": "i-0a1b2c3d",
                "resource_name": "staging-api",
                "resource_type": "EC2",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Staging",
                "hourly_cost": 0.767,
                "tags": {"Environment": "Staging", "Team": "Backend-Core", "Hardware": "VEGA-Aries-v2"}
            },
            {
                "provider": "AWS",
                "resource_id": "i-0e4f5g6h",
                "resource_name": "dev-worker",
                "resource_type": "EC2",
                "region": "us-west-2",
                "state": "RUNNING",
                "environment": "Dev",
                "hourly_cost": 0.400,
                "tags": {"Environment": "Dev", "Team": "Frontend", "DataSource": "Bitbrains-GWA-T-12"}
            },
            {
                "provider": "GCP",
                "resource_id": "i-0q7r8s9t",
                "resource_name": "qa-runner",
                "resource_type": "GCE",
                "region": "us-central1",
                "state": "RUNNING",
                "environment": "QA",
                "hourly_cost": 1.033,
                "tags": {"Environment": "QA", "Team": "Data-Eng", "DataSource": "Azure-Public-Traces"}
            },
            {
                "provider": "K8S",
                "resource_id": "i-0m5n6o1p",
                "resource_name": "batch-worker",
                "resource_type": "EKS_DEPLOYMENT",
                "region": "us-east-2",
                "state": "RUNNING",
                "environment": "Dev",
                "hourly_cost": 1.312,
                "tags": {"Environment": "Dev", "Cluster": "k8s-dev-east", "Namespace": "batch-processing"}
            },
            {
                "provider": "AWS",
                "resource_id": "i-0u3v4w5x",
                "resource_name": "sandbox-01",
                "resource_type": "EC2",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Dev",
                "hourly_cost": 1.750,
                "tags": {"Environment": "Dev", "Tier": "Sandbox", "ActiveUser": "dev-team"}
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
        
        # 1. Active Load Cases (sandbox-01, test-db, build-runner, qa-api)
        if "sandbox-01" in r_id or "i-0u3v4w5x" in r_id or "test-db" in r_id or "build-runner" in r_id:
            sockets = 14 if ("sandbox-01" in r_id or "i-0u3v4w5x" in r_id) else (3 if "test-db" in r_id else 1)
            cpu = 78.4 if ("sandbox-01" in r_id or "i-0u3v4w5x" in r_id) else 2.2
            net = 85.0 if ("sandbox-01" in r_id or "i-0u3v4w5x" in r_id) else 4.2
            return {
                "cpu_utilization": cpu,
                "network_kbps": net,
                "active_connections": sockets,
                "disk_io_iops": 240.0 if ("sandbox-01" in r_id or "i-0u3v4w5x" in r_id) else 4.0,
                "memory_pct": 74.0 if ("sandbox-01" in r_id or "i-0u3v4w5x" in r_id) else 35.0,
                "active_process_count": 8 if ("sandbox-01" in r_id or "i-0u3v4w5x" in r_id) else 3
            }
        
        # 2. True Idle Candidates (staging-api / i-0a1b2c3d, dev-worker / i-0e4f5g6h, qa-runner / i-0q7r8s9t, batch-worker / i-0m5n6o1p)
        return {
            "cpu_utilization": round(random.uniform(0.4, 1.4), 2),
            "network_kbps": round(random.uniform(0.5, 2.8), 2),
            "active_connections": 0,
            "disk_io_iops": random.randint(0, 2),
            "memory_pct": round(random.uniform(14.0, 26.0), 1),
            "active_process_count": 1
        }
