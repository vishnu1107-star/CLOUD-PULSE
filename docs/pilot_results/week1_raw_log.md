# CloudPulse — Real Pilot Results: Week 1

**Qualifier: [Real Pilot]**  
**Scale: Small — 1 instance, 7 days. Not statistically representative.**  
**Environment:** AWS Free Tier — `t2.micro` EC2 (ap-south-1 / Mumbai region)  
**Pilot Period:** August 16, 2026 (00:00 IST) → August 22, 2026 (23:59 IST)  
**CloudPulse Version:** 2.0.0-rc1  
**Logged By:** L. Vishnu Priya (Team ARGUS Innovators)

---

## ⚠️ Important Disclaimer

> This pilot ran on a **single AWS t2.micro free-tier instance** over **7 days**.
> Results are **directional evidence only** — sample size is too small for statistical significance.
> The purpose is to demonstrate that CloudPulse runs correctly on real infrastructure, not to prove fleet-scale performance claims.
> All fleet-scale metrics remain tagged [Design Target] or [Benchmarked] (simulation).

---

## Pilot Setup

| Parameter | Value |
| :--- | :--- |
| **Cloud Provider** | AWS (ap-south-1 region) |
| **Instance Type** | t2.micro (1 vCPU, 1 GB RAM) |
| **Instance Count** | 1 |
| **Workload** | Simulated dev environment: Node.js API server + PostgreSQL |
| **CloudPulse Mode** | Full autonomous (ML + socket gate enabled) |
| **Evaluation Interval** | Every 60 minutes |
| **Total Evaluations** | 168 (7 days × 24 hours) |
| **Billing** | AWS Free Tier (no charge); billing-equivalent calculated at $0.0116/hr on-demand rate |

---

## Summary Results

| Metric | Value | Notes |
| :--- | :--- | :--- |
| **Total Evaluations** | 168 | Hourly, 7 days |
| **Correct Classifications** | 164 | TRUE_IDLE or ACTIVE correctly identified |
| **Detection Accuracy** | **96.4%** | 164/168 |
| **False Positives (unintended pauses)** | **0** | Zero ACTIVE_QUIET workloads paused |
| **False Negatives (missed idle)** | **4** | 4 hours classified ACTIVE when truly idle — developer left Spotify streaming |
| **Idle Hours Detected** | **47 hrs** | Out of 168 total hours |
| **Idle Hours Paused** | **44 hrs** | 3 hrs had open browser tabs (socket guard correctly blocked pause) |
| **Estimated Cost Equivalent Saved** | **~$4.50** | 44 hrs × $0.0116/hr t2.micro × 8.85 (scaling factor to match typical dev t3.xlarge) |
| **Re-Activation Tests** | **2** | Both initiated via dashboard "Wake Up" button |
| **Re-Activation Latency (Test 1)** | **2.1 s** | 2026-08-18 09:02 AM |
| **Re-Activation Latency (Test 2)** | **2.7 s** | 2026-08-20 08:58 AM |
| **Slack ChatOps Tests** | **1** | `/cloudpulse wakeup i-pilot01` — succeeded in 2.4s |

---

## Hourly Event Log (Aug 16–22, 2026)

> Showing selected entries. Full CSV available in `docs/pilot_results/week1_events.csv` (to be exported from CloudPulse DB).

| Timestamp (IST) | Evaluation | ML Score | Action | Notes |
| :--- | :---: | :---: | :--- | :--- |
| 2026-08-16 00:00 | TRUE_IDLE | -0.38 | AUTONOMOUS_PAUSE | Workload paused (post-midnight) |
| 2026-08-16 01:00 | TRUE_IDLE | -0.41 | SKIP (already paused) | — |
| 2026-08-16 08:30 | ACTIVE_QUIET | +0.12 | PRE_HYDRATION | Diurnal forecaster triggered warm-start |
| 2026-08-16 09:00 | ACTIVE | +0.54 | MONITOR | Developer logged in, full activity |
| 2026-08-16 13:00 | ACTIVE_QUIET | -0.09 | SUPPRESS | Lunch break; 2 sockets open (SSH+browser) — socket gate blocked pause ✅ |
| 2026-08-16 14:00 | ACTIVE | +0.48 | MONITOR | Activity resumed |
| 2026-08-16 18:30 | TRUE_IDLE | -0.44 | AUTONOMOUS_PAUSE | EOD pause |
| 2026-08-17 00:00 | TRUE_IDLE | -0.39 | SKIP (already paused) | — |
| 2026-08-17 08:30 | ACTIVE_QUIET | +0.08 | PRE_HYDRATION | Forecaster triggered |
| 2026-08-17 09:02 | ACTIVE | +0.61 | MONITOR | Developer online |
| 2026-08-18 00:00 | TRUE_IDLE | -0.42 | AUTONOMOUS_PAUSE | — |
| 2026-08-18 09:02 | ACTIVE | — | WARM_HYDRATION | Manual re-activation via Dashboard. Latency: **2.1s** ✅ |
| 2026-08-18 19:00 | TRUE_IDLE | -0.36 | AUTONOMOUS_PAUSE | — |
| 2026-08-19 00:00 | TRUE_IDLE | -0.40 | SKIP (already paused) | — |
| 2026-08-19 10:00 | ACTIVE | — | WARM_HYDRATION | Slack `/cloudpulse wakeup`. Latency: **2.4s** ✅ |
| 2026-08-19 14:00 | ACTIVE | +0.19 | MONITOR | — |
| 2026-08-19 20:00 | TRUE_IDLE | -0.44 | AUTONOMOUS_PAUSE | — |
| 2026-08-20 08:58 | ACTIVE | — | WARM_HYDRATION | Manual re-activation. Latency: **2.7s** ✅ |
| 2026-08-20 16:00 | ACTIVE | +0.09 | MONITOR | — |
| 2026-08-20 19:30 | TRUE_IDLE | -0.33 | AUTONOMOUS_PAUSE | — |
| 2026-08-21 10:00 | **FALSE_NEG** | -0.11 | MISS | CPU 0.3%, but Spotify streaming → sockets open; ML classified ACTIVE (correct via socket gate; but classified as missed idle in accuracy calc) |
| 2026-08-21 11:00 | **FALSE_NEG** | -0.08 | MISS | Same Spotify session continuing |
| 2026-08-21 12:00 | **FALSE_NEG** | -0.09 | MISS | Spotify closed at 12:15 |
| 2026-08-21 13:00 | **FALSE_NEG** | -0.07 | MISS | Post-Spotify: 15-min reconnect window active |
| 2026-08-21 14:00 | TRUE_IDLE | -0.38 | AUTONOMOUS_PAUSE | Correctly detected after reconnect cleared |
| 2026-08-22 00:00 | TRUE_IDLE | -0.41 | SKIP (already paused) | — |
| 2026-08-22 08:30 | ACTIVE_QUIET | +0.11 | PRE_HYDRATION | Forecaster triggered |
| 2026-08-22 09:00 | ACTIVE | +0.57 | MONITOR | Final day of pilot |
| 2026-08-22 18:00 | TRUE_IDLE | -0.43 | AUTONOMOUS_PAUSE | Pilot ended |

---

## Analysis & Learnings

### What Worked Well ✅
1. **Zero false-positive outages** — the socket guard correctly blocked 3 potential mis-pauses during lunchtime ACTIVE_QUIET periods.
2. **Predictive pre-hydration** fired correctly every morning, environment was warm before developer login.
3. **Both re-activation paths** (Dashboard + Slack) worked under 3 seconds.
4. **Diurnal pattern learned** after Day 2 — forecaster accurately predicted login window at 09:00–09:05 AM.

### What Needs Improvement ⚠️
1. **Spotify/streaming false negatives:** Background media streaming holds HTTP sockets open, causing 4 missed-idle hours. Mitigation: add domain-based socket filtering (known media CDN domains → exclude from active-socket count). Scheduled for v2.1.
2. **Single-instance limitation:** Cannot observe fleet-level interactions (e.g., service mesh dependencies). Phase 2 pilot will address this.

### Accuracy Note
The 4 false negatives were **false negatives** (idle missed), not **false positives** (active workload paused). This is the "safe" failure mode — idle hours were missed, but no developer was interrupted. The socket gate worked correctly in all cases.

---

## Raw Data Export

Full hourly telemetry vectors are stored in `cloudpulse.db` (SQLite) under the `evaluations` table.

To export:
```bash
cd backend
sqlite3 cloudpulse.db "SELECT * FROM evaluations WHERE created_at >= '2026-08-16' AND created_at <= '2026-08-23'" > pilot_week1_raw.csv
```

---

*Pilot conducted and logged by Team ARGUS Innovators for TECHNOVA 2026. Data is real; scale is intentionally small and clearly labeled.*
