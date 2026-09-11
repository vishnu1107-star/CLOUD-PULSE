import numpy as np
from sklearn.ensemble import IsolationForest

FEATURES = ["cpu_percent", "network_bytes", "open_sockets", "iops"]

PREFILTER_CPU = 15.0
PREFILTER_NET = 20000
PREFILTER_SOCKETS = 4


def prefilter_pass(reading):
    return (
        reading["cpu_percent"] > PREFILTER_CPU
        or reading["network_bytes"] > PREFILTER_NET
        or reading["open_sockets"] > PREFILTER_SOCKETS
    )


class AnomalyDetector:
    def __init__(self, contamination=0.08):
        self.model = IsolationForest(
            n_estimators=100,
            contamination=contamination,
            random_state=42,
        )
        self._fitted = False

    def fit_baseline(self, idle_readings):
        X = np.array([[r[f] for f in FEATURES] for r in idle_readings])
        self.model.fit(X)
        self._fitted = True

    def score(self, reading):
        passed_prefilter = prefilter_pass(reading)
        result = {
            "instance_id": reading["instance_id"],
            "prefilter_flagged": passed_prefilter,
            "is_anomaly": True,
            "anomaly_score": None,
        }

        if not passed_prefilter:
            return result

        if not self._fitted:
            raise RuntimeError("Call fit_baseline() before scoring.")

        X = np.array([[reading[f] for f in FEATURES]])
        pred = self.model.predict(X)[0]
        score = float(self.model.decision_function(X)[0])

        result["is_anomaly"] = bool(pred == -1)
        result["anomaly_score"] = score
        return result