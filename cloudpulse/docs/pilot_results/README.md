# CloudPulse — Pilot Results

This folder contains raw logs and analysis from real-world CloudPulse deployments.

## Contents

| File | Description |
| :--- | :--- |
| [`week1_raw_log.md`](week1_raw_log.md) | Week 1 pilot: AWS free-tier, Aug 16–22, 2026 |

## How to Interpret This Data

- All pilot data is explicitly tagged **[Real Pilot]** in `VALIDATION.md` and `README.md`.
- The Week 1 pilot ran on a **single AWS t2.micro instance** — this is a **small-scale proof-of-concept**, not a statistically representative production deployment.
- Accuracy figures from this pilot should not be extrapolated to fleet-scale without further validation.
- Raw hourly logs are included for full transparency and reproducibility.

## Planned Future Pilots

| Phase | Scope | Target Date |
| :--- | :--- | :--- |
| Week 1 (complete) | 1× t2.micro, 7 days | Aug 16–22, 2026 |
| Phase 2 (planned) | 5–10 instances, 30 days | Sep 2026 |
| Phase 3 (planned) | Multi-cloud (AWS + GCP), 60 days | Oct–Nov 2026 |
