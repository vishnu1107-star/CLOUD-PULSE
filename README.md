# CloudPulse: Multi-Cloud Cost Optimization & Instant Hydration Engine ⚡

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/vishnu1107-star/CLOUD-PULSE)
[![Framework](https://img.shields.io/badge/Framework-FastAPI%20%7C%20Next.js%2014-blue.svg)](https://github.com/vishnu1107-star/CLOUD-PULSE)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/vishnu1107-star/CLOUD-PULSE)
[![Hackathon](https://img.shields.io/badge/TSM--TECHNOVA-2026%20Finalist-purple.svg)](https://github.com/vishnu1107-star/CLOUD-PULSE)

**CloudPulse** is an open-source, production-grade Cloud Cost Optimization & Automated Infrastructure Lifecycle Engine. It overcomes the flaws of purely advisory FinOps platforms by pairing **metric-based idle detection**, **tag-aware policy evaluation**, **zero-downtime developer re-activation (<3.0s warm hydration via Web UI & Slack)**, and **ghost resource sweeping**.

---

## 🌐 Live Web Portal & Demonstration Links

- **GitHub Repository:** [https://github.com/vishnu1107-star/CLOUD-PULSE](https://github.com/vishnu1107-star/CLOUD-PULSE)
- **Interactive Web App Portal:** [https://cloudpulse-finops.vercel.app](https://cloudpulse-finops.vercel.app) *(or Vercel Live Deployment)*
- **API Swagger Documentation:** `http://localhost:8000/docs`

---

## ⚡ Key Features

1. **Tag-Aware Multi-Cloud Discovery (`/app/engine/discovery.py`)**
   - Discovers AWS (EC2, EBS, EIP, ELB), GCP (Compute Engine), and Kubernetes Deployments.
   - Automatically ignores `Environment: Production` or `CloudPulse: Exclude` tagged infrastructure.
   - Targets `Environment: Staging/Dev/QA` or `CloudPulse: Managed`.

2. **Metric-Based Idle Detection (`/app/engine/evaluator.py`)**
   - Multi-variable logical AND criteria (rolling 30-minute window):
     - Average CPU Utilization < 2.0%
     - Combined Network Bandwidth < 10 KB/s
     - Active DB/HTTP Connections == 0
   - Protects workloads with active developer grace period extensions.

3. **Execution & Ghost Resource Sweeper (`/app/engine/executor.py`)**
   - Safely pauses VMs and scales K8s deployments down to 0 replicas (`kubectl scale --replicas=0`).
   - Flags & purges unattached EBS/GCP disks (`available`), unassociated EIPs, and idle ELBs with automated 30-day snapshot backups.

4. **Developer Re-Activation & Webhook Portal (`/app/api/v1/endpoints/hooks.py`)**
   - 1-Click "Wake Up" portal in the Next.js UI (<3.0s re-activation time).
   - Slack Slash Command webhook receiver (`/cloudpulse wakeup staging --hours=3`).

5. **Cost Analytics & Carbon Offsetting Engine (`/app/engine/analytics.py`)**
   - Financial savings: $\text{Savings (\$)} = \text{Total Idle Hours Saved} \times \text{On-Demand Hourly Rate}$.
   - Carbon offset: $\text{CO}_2\text{ Saved (kg)} = \text{Idle Hours} \times 0.2\text{ kW} \times 0.385\text{ kg CO}_2/\text{kWh}$.

---

## 🛠️ Quick Start (Local Run)

### 1. Backend Engine (FastAPI)
```bash
cd cloudpulse/backend
pip install -r requirements.txt
python main.py
```
- API Documentation: `http://localhost:8000/docs`
- OpenAPI JSON: `http://localhost:8000/api/v1/openapi.json`

### 2. Frontend Dashboard (Next.js 14)
```bash
cd cloudpulse/frontend
npm install
npm run dev
```
- Interactive Dashboard: `http://localhost:3000`

---

## 🏛️ System Architecture

```text
               +---------------------------------------------------+
               |             Next.js 14 Web UI                     |
               | (Dashboard / Re-Activation / Ghost Sweeper / Logs)|
               +-------------------------+-------------------------+
                                         | REST / JSON
                                         v
               +---------------------------------------------------+
               |              FastAPI FinOps Engine                |
               |                     (main.py)                     |
               +-----+-------------------+-------------------+-----+
                     |                   |                   |
                     v                   v                   v
            +----------------+  +-----------------+  +------------------+
            | Tag-Aware      |  | Metric-Based    |  | Execution &      |
            | Discovery      |  | Idle Evaluator  |  | Ghost Sweeper    |
            | Driver         |  | (CPU/Net/Conn)  |  | Engine           |
            +-------+--------+  +--------+--------+  +--------+---------+
                    |                    |                    |
                    +--------------------+--------------------+
                                         |
                                         v
                         +-------------------------------+
                         | Multi-Cloud Provider Drivers  |
                         | (AWS Boto3, GCP, K8s, Sim)    |
                         +-------------------------------+
```

---
*Developed by Team ARGUS Innovators for TSM-TECHNOVA 2026 & National Hackathons.*
