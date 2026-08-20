# CloudPulse: Multi-Cloud Cost Optimization & Infrastructure Engine ⚡

**CloudPulse** is an open-source, production-grade Cloud Cost Optimization & Automated Infrastructure Lifecycle Engine. It overcomes the flaws of purely advisory FinOps platforms by pairing **metric-based idle detection**, **tag-aware policy evaluation**, **zero-downtime developer re-activation (1-click & Slack slash commands)**, and **ghost resource sweeping**.

---

## Key Features

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
   - Flags & purges unattached EBS/GCP disks (`available`), unassociated EIPs, and idle ELBs.
   - Configurable Dry-Run mode (`DRY_RUN=True`).

4. **Developer Re-Activation & Webhook Portal (`/app/api/v1/endpoints/hooks.py`)**
   - 1-Click "Wake Up" portal in the Next.js UI.
   - Slack Slash Command webhook receiver (`/cloudpulse wakeup staging --hours=3`).

5. **Cost Analytics & Carbon Offsetting Engine (`/app/engine/analytics.py`)**
   - Financial savings: $\text{Savings (\$)} = \text{Total Idle Hours Saved} \times \text{On-Demand Hourly Rate}$.
   - Carbon offset: $\text{CO}_2\text{ Saved (kg)} = \text{Idle Hours} \times 0.2\text{ kW} \times 0.385\text{ kg CO}_2/\text{kWh}$.

---

## Quick Start (Local Run)

### 1. Backend Setup (FastAPI)
```bash
cd cloudpulse/backend
pip install -r requirements.txt
python main.py
```
- API Documentation: `http://localhost:8000/docs`
- OpenAPI JSON: `http://localhost:8000/api/v1/openapi.json`

### 2. Frontend Setup (Next.js)
```bash
cd cloudpulse/frontend
npm install
npm run dev
```
- Interactive Dashboard: `http://localhost:3000`

---

## Architecture Diagram

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
