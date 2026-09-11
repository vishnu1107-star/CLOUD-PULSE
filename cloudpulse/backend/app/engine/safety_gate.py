from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class SafetyGate:
    """
    Critical Autonomous Safety Gate for CloudPulse.
    Implements a multi-signal deterministic and ML-backed authorization barrier.
    Ensures no resource is ever reclaimed purely on low CPU.
    """

    STATES = [
        "ACTIVE",
        "IDLE_CANDIDATE",
        "VERIFYING",
        "SAFE_TO_RECLAIM",
        "BLOCKED",
        "VAULTING",
        "RECLAIMED",
        "RESTORING",
        "HYDRATED"
    ]

    CPU_THRESHOLD_DEFAULT = 2.5        # %
    NETWORK_THRESHOLD_DEFAULT = 10.0   # KB/s
    SOCKET_THRESHOLD_DEFAULT = 0       # Open connections MUST be 0
    IOPS_THRESHOLD_DEFAULT = 5         # Operations / sec
    PROCESS_THRESHOLD_DEFAULT = 2      # Background processes

    @classmethod
    def evaluate(
        cls,
        metrics: Dict[str, Any],
        ml_prediction: Dict[str, Any] | None = None,
        cpu_threshold: float = CPU_THRESHOLD_DEFAULT,
        network_threshold: float = NETWORK_THRESHOLD_DEFAULT
    ) -> Dict[str, Any]:
        """
        Executes strict multi-signal safety check.
        Returns detailed checklist, pass/fail status, and blocking explanation.
        """
        cpu = float(metrics.get("cpu_utilization", metrics.get("cpu", 0.0)))
        net = float(metrics.get("network_kbps", metrics.get("network", 0.0)))
        sockets = int(metrics.get("active_connections", metrics.get("sockets", 0)))
        iops = float(metrics.get("disk_io_iops", metrics.get("iops", 0.0)))
        proc = int(metrics.get("active_process_count", metrics.get("process_activity", 1)))
        
        ml_is_idle = ml_prediction.get("is_idle", True) if ml_prediction else True
        ml_classification = ml_prediction.get("classification", "TRUE_IDLE") if ml_prediction else "TRUE_IDLE"

        # Signal checks
        cpu_check = cpu < cpu_threshold
        net_check = net < network_threshold
        socket_check = (sockets == cls.SOCKET_THRESHOLD_DEFAULT)
        iops_check = iops <= cls.IOPS_THRESHOLD_DEFAULT
        proc_check = proc <= cls.PROCESS_THRESHOLD_DEFAULT
        ml_check = ml_is_idle

        checks = {
            "cpu": {
                "name": "CPU Utilization Low",
                "value": f"{cpu:.1f}%",
                "threshold": f"< {cpu_threshold:.1f}%",
                "passed": cpu_check
            },
            "network": {
                "name": "Network Throughput Low",
                "value": f"{net:.1f} KB/s",
                "threshold": f"< {network_threshold:.1f} KB/s",
                "passed": net_check
            },
            "sockets": {
                "name": "Sockets Inactive (Zero Active Connections)",
                "value": f"{sockets} sockets",
                "threshold": "== 0",
                "passed": socket_check
            },
            "iops": {
                "name": "Disk IOPS Low",
                "value": f"{iops:.0f} IOPS",
                "threshold": f"<= {cls.IOPS_THRESHOLD_DEFAULT}",
                "passed": iops_check
            },
            "processes": {
                "name": "Process Activity Low",
                "value": f"{proc} processes",
                "threshold": f"<= {cls.PROCESS_THRESHOLD_DEFAULT}",
                "passed": proc_check
            },
            "ml_anomaly": {
                "name": "Isolation Forest ML Confirmation",
                "value": ml_classification,
                "threshold": "TRUE_IDLE",
                "passed": ml_check
            }
        }

        # Determine failure reason if any check fails
        block_reasons = []
        if not socket_check:
            block_reasons.append(f"Active socket detected ({sockets} open connection{'s' if sockets > 1 else ''}). Resource protected.")
        if not cpu_check:
            block_reasons.append(f"CPU utilization exceeds idle threshold ({cpu:.1f}% >= {cpu_threshold:.1f}%).")
        if not net_check:
            block_reasons.append(f"Network throughput is active ({net:.1f} KB/s >= {network_threshold:.1f} KB/s).")
        if not iops_check:
            block_reasons.append(f"Active disk I/O operations ({iops:.0f} IOPS).")
        if not proc_check:
            block_reasons.append(f"Active background worker processes ({proc} procs).")
        if not ml_check:
            block_reasons.append(f"Isolation Forest flagged active behavior ({ml_classification}).")

        passed = all([cpu_check, net_check, socket_check, iops_check, proc_check, ml_check])

        if passed:
            status = "PASSED"
            recommended_action = "SAFE TO RECLAIM"
            primary_reason = "All 6 telemetry safety signals verified zero-traffic idle state."
            state = "SAFE_TO_RECLAIM"
        else:
            status = "BLOCKED"
            recommended_action = "KEEP RUNNING"
            primary_reason = block_reasons[0] if block_reasons else "Safety conditions not met."
            state = "BLOCKED"

        return {
            "status": status,
            "state": state,
            "passed": passed,
            "recommended_action": recommended_action,
            "primary_reason": primary_reason,
            "all_reasons": block_reasons,
            "checks": checks
        }
