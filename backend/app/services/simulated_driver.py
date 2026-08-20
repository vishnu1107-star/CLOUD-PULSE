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
                "resource_id": "i-091a2b3c4d5e6f7g1",
                "resource_name": "staging-api-server-01",
                "resource_type": "EC2",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Staging",
                "hourly_cost": 0.192,  # t3.xlarge
                "tags": {"Environment": "Staging", "Team": "Backend", "CloudPulse": "Managed"}
            },
            {
                "provider": "AWS",
                "resource_id": "i-088a99b88c77d66e2",
                "resource_name": "dev-frontend-react-02",
                "resource_type": "EC2",
                "region": "us-west-2",
                "state": "RUNNING",
                "environment": "Dev",
                "hourly_cost": 0.096,  # t3.medium
                "tags": {"Environment": "Dev", "Owner": "Frontend-Team", "CloudPulse": "Managed"}
            },
            {
                "provider": "GCP",
                "resource_id": "gcp-instance-qa-worker-01",
                "resource_name": "qa-data-processor",
                "resource_type": "GCE",
                "region": "us-central1",
                "state": "RUNNING",
                "environment": "QA",
                "hourly_cost": 0.134,  # n2-standard-2
                "tags": {"Environment": "QA", "CloudPulse": "Managed"}
            },
            {
                "provider": "K8S",
                "resource_id": "deploy/staging-analytics-worker",
                "resource_name": "staging-analytics-worker",
                "resource_type": "EKS_DEPLOYMENT",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Staging",
                "hourly_cost": 0.250,
                "tags": {"Environment": "Staging", "K8s-Cluster": "staging-cluster-01"}
            },
            {
                "provider": "AWS",
                "resource_id": "rds-db-dev-postgres",
                "resource_name": "dev-postgres-db-primary",
                "resource_type": "RDS",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Dev",
                "hourly_cost": 0.350,
                "tags": {"Environment": "Dev", "Engine": "PostgreSQL"}
            },
            {
                "provider": "AWS",
                "resource_id": "i-099999production123",
                "resource_name": "prod-auth-service-01",
                "resource_type": "EC2",
                "region": "us-east-1",
                "state": "RUNNING",
                "environment": "Production",
                "hourly_cost": 0.768,
                "tags": {"Environment": "Production", "Criticality": "High"}
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
    def get_simulated_metrics(resource_id: str, environment: str) -> Dict[str, float]:
        """Simulate metrics: Production workloads remain busy, Staging/Dev workloads are idle (<2% CPU, <10KB/s net)."""
        if environment.lower() == "production":
            return {
                "cpu_utilization": round(random.uniform(25.0, 78.0), 2),
                "network_kbps": round(random.uniform(450.0, 1200.0), 2),
                "active_connections": random.randint(12, 150)
            }
        else:
            # Idle criteria
            return {
                "cpu_utilization": round(random.uniform(0.1, 1.4), 2),
                "network_kbps": round(random.uniform(0.2, 4.5), 2),
                "active_connections": 0
            }
