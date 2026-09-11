# CloudPulse — Architecture Document

**Project:** CloudPulse Autonomous Multi-Cloud FinOps Engine  
**Hackathon:** EMBRIX'26 VEGATHON — Edge AI & TinyML Track  
**Version:** 2.0 (Finale-Ready)  
**Last Updated:** 2026-08-23

---

## System Overview

CloudPulse is a **5-stage autonomous control loop** that eliminates cloud waste through real-time multi-signal AI detection, predictive pre-hydration, and zero-outage re-activation — all without requiring developer intervention.

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CloudPulse Control Loop                         │
│                                                                     │
│  [Stage 1]         [Stage 2]          [Stage 3]                     │
│  Edge              Cloud ML           Autonomous                    │
│  Pre-Filter   ──►  Evaluation    ──►  Execution                     │
│  (THEJAS32)        Engine             (EC2/GCE/K8s)                 │
│      │                 │                   │                        │
│      │                 │                   ▼                        │
│  [Stage 4]         [Stage 5]          Ghost Reaper                  │
│  Developer    ◄──  Audit &            (EBS/EIP/ELB)                 │
│  Experience        ESG Ledger                                       │
│  (Dashboard +                                                       │
│   Slack ChatOps)                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Stage 1: Edge Ingestion & Pre-Filter Layer

### Hardware Target
**C-DAC VEGA Aries v3.0 IoT Board**
- **SoC:** THEJAS32 / VEGA ET1031 — 32-bit RISC-V core @ 100 MHz
- **SRAM:** 256 KB on-chip
- **Connectivity:** NINA-W10 WiFi/BLE uplink module
- **Power:** 3.3V I/O, USB-powered for lab prototyping

### Firmware Responsibilities (`firmware/`)
| Component | File | Description |
| :--- | :--- | :--- |
| Telemetry Struct | `pre_filter.h` | `TelemetryWindow` struct: CPU%, NetKBs, Sockets, Procs, IOPS, Timestamp |
| Classification Logic | `pre_filter.c` | 12-line deterministic idle classifier; thresholded multi-signal AND gate |
| Benchmark Runner | `main.c` | 1,000,000-cycle timing harness + scenario validation |
| Build | `Makefile` | GCC + RISC-V cross-compilation; `-Os` size optimization |

### Key Design Decisions
- **Why RISC-V edge?** Out-of-band hardware socket telemetry is immune to OS-level tampering and captures true network state before kernel-space filtering.
- **85–95% bandwidth reduction:** Only `CANDIDATE_IDLE` signals are forwarded upstream; all `ACTIVE` signals are dropped at the edge.
- **< 256 bytes SRAM:** Fits entirely within L1 cache of THEJAS32, enabling sub-microsecond evaluation.

**[Benchmarked]** Performance: ~350 ns/eval on 100 MHz THEJAS32 | < 256 bytes SRAM.

---

## Stage 2: Cloud ML Anomaly Evaluation Engine

### Isolation Forest Anomaly Detector (`backend/app/engine/anomaly_detector.py`)

```
Input: 5D feature vector per evaluation window
  [CPU_percent, net_kbps, active_sockets, process_count, iops]

Pipeline:
  1. StandardScaler normalization
  2. Isolation Forest (contamination=0.08, n_estimators=100)
  3. Binary classification: TRUE_IDLE | ACTIVE_QUIET

Output:
  - TRUE_IDLE    → forward to Stage 3 executor
  - ACTIVE_QUIET → suppress; log reason (socket/process/IOPS guard)
```

**Why Isolation Forest over threshold rules?**
Traditional tools use static CPU thresholds (e.g. "pause if CPU < 5%"). This fails for `ACTIVE_QUIET` workloads — e.g., a background database sync running at 0.8% CPU while holding 12 open sockets. Isolation Forest scores the full 5D vector, catching these edge cases without hardcoded rules.

**[Benchmarked]** 95.3% precision | 0 false-positive outages across 72,000 evaluations.

---

### Predictive Pre-Hydration Forecaster (`backend/app/engine/forecaster.py`)

```
Input:  Historical activity timestamps per engineering team
Model:  Autoregressive Diurnal Decomposition
          - Trend component (weekly rolling average)
          - Seasonal component (daily/weekly harmonic)
          - Residual component (anomaly events)

Output: Predicted wake-up time T_wake
        → Triggers warm pre-hydration at T_wake - 30 minutes
        → Developer arrives to zero cold-start friction
```

**Example:** Team login pattern: 09:00 AM weekdays.
→ Forecaster triggers pre-hydration at 08:30 AM.
→ Developer opens laptop, environment is warm and ready.

---

## Stage 3: Autonomous Execution Engine (`backend/app/engine/executor.py`)

### EC2 / GCE Warm Hibernation Protocol

```
Pause sequence:
  1. Verify dual-layer idle confirmation (ML score + socket gate)
  2. Create point-in-time snapshot (automated 30-day vault)
  3. Issue stop/hibernate API call
  4. Update resource state in CloudPulse DB
  5. Log to Audit Ledger

Re-activation sequence:
  1. Receive trigger (Dashboard button / Slack /cloudpulse wakeup)
  2. Issue start API call
  3. Poll instance state → running (< 2.8s in simulation)
  4. Update state; notify developer via Slack DM
```

### Kubernetes Scale-to-Zero
```bash
kubectl scale deployment <name> --replicas=0   # pause
kubectl scale deployment <name> --replicas=N   # rehydrate
```
Pod rehydration uses pre-pulled images; no registry round-trip.

### Ghost Resource Reaper (`backend/app/engine/executor.py` — `sweep_ghost_resources()`)
| Ghost Type | Detection | Action |
| :--- | :--- | :--- |
| Unattached EBS Volumes | `DescribeVolumes` where State=available, no attachment | Snapshot → delete; vault 30 days |
| Unassociated Elastic IPs | `DescribeAddresses` where AssociationId=null | Release |
| Idle ELBs (0 healthy targets) | `DescribeTargetGroups` healthy_count=0 for 7+ days | Delete |
| Stopped EC2 > 14 days | `DescribeInstances` + state history | Flag for review; auto-snapshot |

---

## Stage 4: Developer Experience Layer

### Next.js 14 Dashboard (`frontend/`)

| Page | Route | Description |
| :--- | :--- | :--- |
| Overview | `/` | KPI cards, savings chart, resource table, live counter |
| Resources | `/resources` | Full inventory with 1-click pause/wake controls |
| ROI Calculator | `/roi` | Enterprise savings simulator with sliders |
| Audit Ledger | `/audit` | Full autonomous action log with filter/export |
| Ghost Resources | `/ghost` | Unattached assets with purge controls |
| ML Insights | `/ml-insights` | Confusion matrix, feature distributions, model stats |
| Architecture | `/architecture` | Interactive system diagram |
| ESG & Carbon | `/esg` | Certificate of Carbon Abatement, UN SDG alignment |
| Pilot Results | `/pilot` | Real Week 1 pilot data (new for EMBRIX'26 VEGATHON) |
| Topology | `/topology` | Multi-cloud resource topology map |

### Slack ChatOps (`/cloudpulse wakeup <instance-id>`)
- Slash command triggers re-activation without opening browser
- DM confirmation sent on completion: "✅ staging-api-01 is warm (2.3s)"
- Implemented in `backend/app/api/v1/endpoints/hooks.py`

---

## Stage 5: Audit & ESG Ledger

### Audit Ledger (`backend/app/engine/analytics.py`)
Every autonomous action is immutably logged:
```json
{
  "event_id": "evt-00143",
  "timestamp": "2026-08-22T02:14:33Z",
  "action": "AUTONOMOUS_PAUSE",
  "resource_id": "i-091a2b3c4d",
  "provider": "AWS",
  "environment": "Staging",
  "ml_score": -0.31,
  "reason": "TRUE_IDLE — CPU: 0.6%, Net: 1.1 KB/s, Sockets: 0",
  "impact_usd": 0.192,
  "co2_saved_kg": 0.008
}
```

### ESG Carbon Accounting
```
CO₂ saved (kg) = idle_hours × 0.20 kW × 0.386 kg CO₂/kWh
               (EPA eGRID 2023 US-average emission factor)

Tree equivalent = CO₂_saved_kg / 21
               (1 mature tree absorbs ~21 kg CO₂/year)
```
Reports aligned to **UN Sustainable Development Goals: SDG 9, 12, 13**.

---

## Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS | Interactive dashboard |
| **Backend** | FastAPI (Python 3.11), SQLAlchemy, SQLite/PostgreSQL | REST API + ML engine |
| **ML** | scikit-learn (Isolation Forest), numpy, pandas | Anomaly detection |
| **Cloud SDKs** | AWS Boto3, GCP Compute Client, Kubernetes Python SDK | Multi-cloud drivers |
| **Edge Firmware** | Embedded C (C99), GCC/RISC-V cross-compiler | THEJAS32 pre-filter |
| **Containerization** | Docker, docker-compose | Local development stack |
| **Deployment** | Netlify (frontend), Vercel fallback | Live demo hosting |
| **ChatOps** | Slack Webhooks + Slash Commands | Developer re-activation |

---

## Data Flow Diagram

```
Cloud Provider Telemetry (AWS CloudWatch / GCP Monitoring / K8s Metrics)
         │
         ▼
[THEJAS32 Edge Pre-Filter] ──── 85-95% noise dropped ────► /dev/null
         │
         │ Only CANDIDATE_IDLE signals
         ▼
[FastAPI Backend — /api/v1/telemetry/ingest]
         │
         ├──► [Isolation Forest Anomaly Detector]
         │         │
         │         ├── TRUE_IDLE ──► [Executor: pause workload]
         │         │                        │
         │         │                        ├──► [Audit Ledger: log event]
         │         │                        ├──► [Analytics: calculate savings]
         │         │                        └──► [ESG: calculate CO₂ offset]
         │         │
         │         └── ACTIVE_QUIET ──► suppress; continue monitoring
         │
         └──► [Diurnal Forecaster]
                   │
                   └── Pre-hydration trigger at T_wake - 30 min
                               │
                               └──► [Executor: warm start workload]
                                            │
                                            └──► [Slack DM: "✅ Ready in 2.3s"]
```

---

## Security & Compliance

| Control | Implementation |
| :--- | :--- |
| **Production Isolation** | Resources tagged `env=production` are hard-excluded from all pause policies |
| **Snapshot Vault** | 30-day automated snapshot before any destructive action |
| **Audit Trail** | Immutable event log; all actions attributed to policy or user |
| **RBAC** | (Enterprise tier) Role-based access to pause/wake controls |
| **SOC2 Alignment** | Audit ledger design follows SOC2 CC6 control requirements |

---

*For validation evidence and methodology, see [`VALIDATION.md`](VALIDATION.md).*  
*For pilot results, see [`docs/pilot_results/`](docs/pilot_results/).*
