from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from pydantic import BaseModel, Field
from app.engine.anomaly_detector import IsolationForestAnomalyDetector
from app.engine.forecaster import PredictivePrehydrationForecaster
from app.engine.edge_collector import EdgeCollectorEngine

router = APIRouter()

detector = IsolationForestAnomalyDetector()
forecaster = PredictivePrehydrationForecaster()
edge_collector = EdgeCollectorEngine()

class MetricsPayload(BaseModel):
    cpu_utilization: float = Field(..., example=0.85)
    network_kbps: float = Field(..., example=2.4)
    active_connections: int = Field(..., example=0)
    active_process_count: int = Field(1, example=1)
    disk_io_iops: float = Field(0.5, example=0.5)

@router.post("/predict-idle")
def predict_idle_state(payload: MetricsPayload) -> Dict[str, Any]:
    """Evaluates raw metric stream with the trained Isolation Forest anomaly detection engine."""
    metrics_dict = payload.model_dump()
    return detector.predict_state(metrics_dict)

@router.get("/forecast-schedule/{resource_id}")
def get_resource_forecast(resource_id: str) -> Dict[str, Any]:
    """Generates 24-hour predictive time-series pre-hydration timeline."""
    forecast_timeline = forecaster.forecast_24h_utilization(resource_id)
    schedule_summary = forecaster.get_next_prehydration_schedule(resource_id)
    return {
        "summary": schedule_summary,
        "hourly_forecast": forecast_timeline
    }

@router.get("/edge-telemetry")
def get_edge_riscv_telemetry() -> List[Dict[str, Any]]:
    """Fetches telemetry from C-DAC VEGA RISC-V edge probe collectors."""
    return edge_collector.collect_edge_telemetry()
