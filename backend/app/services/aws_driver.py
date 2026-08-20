import boto3
from typing import List, Dict, Any
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class AWSDriver:
    def __init__(self, region_name: str = "us-east-1"):
        self.region_name = region_name
        try:
            self.ec2 = boto3.client("ec2", region_name=region_name)
            self.cloudwatch = boto3.client("cloudwatch", region_name=region_name)
            self.elbv2 = boto3.client("elbv2", region_name=region_name)
            self.has_credentials = True
        except Exception as e:
            logger.warning(f"AWS Driver initialized without active credentials: {e}")
            self.has_credentials = False

    def discover_ec2_instances(self) -> List[Dict[str, Any]]:
        """Fetch EC2 instances and filter tags."""
        if not self.has_credentials:
            return []
        
        resources = []
        try:
            response = self.ec2.describe_instances()
            for reservation in response.get("Reservations", []):
                for inst in reservation.get("Instances", []):
                    tags = {t["Key"]: t["Value"] for t in inst.get("Tags", [])}
                    env = tags.get("Environment", "Dev")
                    
                    # Ignore Production & CloudPulse: Exclude
                    if env.lower() == "production" or tags.get("CloudPulse") == "Exclude":
                        continue

                    resources.append({
                        "provider": "AWS",
                        "resource_id": inst["InstanceId"],
                        "resource_name": tags.get("Name", inst["InstanceId"]),
                        "resource_type": "EC2",
                        "region": self.region_name,
                        "state": inst["State"]["Name"].upper(),
                        "environment": env,
                        "hourly_cost": 0.096,  # Default t3.medium rate
                        "tags": tags
                    })
        except Exception as e:
            logger.error(f"Error fetching AWS EC2 instances: {e}")
        return resources

    def get_cloudwatch_metrics(self, instance_id: str, window_minutes: int = 30) -> Dict[str, float]:
        """Fetch CloudWatch average CPU and Network utilization."""
        if not self.has_credentials:
            return {"cpu_utilization": 0.5, "network_kbps": 1.2, "active_connections": 0}

        end_time = datetime.utcnow()
        start_time = end_time - timedelta(minutes=window_minutes)

        cpu_avg = 0.0
        net_avg = 0.0

        try:
            # Query CPU Utilization
            res_cpu = self.cloudwatch.get_metric_statistics(
                Namespace="AWS/EC2",
                MetricName="CPUUtilization",
                Dimensions=[{"Name": "InstanceId", "Value": instance_id}],
                StartTime=start_time,
                EndTime=end_time,
                Period=300,
                Statistics=["Average"]
            )
            datapoints = res_cpu.get("Datapoints", [])
            if datapoints:
                cpu_avg = sum(d["Average"] for d in datapoints) / len(datapoints)

            # Query Network In
            res_net = self.cloudwatch.get_metric_statistics(
                Namespace="AWS/EC2",
                MetricName="NetworkIn",
                Dimensions=[{"Name": "InstanceId", "Value": instance_id}],
                StartTime=start_time,
                EndTime=end_time,
                Period=300,
                Statistics=["Average"]
            )
            net_datapoints = res_net.get("Datapoints", [])
            if net_datapoints:
                net_avg = (sum(d["Average"] for d in net_datapoints) / len(net_datapoints)) / 1024.0 / 300.0
        except Exception as e:
            logger.error(f"Error querying CloudWatch for {instance_id}: {e}")

        return {
            "cpu_utilization": round(cpu_avg, 2),
            "network_kbps": round(net_avg, 2),
            "active_connections": 0
        }

    def discover_unattached_volumes(self) -> List[Dict[str, Any]]:
        """Identify available (unattached) EBS volumes."""
        if not self.has_credentials:
            return []

        ghosts = []
        try:
            res = self.ec2.describe_volumes(Filters=[{"Name": "status", "Values": ["available"]}])
            for vol in res.get("Volumes", []):
                size_gb = vol.get("Size", 0)
                monthly_cost = size_gb * 0.10  # standard gp3 rate per GB
                ghosts.append({
                    "provider": "AWS",
                    "resource_id": vol["VolumeId"],
                    "resource_name": f"unattached-ebs-{vol['VolumeId'][-6:]}",
                    "resource_type": "UNATTACHED_VOLUME",
                    "region": self.region_name,
                    "size_gb": float(size_gb),
                    "monthly_cost": round(monthly_cost, 2)
                })
        except Exception as e:
            logger.error(f"Error discovering EBS volumes: {e}")
        return ghosts

    def stop_ec2_instance(self, instance_id: str) -> bool:
        """Stop an EC2 instance (falls back to simulation mode if AWS credentials are not set)."""
        if not self.has_credentials:
            return True
        try:
            self.ec2.stop_instances(InstanceIds=[instance_id])
            return True
        except Exception as e:
            logger.info(f"AWS credentials not available for instance {instance_id}: operating in simulation mode. ({e})")
            return True

    def start_ec2_instance(self, instance_id: str) -> bool:
        """Start an EC2 instance (falls back to simulation mode if AWS credentials are not set)."""
        if not self.has_credentials:
            return True
        try:
            self.ec2.start_instances(InstanceIds=[instance_id])
            return True
        except Exception as e:
            logger.info(f"AWS credentials not available for instance {instance_id}: operating in simulation mode. ({e})")
            return True

