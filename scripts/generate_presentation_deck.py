"""
CloudPulse — ARGUS Innovators
TSM-TECHNOVA 2026 | 8-Slide Sky Blue Presentation Deck
Clean layout, proper spacing, all content visible, no overflow.
"""
import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib import colors

# ─── Canvas dimensions (landscape Letter: 792 x 612 pt) ──────────────────────
W, H = landscape(letter)   # 792 × 612

# ─── Sky Blue Palette ─────────────────────────────────────────────────────────
NAVY    = colors.HexColor('#0C2D48')   # header / card title
BLUE    = colors.HexColor('#0369A1')   # primary sky blue
LBLUE   = colors.HexColor('#0EA5E9')   # accent
PALE    = colors.HexColor('#E0F2FE')   # card tint A
WHITE   = colors.HexColor('#FFFFFF')
GRAY    = colors.HexColor('#F8FAFC')   # card tint B
BORDER  = colors.HexColor('#BAE6FD')
DARK    = colors.HexColor('#0F172A')   # body text
MID     = colors.HexColor('#1E3A5F')   # sub-text
GREEN   = colors.HexColor('#059669')
GREENBG = colors.HexColor('#D1FAE5')


# ─── Helper: rounded rect ─────────────────────────────────────────────────────
def rr(c, x, y, w, h, r=6, fill=None, stroke=None, sw=1):
    c.saveState()
    if fill:
        c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.roundRect(x, y, w, h, r,
                fill=1 if fill else 0,
                stroke=1 if stroke else 0)
    c.restoreState()


# ─── Helper: header bar (used on slides 2-8) ─────────────────────────────────
def header(c, title, sub, snum):
    rr(c, 0, H - 48, W, 48, r=0, fill=NAVY)
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 13)
    c.drawString(24, H - 22, title)
    c.setFont('Helvetica', 8)
    c.setFillColor(PALE)
    c.drawString(24, H - 36, sub)
    c.setFont('Helvetica-Bold', 8)
    c.setFillColor(WHITE)
    c.drawRightString(W - 24, H - 22, 'TSM-TECHNOVA 2026')
    c.setFont('Helvetica', 7)
    c.setFillColor(LBLUE)
    c.drawRightString(W - 24, H - 36, 'AI Infrastructure / FinOps')
    c.setFillColor(BORDER)
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(24, 20, W - 24, 20)
    c.setFont('Helvetica', 7)
    c.setFillColor(MID)
    c.drawString(24, 8, 'CloudPulse: Autonomous Multi-Cloud FinOps Engine  |  ARGUS INNOVATORS')
    c.drawCentredString(W / 2, 8, f'Slide {snum} of 8')
    c.drawRightString(W - 24, 8, 'Team Leader: L. Vishnu Priya')


# ─── Helper: section card ────────────────────────────────────────────────────
def card(c, x, y, w, h, title, lines, bg=None, tc=NAVY):
    bg = bg or GRAY
    rr(c, x, y, w, h, r=6, fill=bg, stroke=BORDER, sw=1)
    c.setFont('Helvetica-Bold', 9)
    c.setFillColor(tc)
    c.drawString(x + 10, y + h - 16, title)
    c.setFont('Helvetica', 7.5)
    c.setFillColor(DARK)
    ty = y + h - 30
    for line in lines:
        if ty < y + 8:
            break
        c.drawString(x + 10, ty, line)
        ty -= 13


# ─── Helper: badge pill ──────────────────────────────────────────────────────
def badge(c, x, y, w, h, text, bg=BLUE, tc=WHITE):
    rr(c, x, y, w, h, r=4, fill=bg)
    c.setFont('Helvetica-Bold', 7.5)
    c.setFillColor(tc)
    c.drawCentredString(x + w / 2, y + h / 2 - 3.5, text)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE BUILDERS
# ═══════════════════════════════════════════════════════════════════════════════

def slide1(c):
    """Title, Team, Key Metrics"""
    rr(c, 0, H - 130, W, 130, r=0, fill=NAVY)
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 20)
    c.drawString(30, H - 52, 'CloudPulse: Autonomous Multi-Cloud FinOps Engine')
    c.setFont('Helvetica', 10)
    c.setFillColor(PALE)
    c.drawString(30, H - 72, 'AI-Driven Idle Reclamation  |  Zero-Downtime Socket Gating  |  Sub-2.8s Instant Hydration')
    c.setFont('Helvetica-Bold', 8.5)
    c.setFillColor(LBLUE)
    c.drawString(30, H - 90, 'TSM-TECHNOVA 2026 National Innovation Challenge  |  Thiagarajar School of Management, Madurai')
    c.setFont('Helvetica', 8)
    c.setFillColor(PALE)
    c.drawString(30, H - 108, 'Track: AI Infrastructure / FinOps / Green Tech & Business Automation')
    c.drawString(30, H - 124, 'Portal: https://marvelous-rugelach-27a627.netlify.app   |   GitHub: https://github.com/vishnu1107-star/CLOUD-PULSE')

    cw = (W - 48) / 2
    card(c, 24, 128, cw, 310,
         'Project Scope & Technical Overview',
         [
             'Problem Domain:  AI Infrastructure / Cloud FinOps / Green Tech',
             'Core Innovation: Isolation Forest ML + Zero-Outage Socket Gating',
             'Cloud Scope:     AWS EC2/EBS/EIP, GCP Compute, Kubernetes EKS',
             'Edge Hardware:   C-DAC VEGA RISC-V SoC Out-of-Band Telemetry',
             'Current Stage:   Full-Stack Working Prototype (FastAPI + Next.js 14)',
             'Benchmark Fleet: 100 Instances across 720 Continuous Hours',
             'UN SDG Align:    SDG 9 (Innovation), SDG 12, SDG 13 (Climate)',
             'Open Source:     MIT License — Public GitHub Repository',
             'Deployment:      Docker Compose + Helm Chart on Kubernetes',
             'Live Endpoint:   marvelous-rugelach-27a627.netlify.app',
         ],
         bg=PALE, tc=NAVY)

    card(c, 24 + cw + 8, 128, cw, 310,
         'Team ARGUS INNOVATORS — Leadership & Members',
         [
             'Team Name:      ARGUS INNOVATORS',
             '',
             'Team Leader:    L. Vishnu Priya',
             '                Lead Architect & Cloud Systems Engineer',
             '',
             'Team Member 1:  Harini Sri B K',
             '                ML Anomaly Detection & Time-Series Forecaster',
             '',
             'Team Member 2:  Tharagai V',
             '                Multi-Cloud Drivers (AWS/GCP/K8s) & Sweep Engine',
             '',
             'Team Member 3:  Vishalini S',
             '                Next.js Dashboard, ChatOps & ESG Analytics',
             '',
             'Institution:    Thiagarajar School of Management (TSM), Madurai',
         ],
         bg=GRAY, tc=NAVY)

    bw = (W - 48 - 24) / 4
    metrics = [
        ('70.42% Cost Reclaimed', '$8,518 / month saved', GREENBG, GREEN),
        ('0.00% False Outages',   '72,000 gated checks',  PALE,    NAVY),
        ('2.34s Re-Hydration',    'Sub-2.8s guaranteed',  GREENBG, GREEN),
        ('3,903 kg CO2e Saved',   'UN SDG 13 Ledger',     PALE,    NAVY),
    ]
    for i, (t, s, bg, tc) in enumerate(metrics):
        bx = 24 + i * (bw + 8)
        rr(c, bx, 30, bw, 88, r=6, fill=bg, stroke=BORDER, sw=1)
        c.setFont('Helvetica-Bold', 11)
        c.setFillColor(tc)
        c.drawCentredString(bx + bw / 2, 94, t)
        c.setFont('Helvetica', 8)
        c.setFillColor(MID)
        c.drawCentredString(bx + bw / 2, 76, s)

    c.setFont('Helvetica', 7)
    c.setFillColor(MID)
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(24, 20, W - 24, 20)
    c.drawString(24, 8, 'CloudPulse: Autonomous Multi-Cloud FinOps Engine  |  ARGUS INNOVATORS')
    c.drawCentredString(W / 2, 8, 'Slide 1 of 8')
    c.drawRightString(W - 24, 8, 'Team Leader: L. Vishnu Priya')
    c.showPage()


def slide2(c):
    """Problem Statement"""
    header(c, 'The $17 Billion Problem: Non-Production Cloud Waste',
           'Why Traditional FinOps Platforms Fail in Real-World Enterprise Environments', 2)

    y0 = H - 58
    cw = (W - 48 - 8) / 2
    ch = 210

    card(c, 24, y0 - ch, cw, ch,
         '1. Idle Developer VM Burn (45%+ Cloud Spend)',
         [
             '• Staging, QA & Dev VMs run 24/7 unnecessarily on AWS & GCP.',
             '• 68%+ of weekly hours sit completely idle with zero dev traffic.',
             '• Global cloud waste exceeds $17 Billion/year on non-prod envs.',
             '• Orgs pay full on-demand rates for VMs generating zero ROI.',
             '• Dev teams lack automated off-hours shutdown enforcement.',
             '• Continuous budget drain during nights, weekends & holidays.',
             '• Scope-2 carbon emissions generated for zero engineering output.',
         ], bg=PALE, tc=NAVY)

    card(c, 24 + cw + 8, y0 - ch, cw, ch,
         '2. Silent Ghost Storage & Orphan IP Drain (10-20% Budget)',
         [
             '• Unattached EBS/GCP disks, orphaned Elastic IPs keep billing.',
             '• Ghost assets silently erode 10-20% of monthly cloud budgets.',
             '• Storage volumes uncleaned due to fear of data loss.',
             '• Cloud providers bill monthly regardless of instance state.',
             '• Orphaned static IPs cost $3.60-$7.20/month each.',
             '• Unused ALBs/ELBs cost $22.50+/month per balancer.',
             '• Manual tagging audits fail to catch all orphan resources.',
         ], bg=GRAY, tc=NAVY)

    y1 = y0 - ch - 8
    card(c, 24, y1 - ch, cw, ch,
         '3. Advisory FinOps Paralysis & Alert Fatigue',
         [
             '• Legacy tools (CloudHealth, Kubecost) only produce PDF digests.',
             '• Engineering teams ignore static recs due to alert fatigue.',
             '• Zero automated execution: cleanup requires dozens of Jira tickets.',
             '• FinOps recommendations achieve <15% implementation rate.',
             '• Reports lack real-time context on whether workload is abandoned.',
             '• High friction between FinOps teams and product engineers.',
             '• Static dashboards fail to drive autonomous infra actions.',
         ], bg=PALE, tc=NAVY)

    card(c, 24 + cw + 8, y1 - ch, cw, ch,
         '4. Re-Activation Friction & Outage Fears',
         [
             '• Coarse CPU scripts kill databases during active jobs/debugging.',
             '• Restoring shut-down envs manually takes 30-60 mins via CloudOps.',
             '• High dev resistance: engineering teams block shutdown policies.',
             '• Environments left running 24/7 to avoid cold-start delays.',
             '• Massive velocity loss during morning manual warmups.',
             '• Lack of 1-click ChatOps re-hydration causes eng resentment.',
             '• Result: $17B in avoidable compute spend remains untouched.',
         ], bg=GRAY, tc=NAVY)

    rr(c, 24, 28, W - 48, 52, r=6, fill=PALE, stroke=BORDER)
    c.setFont('Helvetica-Bold', 9)
    c.setFillColor(NAVY)
    c.drawString(36, 64, 'CloudPulse Solution Hypothesis:')
    c.setFont('Helvetica', 8)
    c.setFillColor(DARK)
    c.drawString(36, 50, 'Combining ML anomaly detection, zero-outage socket gating, and sub-2.8s warm re-activation achieves 45-70% non-prod cost savings')
    c.drawString(36, 38, 'while eliminating developer friction, false-positive outages, and manual CloudOps intervention at enterprise scale.')
    c.showPage()


def slide3(c):
    """Architecture"""
    header(c, 'CloudPulse Solution Architecture — 5-Stage Control Plane',
           'Telemetry Ingestion  ->  AI Gating  ->  Forecasting  ->  Execution  ->  ChatOps & ESG Ledger', 3)

    stages = [
        ('Stage 1', 'Multi-Cloud Telemetry Ingestion & Hardware Edge Probe',
         'AWS CloudWatch (Boto3), GCP Monitoring API, K8s Metrics Server — polling CPU, network, sockets, IOPS.',
         'C-DAC VEGA RISC-V SoC out-of-band telemetry for on-prem/hybrid clusters capturing raw Watts.',
         'Tag-Aware Filtering: auto-isolates Staging/Dev while permanently exempting Production workloads.',
         'AWS / GCP / K8s / RISC-V'),
        ('Stage 2', 'Real AI Anomaly Detection & Zero-Outage Socket Guard',
         'Isolation Forest evaluates 5D vectors [CPU%, Net KB/s, Sockets, Processes, IOPS] — TRUE_IDLE vs ACTIVE_QUIET.',
         'Socket Guard: workloads holding open DB connections are classified ACTIVE_QUIET — never shut down.',
         'Dual-Confirmation Gating: both ML score AND heuristic policy must agree before any hibernation.',
         'Isolation Forest 5D ML'),
        ('Stage 3', 'Predictive Pre-Hydration & Diurnal Harmonic Forecaster',
         'Autoregressive diurnal model fits team working patterns across weekdays — predicts login windows.',
         'Automatically warms staging environments 30 minutes before workday start (08:30 AM warmup).',
         'Developer Schedule Learning: adapts hibernation triggers dynamically to overtime patterns.',
         'Diurnal Harmonic Model'),
        ('Stage 4', 'Autonomous Execution Engine & Ghost Resource Sweeper',
         'Automates EC2/GCE instance pausing and scales Kubernetes deployments to 0 replicas.',
         '30-Day Snapshot Vault: sweeps unattached EBS volumes, orphan Elastic IPs, idle ELBs safely.',
         'Dry-Run Mode: FinOps managers preview reclamation projections before live execution.',
         '30-Day Snapshot Vault'),
        ('Stage 5', 'Sub-2.8s Instant Hydration, Developer ChatOps & ESG Ledger',
         '1-Click Re-Activation: Next.js 14 portal + Slack /cloudpulse wakeup — mean 2.34s restoration.',
         'Auditable UN SDG Carbon Ledger: tracks exact $ savings and kg CO2e reduction per action.',
         'Immutable event log records every autonomous pause, wake, and ghost sweep for compliance.',
         '2.34s Instant Hydration'),
    ]

    sh = 90
    y = H - 58
    for st_num, st_title, b1, b2, b3, pill in stages:
        bg = PALE if int(st_num[-1]) % 2 == 1 else GRAY
        rr(c, 24, y - sh, W - 48, sh, r=5, fill=bg, stroke=BORDER, sw=0.8)
        badge(c, 24, y - sh + sh // 2 - 9, 52, 18, st_num, bg=BLUE, tc=WHITE)
        c.setFont('Helvetica-Bold', 9)
        c.setFillColor(NAVY)
        c.drawString(84, y - 16, st_title)
        badge(c, W - 24 - 155, y - sh + sh // 2 - 9, 145, 18, pill, bg=NAVY, tc=PALE)
        c.setFont('Helvetica', 7.5)
        c.setFillColor(DARK)
        c.drawString(84, y - 32, b1)
        c.drawString(84, y - 46, b2)
        c.drawString(84, y - 60, b3)
        y -= (sh + 5)

    c.showPage()


def slide4(c):
    """AI Engine — 2x2 quadrant"""
    header(c, 'Real AI Engine: Anomaly Detection & Predictive Pre-Hydration',
           'Isolation Forest ML  |  Socket Gating  |  Diurnal Forecaster  |  C-DAC RISC-V Edge', 4)

    cw = (W - 48 - 8) / 2
    ch = 230
    y_top = H - 58 - ch
    y_bot = y_top - 8 - ch

    quads = [
        (24,        y_top, PALE, 'Isolation Forest ML Anomaly Detection',
         ['5D Telemetry Vector: [CPU%, Network KB/s, Sockets, Processes, IOPS]',
          'Unsupervised outlier isolation — separates active bursts from idle.',
          'High concurrency vectorised batch inference executing in <15 ms.',
          '100.0% empirical accuracy across 10,000 multi-modal telemetry vectors.',
          'Serialised model: backend/app/ml_models/isolation_forest.pkl',
          'Dynamic baseline: continuously updates cluster idle baselines.',
          'Zero supervised labelling required — operational from day one.'],
         'Model Accuracy: 100.0%  |  Contamination: 0.08  |  Latency: <15 ms'),

        (24+cw+8,   y_top, GRAY, "Active-Quiet Workload Gating (0.0% Outages)",
         ['Industry Flaw: coarse scripts shut down quiet DBs holding locks.',
          'Socket Guard: if active connections > 0, state = ACTIVE_QUIET.',
          'Multi-signal safety: requires both ML anomaly score & heuristic.',
          '0.00% false-positive outage rate across 72,000 simulation checks.',
          'Protects PostgreSQL, MySQL, Redis during nightly maintenance jobs.',
          'Developer Override: 1-click grace period extension via UI/Slack.',
          'Auto-rollback: immediate recovery upon anomalous execution.'],
         'Safety Guarantee: 0.00% False Outages  |  72,000 Evaluations'),

        (24,        y_bot, GRAY, 'Predictive Pre-Hydration Time-Series Forecaster',
         ['Diurnal Harmonic Modeling: fits team login rhythms weekday/weekend.',
          'Off-Hours Window Detection: identifies safe shutdown (20:00-08:00).',
          'Automated Morning Pre-Warm: restores envs 30 mins before workday.',
          'Eliminates developer cold-start — workloads 100% warm at 09:00 AM.',
          'Prediction Confidence: 0.942 reliability on staging clusters.',
          'Time-Zone Aware: dynamically adapts to distributed global teams.',
          'Self-Correcting: recalibrates on schedule shifts automatically.'],
         'Diurnal Confidence: 0.942  |  Target Warmup: 08:30 AM every day'),

        (24+cw+8,   y_bot, PALE, 'C-DAC VEGA RISC-V SoC Edge Telemetry Collector',
         ['Hardware Root-of-Trust: tamper-proof telemetry for on-prem/hybrid.',
          'Out-of-Band Power Monitoring: measures raw physical draw (Watts).',
          'Zero Host OS Overhead: direct hardware socket & thermal inspection.',
          'Driver: app/services/vega_riscv_driver.py + REST endpoint.',
          'Extends CloudPulse FinOps governance to bare-metal data centres.',
          'Embedded Security: signed telemetry payloads prevent false reports.',
          'Local Edge Decision: autonomous hibernation during network splits.'],
         'Indigenous Silicon: C-DAC VEGA / ARIES v3 Compatible'),
    ]

    for qx, qy, bg, title, blist, foot in quads:
        rr(c, qx, qy, cw, ch, r=6, fill=bg, stroke=BORDER, sw=0.8)
        c.setFont('Helvetica-Bold', 9)
        c.setFillColor(NAVY)
        c.drawString(qx + 10, qy + ch - 16, title)
        c.setFont('Helvetica', 7.5)
        c.setFillColor(DARK)
        ty = qy + ch - 32
        for b in blist:
            c.drawString(qx + 10, ty, b)
            ty -= 13
        rr(c, qx + 8, qy + 6, cw - 16, 22, r=3, fill=WHITE, stroke=BLUE, sw=0.8)
        c.setFont('Helvetica-Bold', 7)
        c.setFillColor(NAVY)
        c.drawString(qx + 14, qy + 12, foot)

    c.showPage()


def slide5(c):
    """Empirical Benchmark Results"""
    header(c, 'Empirical Verification: 100 Instances Over 720 Hours',
           'Measured & Verifiable Benchmark Results from Automated Simulation Harness', 5)

    col_ws = [155, 90, 160, 260, 85]
    col_ws[-1] = W - 48 - sum(col_ws[:-1])
    hdrs = ['Benchmark Metric', 'Target', 'Measured Result', 'Evaluation Scope', 'Status']
    rows = [
        ('Cost Reclamation Rate',    '>=45%',   '70.42%  ($8,518/mo)',      '100 instances (EC2, GCE, K8s) — 720 hours',       'PASS'),
        ('False-Positive Outages',   '0.00%',   '0.00%  (0 incidents)',     '72,000 metric inferences with socket guard',       'PASS'),
        ('Re-Hydration Latency P99', '<2.80 s', '2.65 s  (mean 2.34 s)',    '500 warm wake-up triggers (Web & Slack)',          'PASS'),
        ('Ghost Storage Purge',      'Max ROI', '$412.50/month recovered',  'EBS, orphan EIPs, idle ALBs/ELBs detected',       'PASS'),
        ('Carbon Avoidance',         'SDG 13',  '3,903 kg CO2e / month',   'Grid factor 0.385 kg CO2/kWh — auditable ledger', 'PASS'),
    ]

    th = 24
    ty = H - 58
    rr(c, 24, ty - th, W - 48, th, r=4, fill=NAVY)
    cx = 24
    c.setFont('Helvetica-Bold', 8.5)
    c.setFillColor(WHITE)
    for i, h in enumerate(hdrs):
        c.drawString(cx + 8, ty - th + 8, h)
        cx += col_ws[i]

    rowy = ty - th
    for ri, row in enumerate(rows):
        rowy -= 26
        bg = PALE if ri % 2 == 0 else WHITE
        rr(c, 24, rowy, W - 48, 26, r=3, fill=bg, stroke=BORDER, sw=0.5)
        cx = 24
        c.setFont('Helvetica-Bold', 8)
        c.setFillColor(DARK)
        c.drawString(cx + 8, rowy + 9, row[0]); cx += col_ws[0]
        c.setFont('Helvetica', 8)
        c.drawString(cx + 8, rowy + 9, row[1]); cx += col_ws[1]
        c.setFont('Helvetica-Bold', 8)
        c.setFillColor(GREEN)
        c.drawString(cx + 8, rowy + 9, row[2]); cx += col_ws[2]
        c.setFont('Helvetica', 7.5)
        c.setFillColor(MID)
        c.drawString(cx + 8, rowy + 9, row[3]); cx += col_ws[3]
        c.setFont('Helvetica-Bold', 8)
        c.setFillColor(GREEN)
        c.drawString(cx + 8, rowy + 9, row[4])

    cw3 = (W - 48 - 16) / 3
    ch3 = rowy - 38
    card(c, 24, 30, cw3, ch3,
         'Financial Economics',
         ['Baseline Cost (24/7):  $12,096/mo',
          'Optimised Spend:       $3,578/mo',
          'Net Reclaimed:         $8,518/mo',
          'Reduction:             70.42%',
          'Annualised Savings:    $102,216',
          'ROI Payback:           <2 days',
          'Fleet: 35 EC2, 25 GCE, 20 K8s',
          'Zero additional overhead.'],
         bg=PALE, tc=NAVY)

    card(c, 24 + cw3 + 8, 30, cw3, ch3,
         'Hydration & Reliability Profile',
         ['Mean Wake-Up:    2.34 s',
          'P50:             2.34 s',
          'P95:             2.57 s',
          'P99:             2.65 s  (<2.8 s)',
          '0 Outage Events: 0 jobs interrupted',
          'Slack ChatOps:   /cloudpulse wakeup',
          'Concurrent wakes: up to 50 nodes',
          'Zero CloudOps ticket bottleneck.'],
         bg=GRAY, tc=NAVY)

    card(c, 24 + 2 * (cw3 + 8), 30, cw3, ch3,
         'UN SDG 13 Carbon Avoidance',
         ['Monthly CO2e Offset: 3,903 kg',
          'Grid Factor: 0.385 kg CO2/kWh',
          'Annualised Offset:   46.8 MT',
          'SDG Alignment: 9, 12, 13',
          'Auditable ESG Ledger: PDF+CSV',
          'Real-Time Dashboard: Next.js 14',
          'C-DAC RISC-V: low-power edge node',
          'Scope-2 footprint reduction.'],
         bg=PALE, tc=NAVY)

    c.showPage()


def slide6(c):
    """Competitive Matrix"""
    header(c, 'Competitive Positioning Matrix',
           'Why CloudPulse Outperforms Named Industry Alternatives on Every Key Dimension', 6)

    col_ws = [160, 90, 120, 90, 90, 0]
    col_ws[-1] = W - 48 - sum(col_ws[:-1])
    hdrs = ['Capability / Feature', 'AWS Scheduler', 'CloudHealth', 'Kubecost', 'Spot.io', 'CloudPulse']
    comp_rows = [
        ('Autonomous Execution',       'Crude Cron',        'Passive Reports',  'Advisory Only',  'Spot Bidding', 'Full Autonomous'),
        ('ML Anomaly Detection',       'Static Schedules',  'Static Rules',     'Thresholds',     'Price Bids',   'Isolation Forest'),
        ('Zero-Outage Socket Guard',   'Outage Risk',       'Not Available',    'Not Available',  'Spot Drop Risk','0.0% Outages'),
        ('Sub-2.8s Instant Hydration', '30-60 min ops',     'Manual Tickets',   'Not Available',  'Cold Boot',    '<2.8s Web/Slack'),
        ('Cross-Cloud & K8s Support',  'AWS Only',          'Multi-Cloud',      'K8s Only',       'Multi-Cloud',  'AWS+GCP+K8s'),
        ('Ghost Storage Sweeper',      'None',              'Reports Only',     'None',           'None',         'Auto-Purge Vault'),
        ('Carbon ESG Ledger',          'None',              'None',             'None',           'None',         'UN SDG 13 Ledger'),
        ('Open-Source License',        'CloudFormation',    'Closed SaaS',      'Open-Core',      'Closed SaaS',  'MIT Open Source'),
    ]

    th = 24
    ty = H - 58
    rr(c, 24, ty - th, W - 48, th, r=4, fill=NAVY)
    cx = 24
    c.setFont('Helvetica-Bold', 8.5)
    c.setFillColor(WHITE)
    for i, h in enumerate(hdrs):
        c.drawString(cx + 8, ty - th + 8, h)
        cx += col_ws[i]

    rowy = ty - th
    for ri, row in enumerate(comp_rows):
        rowy -= 26
        bg = PALE if ri % 2 == 0 else WHITE
        rr(c, 24, rowy, W - 48, 26, r=3, fill=bg, stroke=BORDER, sw=0.5)
        rr(c, 24 + sum(col_ws[:5]), rowy, col_ws[5], 26, r=2, fill=GREENBG, stroke=GREEN, sw=0.5)
        cx = 24
        c.setFont('Helvetica-Bold', 8)
        c.setFillColor(DARK)
        c.drawString(cx + 8, rowy + 9, row[0]); cx += col_ws[0]
        c.setFont('Helvetica', 7.5)
        c.setFillColor(MID)
        for j in range(1, 5):
            c.drawString(cx + 8, rowy + 9, row[j]); cx += col_ws[j]
        c.setFont('Helvetica-Bold', 8)
        c.setFillColor(GREEN)
        c.drawString(cx + 8, rowy + 9, row[5])

    cw2 = (W - 48 - 8) / 2
    ch2 = rowy - 38
    card(c, 24, 30, cw2, ch2,
         'Why Existing Alternatives Fail',
         ['• AWS Scheduler: rigid cron shuts down active builds.',
          '• CloudHealth: generates PDFs but executes nothing.',
          '• Kubecost: K8s-only, zero AWS/GCP VM lifecycle.',
          '• Spot.io: spot arbitrage only — ignores idle on-demand.',
          '• All: 30-60 min manual ticket turnaround.',
          '• None detect active sockets before shutdown.',
          '• Result: developer resentment & policy abandonment.'],
         bg=PALE, tc=NAVY)

    card(c, 24 + cw2 + 8, 30, cw2, ch2,
         'The CloudPulse Unfair Advantage',
         ['• 100% Autonomous closed-loop: detect, execute, rollback.',
          '• Multi-signal ML gating guarantees 0.0% outages.',
          '• Sub-2.8s hydration via UI & Slack ChatOps.',
          '• Unified AWS, GCP, K8s & C-DAC RISC-V support.',
          '• 30-Day Snapshot Vault: zero data loss on sweeps.',
          '• MIT Open-Source PLG funnel to enterprise SaaS.',
          '• Predictive pre-warms workloads before devs arrive.'],
         bg=GRAY, tc=NAVY)

    c.showPage()


def slide7(c):
    """Business Model & GTM"""
    header(c, 'Business Model & Go-To-Market Strategy',
           'High-Growth B2B SaaS Potential  |  Product-Led Growth Funnel  |  Enterprise Expansion', 7)

    tw = (W - 48 - 16) / 3
    th = 240
    ty = H - 58 - th

    tiers = [
        ('Tier 1: Community  (Free)', GRAY, BORDER,
         ['Open-source self-hosted core engine.',
          'Up to 10 managed cloud instances.',
          'Multi-variable heuristic idle detection.',
          '1-Click web dashboard re-activation.',
          'Complete MIT open-source license.',
          'Community Discord & GitHub support.',
          'PLG viral adoption acquisition channel.',
          'Single cluster Helm deployment.',
          'No credit card or sign-up required.']),
        ('Tier 2: Scale-Up  ($12/node/mo)', PALE, BLUE,
         ['Full Isolation Forest ML engine.',
          'Slack ChatOps: /cloudpulse wakeup.',
          'Predictive pre-hydration forecaster.',
          'Ghost sweeper + 30-day snapshot vault.',
          'Priority support & automated rollbacks.',
          'Value-share option: 15% of savings.',
          'Multi-cloud: AWS + GCP + K8s.',
          'Team RBAC & role management.',
          '30-day risk-free value pilot.']),
        ('Tier 3: Enterprise  ($24/node/mo)', GRAY, BORDER,
         ['Multi-tenant RBAC & enterprise SSO.',
          'C-DAC VEGA RISC-V edge collector.',
          'Custom alert thresholds & SLA reports.',
          'Dedicated CSM + SLA 99.9% uptime.',
          'White-label / on-prem deployment.',
          'Custom ESG carbon compliance reports.',
          'API webhooks + BI tool integrations.',
          'Concierge onboarding & training.',
          'Negotiated enterprise contract pricing.']),
    ]
    for i, (title, bg, border, pts) in enumerate(tiers):
        tx = 24 + i * (tw + 8)
        rr(c, tx, ty, tw, th, r=6, fill=bg, stroke=border, sw=1.2)
        c.setFont('Helvetica-Bold', 9.5)
        c.setFillColor(NAVY)
        c.drawString(tx + 10, ty + th - 18, title)
        c.setFont('Helvetica', 7.5)
        c.setFillColor(DARK)
        pty = ty + th - 34
        for pt in pts:
            c.drawString(tx + 10, pty, pt)
            pty -= 13

    cw2 = (W - 48 - 8) / 2
    ch2 = ty - 38
    card(c, 24, 30, cw2, ch2,
         'Target Market Segments',
         ['1. Seed & Series-A Startups — cloud bills 40%+ of burn.',
          '2. University & Research Labs — student dev environments.',
          '3. Mid-Market SaaS (50-500 eng) — large non-prod fleets.',
          '4. Enterprise IT / FinOps Teams — hybrid cloud governance.',
          '5. Indian Gov & PSUs — C-DAC RISC-V indigenous silicon.',
          '6. Managed Service Providers — white-label FinOps tier.',
          '7. Cloud-Native Consultancies — FinOps audit reseller.'],
         bg=PALE, tc=NAVY)

    card(c, 24 + cw2 + 8, 30, cw2, ch2,
         '9-Pillar Go-To-Market Plan',
         ['1. GitHub OSS PLG funnel — star-driven organic discovery.',
          '2. Product Hunt & HackerNews launch campaign.',
          '3. Startup accelerator partnerships (YC, Surge, 91Springboard).',
          '4. TSM alumni & academic incubator network outreach.',
          '5. Slack/Discord developer community sponsorships.',
          '6. AWS/GCP Marketplace listing for procurement.',
          '7. FinOps Foundation conference & podcast appearances.',
          '8. LinkedIn thought leadership & case study content.',
          '9. Channel reseller partnerships with MSPs & SI firms.'],
         bg=GRAY, tc=NAVY)

    c.showPage()


def slide8(c):
    """Conclusion & Team Sign-Off"""
    header(c, 'Conclusion, Deliverables & Team Sign-Off',
           'CloudPulse — Ready for TSM-TECHNOVA 2026 Evaluation & Incubation Support', 8)

    cw = (W - 48 - 8) / 2
    ch_top = 200
    y_top = H - 58 - ch_top

    card(c, 24, y_top, cw, ch_top,
         'Submission Deliverables Checklist',
         ['[x] Working Full-Stack Prototype (FastAPI + Next.js 14)',
          '[x] Isolation Forest ML Model (isolation_forest.pkl)',
          '[x] Multi-Cloud Drivers: AWS Boto3, GCP Compute, K8s',
          '[x] Slack ChatOps: /cloudpulse wakeup command',
          '[x] Ghost Sweeper + 30-Day Snapshot Vault',
          '[x] UN SDG 13 Carbon Ledger (kg CO2e auditable)',
          '[x] Empirical Benchmark Suite (720-hour, 100 instances)',
          '[x] C-DAC VEGA RISC-V Edge Driver Integration',
          '[x] Fully Deployed Live Portal (Netlify)',
          '[x] MIT Open-Source GitHub Repository'],
         bg=PALE, tc=NAVY)

    card(c, 24 + cw + 8, y_top, cw, ch_top,
         '6-Month Technical Roadmap',
         ['Month 1-2: SOC 2 Type I audit & enterprise SSO integration.',
          'Month 2-3: AWS/GCP Marketplace listing submission.',
          'Month 3-4: LLM-powered FinOps conversational assistant.',
          'Month 4-5: Multi-tenant SaaS dashboard with RBAC.',
          'Month 5-6: Kubernetes Operator (custom CRD) release.',
          'Ongoing:   C-DAC VEGA RISC-V driver upstream merge.',
          'Ongoing:   FinOps Foundation working group contribution.',
          'Ongoing:   ML model retraining pipeline (weekly cadence).',
          'Ongoing:   Open-source community & plugin ecosystem.',
          'Target:    500 GitHub stars within 90 days of launch.'],
         bg=GRAY, tc=NAVY)

    ch_mid = 130
    y_mid = y_top - 8 - ch_mid
    rr(c, 24, y_mid, W - 48, ch_mid, r=6, fill=PALE, stroke=BLUE, sw=1)
    c.setFont('Helvetica-Bold', 9)
    c.setFillColor(NAVY)
    c.drawString(36, y_mid + ch_mid - 18, 'Support Requested from TSM-TECHNOVA 2026')
    supports = [
        ('Incubation', 'TSM/MSME lab access'),
        ('Mentoring',  'Cloud FinOps domain expert'),
        ('Funding',    'Prototype to MVP grant'),
        ('Patent',     'AI gating algorithm IP filing'),
        ('Industry',   'AWS / GCP connect'),
        ('Investor',   'Angel / seed network access'),
    ]
    sw = (W - 48 - 24) / len(supports)
    for i, (t, s) in enumerate(supports):
        sx = 36 + i * (sw + 4)
        rr(c, sx, y_mid + 14, sw, 60, r=4, fill=WHITE, stroke=BORDER, sw=0.8)
        c.setFont('Helvetica-Bold', 8)
        c.setFillColor(NAVY)
        c.drawCentredString(sx + sw / 2, y_mid + 58, t)
        c.setFont('Helvetica', 7)
        c.setFillColor(MID)
        c.drawCentredString(sx + sw / 2, y_mid + 44, s)

    ch_bot = y_mid - 38
    rr(c, 24, 30, W - 48, ch_bot, r=6, fill=NAVY)
    c.setFont('Helvetica-Bold', 11)
    c.setFillColor(WHITE)
    c.drawCentredString(W / 2, 30 + ch_bot - 22, 'Team ARGUS INNOVATORS — Official Sign-Off')
    c.setFont('Helvetica', 8.5)
    c.setFillColor(PALE)
    members = [
        'L. Vishnu Priya  (Team Leader — Lead Architect & Cloud Systems)',
        'Harini Sri B K  (ML Anomaly Detection & Time-Series Forecaster)',
        'Tharagai V  (Multi-Cloud Drivers, K8s Scale-to-0 & Sweep Engine)',
        'Vishalini S  (Next.js 14 Dashboard, Slack ChatOps & ESG Analytics)',
    ]
    my = 30 + ch_bot - 42
    for m in members:
        c.drawCentredString(W / 2, my, m)
        my -= 16

    c.setFont('Helvetica', 7.5)
    c.setFillColor(LBLUE)
    c.drawCentredString(W / 2, my - 4,
        'GitHub: https://github.com/vishnu1107-star/CLOUD-PULSE   |   Portal: https://marvelous-rugelach-27a627.netlify.app')

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════════

def build(path):
    cv = canvas.Canvas(path, pagesize=landscape(letter))
    slide1(cv)
    slide2(cv)
    slide3(cv)
    slide4(cv)
    slide5(cv)
    slide6(cv)
    slide7(cv)
    slide8(cv)
    cv.save()
    print(f'[OK] Generated presentation PDF at: {path}')


if __name__ == '__main__':
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    root = os.path.dirname(base)

    targets = [
        os.path.join(base, 'ARGUS_Innovators_Presentation.pdf'),
        os.path.join(root, 'ARGUS_Innovators_Presentation.pdf'),
    ]

    for t in targets:
        try:
            build(t)
        except PermissionError:
            print(f'[SKIP] {t} is open in a reader — close it and re-run.')

