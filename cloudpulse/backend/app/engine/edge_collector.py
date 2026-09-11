from typing import Dict, Any, List
from app.services.vega_riscv_driver import VegaRISCVDriver
import logging

logger = logging.getLogger(__name__)

class EdgeCollectorEngine:
    """
    Module for Ingesting and Normalizing Hardware Telemetry from Edge & Hybrid Probes.
    Bridges on-prem bare-metal / RISC-V nodes with the centralized CloudPulse FinOps engine.
    """

    def __init__(self):
        self.vega_driver = VegaRISCVDriver()

    def collect_edge_telemetry(self, edge_nodes: List[str] | None = None) -> List[Dict[str, Any]]:
        if not edge_nodes:
            edge_nodes = ["vega-node-onprem-01", "vega-node-edge-k8s-02"]

        telemetry_batch = []
        for node in edge_nodes:
            raw_telemetry = self.vega_driver.get_probe_telemetry(node_id=node)
            normalized = {
                "source": "EDGE_RISCV_PROBE",
                "node_id": raw_telemetry["node_id"],
                "architecture": "RISC-V 64-bit (C-DAC VEGA)",
                "power_watts": raw_telemetry["power_draw_watts"],
                "active_connections": raw_telemetry["hardware_socket_count"],
                "is_energy_efficient": raw_telemetry["power_draw_watts"] < 30.0,
                "signature": raw_telemetry["tamper_proof_signature"]
            }
            telemetry_batch.append(normalized)

        return telemetry_batch
