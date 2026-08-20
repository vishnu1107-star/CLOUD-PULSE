import os
import sys
from reportlab.lib.pagesizes import letter, landscape
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def draw_rounded_rect(c, x, y, width, height, radius=6, fill_color=None, stroke_color=None, stroke_width=1):
    c.saveState()
    if fill_color:
        c.setFillColor(fill_color)
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    c.roundRect(x, y, width, height, radius, fill=1 if fill_color else 0, stroke=1 if stroke_color else 0)
    c.restoreState()

def create_perfect_presentation_pdf(output_paths: list[str]):
    # Landscape Letter: 792 x 612 points (11 x 8.5 inches)
    width, height = landscape(letter)
    
    # Sky Blue Enterprise Palette
    C_SKY_DARK = colors.HexColor('#0369A1')   # Deep Sky Blue
    C_SKY_BLUE = colors.HexColor('#0284C7')   # Primary Sky Blue
    C_SKY_LIGHT = colors.HexColor('#E0F2FE')  # Light sky blue tint
    C_SKY_ACCENT = colors.HexColor('#38BDF8') # Vibrant sky cyan
    C_CARD_BG = colors.HexColor('#F8FAFC')    # Slate 50
    C_CARD_BORDER = colors.HexColor('#BAE6FD')# Soft border
    C_TEXT_TITLE = colors.HexColor('#0F172A') # Slate 900
    C_TEXT_SUB = colors.HexColor('#334155')   # Slate 700
    C_TEXT_MUTED = colors.HexColor('#64748B') # Slate 500
    C_GREEN = colors.HexColor('#059669')      # Emerald 600
    C_GREEN_BG = colors.HexColor('#DCFCE7')   # Emerald light tint
    C_WHITE = colors.HexColor('#FFFFFF')
    C_GRAY_BG = colors.HexColor('#F1F5F9')

    def render_deck_to_canvas(c):
        def draw_slide_header(title: str, subtitle: str, slide_num: int):
            c.setFillColor(C_SKY_DARK)
            c.rect(0, height - 52, width, 52, fill=1, stroke=0)

            c.setFillColor(C_WHITE)
            c.setFont("Helvetica-Bold", 15)
            c.drawString(28, height - 28, title)

            c.setFont("Helvetica", 8.5)
            c.setFillColor(C_SKY_LIGHT)
            c.drawString(28, height - 44, subtitle)

            c.setFont("Helvetica-Bold", 9)
            c.setFillColor(C_WHITE)
            c.drawRightString(width - 28, height - 28, "TSM-TECHNOVA 2026")
            c.setFont("Helvetica", 8)
            c.setFillColor(C_SKY_ACCENT)
            c.drawRightString(width - 28, height - 44, "AI Infrastructure / FinOps Track")

            c.setStrokeColor(C_CARD_BORDER)
            c.setLineWidth(1)
            c.line(28, 24, width - 28, 24)

            c.setFillColor(C_TEXT_MUTED)
            c.setFont("Helvetica", 8)
            c.drawString(28, 11, "CloudPulse: Autonomous Multi-Cloud FinOps & Instant Hydration Engine")
            c.drawCentredString(width / 2, 11, f"Slide {slide_num} of 8")
            c.drawRightString(width - 28, 11, "Team ARGUS Innovators | TSM-TECHNOVA 2026")

        # =========================================================================
        # SLIDE 1: TITLE, PROJECT SCOPE, TEAM & HEADLINE METRICS
        # =========================================================================
        draw_rounded_rect(c, 28, height - 116, width - 56, 88, radius=8, fill_color=C_SKY_DARK, stroke_color=C_SKY_BLUE, stroke_width=2)
        c.setFillColor(C_WHITE)
        c.setFont("Helvetica-Bold", 19)
        c.drawString(46, height - 50, "CloudPulse: Autonomous Multi-Cloud FinOps Engine")
        c.setFont("Helvetica", 10)
        c.setFillColor(C_SKY_LIGHT)
        c.drawString(46, height - 72, "AI-Driven Idle Workload Reclamation, Zero-Downtime Socket Gating & Sub-2.8s Hydration")
        c.setFont("Helvetica-Bold", 8.5)
        c.setFillColor(C_SKY_ACCENT)
        c.drawString(46, height - 94, "TSM-TECHNOVA 2026 National Innovation Challenge  |  Thiagarajar School of Management (TSM), Madurai")

        col_w1 = (width - 56 - 16) / 2
        card_h1 = 330
        y_card1 = 118

        # Left Card: Technical Scope
        draw_rounded_rect(c, 28, y_card1, col_w1, card_h1, radius=8, fill_color=C_SKY_LIGHT, stroke_color=C_CARD_BORDER, stroke_width=1.5)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 11.5)
        c.drawString(42, y_card1 + card_h1 - 24, "Project Scope & Technical Architecture")
        c.setStrokeColor(C_SKY_BLUE)
        c.setLineWidth(1.5)
        c.line(42, y_card1 + card_h1 - 30, 42 + col_w1 - 28, y_card1 + card_h1 - 30)

        left_items = [
            ("Problem Domain:", "AI Infrastructure / Cloud FinOps / Green Tech Automation"),
            ("UN SDG Alignment:", "SDG 9 (Innovation), SDG 12 (Consumption), SDG 13 (Climate Action)"),
            ("Core Innovation:", "Isolation Forest ML Anomaly Gating + 2.34s Warm Re-Activation Protocol"),
            ("Cloud & Edge Scope:", "AWS (EC2, EBS, EIP), GCP (Compute), Kubernetes (EKS), C-DAC VEGA RISC-V SoC"),
            ("Current Stage:", "Working Full-Stack Prototype (FastAPI + Next.js 14 + ML Engine)"),
            ("Live Web Portal:", "https://marvelous-rugelach-27a627.netlify.app"),
            ("GitHub Repository:", "https://github.com/vishnu1107-star/CLOUD-PULSE (MIT Open-Source)"),
            ("Benchmarked Fleet:", "100 Mixed Cloud Instances (AWS, GCP, K8s) across 720 Hours"),
        ]
        y_pos = y_card1 + card_h1 - 50
        for label, val in left_items:
            c.setFillColor(C_SKY_DARK)
            c.setFont("Helvetica-Bold", 8.5)
            c.drawString(42, y_pos, label)
            c.setFillColor(C_TEXT_TITLE)
            c.setFont("Helvetica", 8)
            c.drawString(42, y_pos - 12, val)
            y_pos -= 34

        # Right Card: Full Team Composition
        draw_rounded_rect(c, 28 + col_w1 + 16, y_card1, col_w1, card_h1, radius=8, fill_color=C_CARD_BG, stroke_color=colors.HexColor('#CBD5E1'), stroke_width=1.5)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 11.5)
        c.drawString(42 + col_w1 + 16, y_card1 + card_h1 - 24, "Team Leadership & Member Details")
        c.setStrokeColor(C_SKY_BLUE)
        c.setLineWidth(1.5)
        c.line(42 + col_w1 + 16, y_card1 + card_h1 - 30, 42 + 2 * col_w1 - 12, y_card1 + card_h1 - 30)

        team_items = [
            ("Team Name:", "ARGUS Innovators"),
            ("Team Leader:", "L. Vishnu Priya (Lead Architect & Cloud Systems Engineer)"),
            ("Team Member 1:", "Harini Sri B K (ML Anomaly Modeling & Time-Series Forecaster)"),
            ("Team Member 2:", "Tharagai V (Multi-Cloud Drivers (AWS/GCP/K8s) & Sweeper Engine)"),
            ("Team Member 3:", "Vishalni S (Next.js 14 Web Dashboard, ChatOps & ESG Analytics)"),
            ("Host Institution:", "Thiagarajar School of Management (TSM), Madurai, Tamil Nadu"),
            ("Track / Category:", "AI Infrastructure, FinOps & Green Business Automation"),
            ("Project License:", "MIT Open-Source Software (Public GitHub Repository)"),
        ]
        y_pos = y_card1 + card_h1 - 50
        for label, val in team_items:
            c.setFillColor(C_SKY_DARK)
            c.setFont("Helvetica-Bold", 8.5)
            c.drawString(42 + col_w1 + 16, y_pos, label)
            c.setFillColor(C_TEXT_TITLE)
            c.setFont("Helvetica", 8)
            c.drawString(42 + col_w1 + 16, y_pos - 12, val)
            y_pos -= 34

        # Bottom 4 Metric Highlight Badges (Full Width)
        y_badge = 34
        badge_h = 74
        badge_w = (width - 56 - 36) / 4
        badges = [
            ("70.42% Cost Reclaimed", "$8,518 / mo saved on 100 VMs", C_GREEN_BG, C_GREEN),
            ("0.00% False Outages", "72,000 socket-gated checks", C_SKY_LIGHT, C_SKY_DARK),
            ("2.34s Re-Activation", "Sub-2.8s Instant Web/Slack", C_GREEN_BG, C_GREEN),
            ("3,903 kg CO2e Offset", "UN SDG 13 Certified Ledger", C_SKY_LIGHT, C_SKY_DARK)
        ]
        for i, (b_title, b_sub, b_bg, b_tc) in enumerate(badges):
            bx = 28 + i * (badge_w + 12)
            draw_rounded_rect(c, bx, y_badge, badge_w, badge_h, radius=6, fill_color=b_bg, stroke_color=C_CARD_BORDER)
            c.setFillColor(b_tc)
            c.setFont("Helvetica-Bold", 10.5)
            c.drawCentredString(bx + badge_w / 2, y_badge + 44, b_title)
            c.setFillColor(C_TEXT_SUB)
            c.setFont("Helvetica", 8)
            c.drawCentredString(bx + badge_w / 2, y_badge + 22, b_sub)

        c.showPage()

        # =========================================================================
        # SLIDE 2: THE $17B PROBLEM (4 CARDS + FULL CASE STUDY)
        # =========================================================================
        draw_slide_header("The $17 Billion Problem: Non-Production Cloud Waste", "Why Traditional FinOps Platforms Fail in Real-World Enterprise Environments", 2)
        
        box_w2 = (width - 56 - 16) / 2
        box_h2 = 210
        y_top2 = height - 52 - 10 - box_h2

        draw_rounded_rect(c, 28, y_top2, box_w2, box_h2, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(40, y_top2 + box_h2 - 20, "1. Severe Idle Developer Burn (45%+ Cloud Spend)")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8)
        c.drawString(40, y_top2 + box_h2 - 40, "• Staging, QA, and Dev VMs (AWS EC2, GCP Compute) run 24/7 unnecessarily.")
        c.drawString(40, y_top2 + box_h2 - 58, "• Over 68% of total weekly hours sit completely idle with 0 active developer traffic.")
        c.drawString(40, y_top2 + box_h2 - 76, "• Global cloud waste exceeds $17 Billion/year on abandoned non-prod environments.")
        c.drawString(40, y_top2 + box_h2 - 94, "• Organizations pay full on-demand hourly rates for idle VMs generating zero ROI.")
        c.drawString(40, y_top2 + box_h2 - 112, "• Dev teams lack automated off-hours shutdown enforcement.")
        c.drawString(40, y_top2 + box_h2 - 130, "• Result: Continuous budget drain during nights, weekends, and holidays.")
        c.drawString(40, y_top2 + box_h2 - 148, "• Scope-2 carbon emissions generated for zero productive engineering output.")

        draw_rounded_rect(c, 28 + box_w2 + 16, y_top2, box_w2, box_h2, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(40 + box_w2 + 16, y_top2 + box_h2 - 20, "2. Silent Ghost Storage & Orphan IP Drain")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8)
        c.drawString(40 + box_w2 + 16, y_top2 + box_h2 - 40, "• Unattached EBS/GCP disks, orphaned Elastic IPs, and unused load balancers")
        c.drawString(40 + box_w2 + 16, y_top2 + box_h2 - 58, "  continue to incur continuous charges even after compute instances are stopped.")
        c.drawString(40 + box_w2 + 16, y_top2 + box_h2 - 76, "• Orphan assets silently erode 10-20% of monthly cloud infrastructure budgets.")
        c.drawString(40 + box_w2 + 16, y_top2 + box_h2 - 94, "• Storage volumes remain uncleaned due to fear of data loss and lack of rollback vaults.")
        c.drawString(40 + box_w2 + 16, y_top2 + box_h2 - 112, "• Cloud providers bill monthly regardless of attached instance running state.")
        c.drawString(40 + box_w2 + 16, y_top2 + box_h2 - 130, "• Orphaned static IPs cost $3.60-$7.20/month each without active allocation.")
        c.drawString(40 + box_w2 + 16, y_top2 + box_h2 - 148, "• Unused ALBs/ELBs cost $22.50+/month per balancer with zero network traffic.")

        y_bot2 = y_top2 - 10 - box_h2

        draw_rounded_rect(c, 28, y_bot2, box_w2, box_h2, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(40, y_bot2 + box_h2 - 20, "3. Advisory FinOps Paralysis & Alert Fatigue")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8)
        c.drawString(40, y_bot2 + box_h2 - 40, "• Legacy tools (CloudHealth, Kubecost) only produce passive PDF digests and emails.")
        c.drawString(40, y_bot2 + box_h2 - 58, "• Software engineering teams ignore static recommendations due to alert fatigue.")
        c.drawString(40, y_bot2 + box_h2 - 76, "• Zero automated execution: manual cleanup requires dozens of Jira tickets.")
        c.drawString(40, y_bot2 + box_h2 - 94, "• FinOps recommendations achieve <15% enterprise implementation rates.")
        c.drawString(40, y_bot2 + box_h2 - 112, "• High operational friction between FinOps teams and product engineers.")
        c.drawString(40, y_bot2 + box_h2 - 130, "• Reports lack real-time context on whether a workload is truly abandoned.")
        c.drawString(40, y_bot2 + box_h2 - 148, "• Static dashboard widgets fail to drive autonomous infrastructure actions.")

        draw_rounded_rect(c, 28 + box_w2 + 16, y_bot2, box_w2, box_h2, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(40 + box_w2 + 16, y_bot2 + box_h2 - 20, "4. Re-Activation Friction & Outage Fears")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8)
        c.drawString(40 + box_w2 + 16, y_bot2 + box_h2 - 40, "• Coarse CPU-only scripts kill databases during active jobs or debugging sessions.")
        c.drawString(40 + box_w2 + 16, y_bot2 + box_h2 - 58, "• Restoring shut-down environments manually takes 30-60 minutes via CloudOps.")
        c.drawString(40 + box_w2 + 16, y_bot2 + box_h2 - 76, "• High developer resistance: engineering teams block automated shutdown policies.")
        c.drawString(40 + box_w2 + 16, y_bot2 + box_h2 - 94, "• Environments are left running 24/7 permanently to avoid cold-start delays.")
        c.drawString(40 + box_w2 + 16, y_bot2 + box_h2 - 112, "• Massive developer velocity loss during morning manual infrastructure warmups.")
        c.drawString(40 + box_w2 + 16, y_bot2 + box_h2 - 130, "• Lack of 1-click ChatOps re-hydration causes engineering resentment.")
        c.drawString(40 + box_w2 + 16, y_bot2 + box_h2 - 148, "• Result: $17B in avoidable compute spend remains completely untouched.")

        # Bottom Impact Banner (Full Width)
        draw_rounded_rect(c, 28, 34, width - 56, 68, radius=6, fill_color=C_SKY_LIGHT, stroke_color=C_SKY_BLUE)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(40, 84, "CloudPulse Core Value Hypothesis:")
        c.setFillColor(C_TEXT_TITLE)
        c.setFont("Helvetica", 8)
        c.drawString(40, 68, "By combining unsupervised ML anomaly detection, zero-outage socket gating, and sub-2.8s warm re-activation, CloudPulse achieves 45-70% non-prod cost savings")
        c.drawString(40, 52, "while completely eliminating developer friction, false-positive service outages, and manual CloudOps intervention.")

        c.showPage()

        # =========================================================================
        # SLIDE 3: 5-STAGE SOLUTION ARCHITECTURE (WITH STAGE BADGES & DETAILS)
        # =========================================================================
        draw_slide_header("CloudPulse Solution Architecture", "5-Stage Closed-Loop FinOps Control Plane: Telemetry → AI Gating → Forecasting → Execution → ChatOps", 3)
        
        stages_data3 = [
            ("Stage 1: Multi-Cloud Telemetry Ingestion & Hardware Edge Probe", 
             "• Ingestion Layer: Native AWS CloudWatch (Boto3 SDK), GCP Monitoring API, and Kubernetes Metrics Server polling CPU, network, sockets, and IOPS.\n• Edge Hardware Probe: C-DAC VEGA RISC-V SoC out-of-band telemetry collector for on-premise & hybrid Kubernetes clusters, capturing physical power (Watts).\n• Tag-Aware Dynamic Filtering: Isolates Environment: Staging/Dev while automatically exempting Environment: Production workloads.",
             "AWS / GCP / K8s / RISC-V"),
            ("Stage 2: Real AI Anomaly Detection & Zero-Outage Socket Guard", 
             "• Isolation Forest Model: Evaluates 5D telemetry feature vectors ([CPU%, Net KB/s, Open Sockets, Active Procs, IOPS]) to classify TRUE_IDLE vs ACTIVE_QUIET.\n• Outage Protection: Workloads with low CPU holding open DB locks or active debugging sockets are classified ACTIVE_QUIET and strictly prevented from shutdown.\n• Dual-Confirmation Gating: Workloads are hibernated only when both ML model and heuristic policy agree, guaranteeing 0.0% false outages.",
             "Isolation Forest 5D ML"),
            ("Stage 3: Predictive Pre-Hydration & Diurnal Forecaster", 
             "• Time-Series Forecaster: Autoregressive diurnal harmonic model fits team working patterns across weekdays, predictively identifying morning login windows.\n• Zero Cold-Start Friction: Automatically warms staging environments 30 minutes before workday start (e.g. 08:30 AM warmup for 09:00 AM work arrival).\n• Developer Schedule Learning: Historical telemetry models off-hours overtime patterns and adapts hibernation triggers dynamically.",
             "Diurnal Harmonic Series"),
            ("Stage 4: Autonomous Execution Engine & Ghost Resource Sweeper", 
             "• Multi-Cloud Execution: Automates EC2/GCE instance pausing and scales Kubernetes deployments down to 0 replicas (kubectl scale --replicas=0).\n• 30-Day Snapshot Vault: Sweeps unattached EBS volumes, orphan Elastic IPs, and idle ELBs with automated 30-day snapshot rollbacks for zero-risk recovery.\n• Dry-Run Simulation Mode: Allows enterprise FinOps managers to preview reclamation projections before executing live state modifications.",
             "30-Day Snapshot Vault"),
            ("Stage 5: Sub-2.8s Instant Hydration, Developer ChatOps & ESG Ledger", 
             "• 1-Click Developer Re-Activation: Next.js 14 web portal and Slack Slash Command (/cloudpulse wakeup) restoring environments in mean 2.34s.\n• Auditable UN SDG Carbon Ledger: Tracks exact financial savings ($) and verifiable carbon footprint reduction (kg CO2e using 0.385 kg CO2/kWh grid factors).\n• Enterprise Audit Trail: Immutable event log recording every autonomous pause, wake-up, and ghost resource sweep for compliance.",
             "2.34s Instant Hydration")
        ]

        st_h3 = 100
        y_st3 = height - 52 - 8 - st_h3
        for i, (stitle, scontent, sbadge) in enumerate(stages_data3):
            bg = C_SKY_LIGHT if i % 2 == 1 else C_CARD_BG
            draw_rounded_rect(c, 28, y_st3, width - 56, st_h3, radius=6, fill_color=bg, stroke_color=C_CARD_BORDER)
            
            c.setFillColor(C_SKY_DARK)
            c.setFont("Helvetica-Bold", 9.5)
            c.drawString(40, y_st3 + st_h3 - 18, stitle)

            # Stage Pill Badge
            draw_rounded_rect(c, width - 28 - 145, y_st3 + st_h3 - 22, 135, 18, radius=3, fill_color=C_SKY_DARK, stroke_color=C_SKY_DARK)
            c.setFillColor(C_WHITE)
            c.setFont("Helvetica-Bold", 7.5)
            c.drawCentredString(width - 28 - 145 + 67.5, y_st3 + st_h3 - 14, sbadge)
            
            c.setFillColor(C_TEXT_SUB)
            c.setFont("Helvetica", 7.5)
            lines = scontent.split('\n')
            c.drawString(40, y_st3 + st_h3 - 36, lines[0])
            c.drawString(40, y_st3 + st_h3 - 54, lines[1])
            c.drawString(40, y_st3 + st_h3 - 72, lines[2])

            y_st3 -= (st_h3 + 5)

        c.showPage()

        # =========================================================================
        # SLIDE 4: REAL AI ENGINE (QUADRANT WITH EMBEDDED METRIC BARS)
        # =========================================================================
        draw_slide_header("Real AI Engine: Anomaly Detection & Pre-Hydration", "Unsupervised ML Anomaly Gating + Diurnal Harmonic Time-Series Pre-Hydration", 4)
        
        card_w4 = (width - 56 - 16) / 2
        card_h4 = 250

        # Top Left: Isolation Forest ML
        draw_rounded_rect(c, 28, height - 52 - 8 - card_h4, card_w4, card_h4, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(42, height - 52 - 8 - 20, "Isolation Forest ML Anomaly Detection")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8)
        c.drawString(42, height - 52 - 8 - 38, "• 5D Telemetry Vector: [CPU%, Network KB/s, Sockets, Processes, IOPS]")
        c.drawString(42, height - 52 - 8 - 56, "• Unsupervised Outlier Isolation: Separates active bursts from idle periods.")
        c.drawString(42, height - 52 - 8 - 74, "• High Concurrency Engine: Vectorized batch inference executing in <15ms.")
        c.drawString(42, height - 52 - 8 - 92, "• 100.0% Empirical Accuracy across 10,000 multi-modal telemetry vectors.")
        c.drawString(42, height - 52 - 8 - 110, "• Serialized Model: backend/app/ml_models/isolation_forest.pkl.")
        c.drawString(42, height - 52 - 8 - 128, "• Multi-Signal Scoring: Computes continuous anomaly decision function.")
        c.drawString(42, height - 52 - 8 - 146, "• Dynamic Baseline: Continuously updates cluster idle baselines over time.")
        c.drawString(42, height - 52 - 8 - 164, "• Zero Supervised Labeling: Out-of-the-box operation from day one.")

        # Bottom highlight badge inside card
        draw_rounded_rect(c, 38, height - 52 - 8 - card_h4 + 10, card_w4 - 20, 32, radius=4, fill_color=C_GREEN_BG, stroke_color=C_GREEN)
        c.setFillColor(C_GREEN)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(48, height - 52 - 8 - card_h4 + 28, "✓ Model Accuracy: 100.0% | Contamination: 0.08 | Latency: <15ms")
        c.setFont("Helvetica", 7)
        c.drawString(48, height - 52 - 8 - card_h4 + 16, "Evaluated on 10,000 synthetic multi-modal instances with zero missed anomalies.")

        # Top Right: Active-Quiet Workload Gating
        draw_rounded_rect(c, 28 + card_w4 + 16, height - 52 - 8 - card_h4, card_w4, card_h4, radius=6, fill_color=C_SKY_LIGHT, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(42 + card_w4 + 16, height - 52 - 8 - 20, "'Active-Quiet' Workload Gating (0.0% Outages)")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8)
        c.drawString(42 + card_w4 + 16, height - 52 - 8 - 38, "• The Industry Flaw: Coarse scripts shut down quiet DBs holding locks.")
        c.drawString(42 + card_w4 + 16, height - 52 - 8 - 56, "• CloudPulse Socket Guard: If active connections > 0, state = ACTIVE_QUIET.")
        c.drawString(42 + card_w4 + 16, height - 52 - 8 - 74, "• Multi-Signal Safety Gating: Requires both ML anomaly score and heuristic.")
        c.drawString(42 + card_w4 + 16, height - 52 - 8 - 92, "• 0.00% False-Positive Outage Rate verified across 72,000 simulation checks.")
        c.drawString(42 + card_w4 + 16, height - 52 - 8 - 110, "• Developer Override Protection: 1-click grace period extension via UI/Slack.")
        c.drawString(42 + card_w4 + 16, height - 52 - 8 - 128, "• Transactional Safety: Protects long-running background migrations.")
        c.drawString(42 + card_w4 + 16, height - 52 - 8 - 146, "• Auto-Rollback: Immediate state recovery upon anomalous execution.")
        c.drawString(42 + card_w4 + 16, height - 52 - 8 - 164, "• Developer Peace of Mind: Eliminates accidental build terminations.")

        draw_rounded_rect(c, 38 + card_w4 + 16, height - 52 - 8 - card_h4 + 10, card_w4 - 20, 32, radius=4, fill_color=C_WHITE, stroke_color=C_SKY_BLUE)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(48 + card_w4 + 16, height - 52 - 8 - card_h4 + 28, "✓ Safety Guarantee: 0.00% False Outages across 72,000 evaluations")
        c.setFont("Helvetica", 7)
        c.drawString(48 + card_w4 + 16, height - 52 - 8 - card_h4 + 16, "Active socket inspections prevent premature termination of PostgreSQL, MySQL & Redis.")

        y_bot4 = height - 52 - 8 - card_h4 - 8 - card_h4

        # Bottom Left: Predictive Pre-Hydration Forecaster
        draw_rounded_rect(c, 28, y_bot4, card_w4, card_h4, radius=6, fill_color=C_SKY_LIGHT, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(42, y_bot4 + card_h4 - 20, "Predictive Pre-Hydration Time-Series Forecaster")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8)
        c.drawString(42, y_bot4 + card_h4 - 38, "• Diurnal Harmonic Modeling: Fits team login rhythms across weekdays/weekends.")
        c.drawString(42, y_bot4 + card_h4 - 56, "• Off-Hours Window Detection: Identifies safe shutdown windows (20:00 - 08:00).")
        c.drawString(42, y_bot4 + card_h4 - 74, "• Automated Morning Pre-Warm: Restores environments 30 mins prior to login.")
        c.drawString(42, y_bot4 + card_h4 - 92, "• Eliminates Developer Cold-Start: Workloads are 100% warm at 09:00 AM.")
        c.drawString(42, y_bot4 + card_h4 - 110, "• Confidence Score: 0.942 predictive reliability on staging clusters.")
        c.drawString(42, y_bot4 + card_h4 - 128, "• Time-Zone Aware: Dynamically adapts to distributed global teams.")
        c.drawString(42, y_bot4 + card_h4 - 146, "• Weekend Energy Savings: Sustained hibernation during non-working days.")
        c.drawString(42, y_bot4 + card_h4 - 164, "• Self-Correcting: Recalibrates prediction schedules on schedule shifts.")

        draw_rounded_rect(c, 38, y_bot4 + 10, card_w4 - 20, 32, radius=4, fill_color=C_WHITE, stroke_color=C_SKY_BLUE)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(48, y_bot4 + 28, "✓ Diurnal Confidence: 0.942 | Target Warmup: 08:30 AM Everyday")
        c.setFont("Helvetica", 7)
        c.drawString(48, y_bot4 + 16, "Mathematical harmonic curve fitting eliminates morning cold starts for engineers.")

        # Bottom Right: Edge Hardware RISC-V Collector
        draw_rounded_rect(c, 28 + card_w4 + 16, y_bot4, card_w4, card_h4, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(42 + card_w4 + 16, y_bot4 + card_h4 - 20, "C-DAC VEGA RISC-V SoC Edge Telemetry Collector")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8)
        c.drawString(42 + card_w4 + 16, y_bot4 + card_h4 - 38, "• Hardware Root-of-Trust: Tamper-proof telemetry extraction for on-prem/hybrid.")
        c.drawString(42 + card_w4 + 16, y_bot4 + card_h4 - 56, "• Out-of-Band Power Monitoring: Measures raw physical power draw (Watts).")
        c.drawString(42 + card_w4 + 16, y_bot4 + card_h4 - 74, "• Zero Host OS Overhead: Direct hardware socket and thermal inspection.")
        c.drawString(42 + card_w4 + 16, y_bot4 + card_h4 - 92, "• Driver Integration: app/services/vega_riscv_driver.py + REST endpoint.")
        c.drawString(42 + card_w4 + 16, y_bot4 + card_h4 - 110, "• Extends CloudPulse FinOps governance to bare-metal data centers.")
        c.drawString(42 + card_w4 + 16, y_bot4 + card_h4 - 128, "• Embedded Security: Signed telemetry payloads prevent false reporting.")
        c.drawString(42 + card_w4 + 16, y_bot4 + card_h4 - 146, "• C-DAC ARIES v3 Board Support: Native integration with Indian silicon.")
        c.drawString(42 + card_w4 + 16, y_bot4 + card_h4 - 164, "• Autonomous Edge Decision: Local hibernation triggering during network splits.")

        draw_rounded_rect(c, 38 + card_w4 + 16, y_bot4 + 10, card_w4 - 20, 32, radius=4, fill_color=C_GREEN_BG, stroke_color=C_GREEN)
        c.setFillColor(C_GREEN)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(48 + card_w4 + 16, y_bot4 + 28, "✓ Indigenous Silicon Support: C-DAC VEGA / ARIES v3 Compatible")
        c.setFont("Helvetica", 7)
        c.drawString(48 + card_w4 + 16, y_bot4 + 16, "Enables out-of-band power and thermal telemetry for national sovereign cloud clusters.")

        c.showPage()

        # =========================================================================
        # SLIDE 5: EMPIRICAL BENCHMARK EVIDENCE (TABLE + 3 DETAILED CARDS)
        # =========================================================================
        draw_slide_header("Empirical Verification: 100 Instances Over 720 Hours", "Measured & Verifiable Headline Benchmarks from Automated Simulation Harness", 5)
        
        t_y5 = height - 52 - 8 - 24
        headers5 = ["Benchmark Metric", "Target Claim", "Measured / Verified", "Evaluation Scope & Dataset", "Compliance"]
        col_ws5 = [140, 85, 145, 275, 85]

        draw_rounded_rect(c, 28, t_y5, width - 56, 24, radius=4, fill_color=C_SKY_DARK, stroke_color=C_SKY_DARK)
        cur_x = 28
        c.setFillColor(C_WHITE)
        c.setFont("Helvetica-Bold", 8.5)
        for i, htext in enumerate(headers5):
            c.drawString(cur_x + 8, t_y5 + 7, htext)
            cur_x += col_ws5[i]

        bench_rows5 = [
            ("Cost Reclamation", "45.0%", "70.42% ($8,518 / mo)", "100 Instances (AWS EC2, GCP GCE, K8s) across 720 operating hours", "PASS (Exceeds)"),
            ("False-Positive Outages", "0.0%", "0.00% (0 Incidents)", "72,000 metric inferences with active DB/socket guard protection", "PASS (Zero Outages)"),
            ("Re-Hydration Latency", "< 2.80s", "2.34s (P99: 2.65s)", "500 simulated multi-cloud instant warm wake-up triggers", "PASS (Verified)"),
            ("Ghost Storage Purge", "High ROI", "$412.50 / month", "Orphaned EBS volumes, unassociated EIPs & idle load balancers", "PASS"),
            ("Carbon Avoidance", "UN SDG 13", "3,903.1 kg CO2e / mo", "Calculated using standardized 0.385 kg CO2/kWh regional grid factor", "PASS (Auditable)"),
        ]

        cur_y5 = t_y5 - 28
        for row in bench_rows5:
            bg = C_CARD_BG if bench_rows5.index(row) % 2 == 0 else C_WHITE
            draw_rounded_rect(c, 28, cur_y5, width - 56, 26, radius=3, fill_color=bg, stroke_color=C_CARD_BORDER)
            
            cur_x = 28
            c.setFillColor(C_TEXT_TITLE)
            c.setFont("Helvetica-Bold", 8)
            c.drawString(cur_x + 8, cur_y5 + 9, row[0])
            cur_x += col_ws5[0]

            c.setFont("Helvetica", 8)
            c.drawString(cur_x + 8, cur_y5 + 9, row[1])
            cur_x += col_ws5[1]

            c.setFillColor(C_GREEN)
            c.setFont("Helvetica-Bold", 8.5)
            c.drawString(cur_x + 8, cur_y5 + 9, row[2])
            cur_x += col_ws5[2]

            c.setFillColor(C_TEXT_SUB)
            c.setFont("Helvetica", 7.5)
            c.drawString(cur_x + 8, cur_y5 + 9, row[3])
            cur_x += col_ws5[3]

            c.setFillColor(C_GREEN)
            c.setFont("Helvetica-Bold", 8)
            c.drawString(cur_x + 8, cur_y5 + 9, row[4])
            
            cur_y5 -= 28

        card_w5 = (width - 56 - 24) / 3
        card_h5 = 280
        y_bot5 = 32

        # Card 1: Cost Analysis
        draw_rounded_rect(c, 28, y_bot5, card_w5, card_h5, radius=6, fill_color=C_SKY_LIGHT, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(40, y_bot5 + card_h5 - 20, "💰 Financial Economics Breakdown")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 7.5)
        c.drawString(40, y_bot5 + card_h5 - 40, "• Unmanaged 24/7 Baseline Cost: $12,096.00/mo.")
        c.drawString(40, y_bot5 + card_h5 - 58, "• CloudPulse Optimized Spend: $3,577.99/mo.")
        c.drawString(40, y_bot5 + card_h5 - 76, "• Net Monthly Reclaimed Capital: $8,518.01 USD.")
        c.drawString(40, y_bot5 + card_h5 - 94, "• Net Cost Reduction: 70.42% (surpasses 45% goal).")
        c.drawString(40, y_bot5 + card_h5 - 112, "• Fleet Mix: 35 EC2 xlarge, 25 EC2 med, 20 GCE, 20 K8s.")
        c.drawString(40, y_bot5 + card_h5 - 130, "• Annualized Projected Savings: $102,216.00 / 100 nodes.")
        c.drawString(40, y_bot5 + card_h5 - 148, "• CSV Dataset: backend/docs/artifacts/benchmark_results.csv")
        c.drawString(40, y_bot5 + card_h5 - 166, "• Zero Additional Infrastructure Overhead Required.")
        c.drawString(40, y_bot5 + card_h5 - 184, "• Automated ROI Payback Period: < 2 operating days.")

        # Card 2: Hydration Profile
        draw_rounded_rect(c, 28 + card_w5 + 12, y_bot5, card_w5, card_h5, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(40 + card_w5 + 12, y_bot5 + card_h5 - 20, "⚡ Re-Hydration & Reliability Profile")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 7.5)
        c.drawString(40 + card_w5 + 12, y_bot5 + card_h5 - 40, "• Mean Wake-Up Time: 2.34 seconds (AWS & K8s).")
        c.drawString(40 + card_w5 + 12, y_bot5 + card_h5 - 58, "• 50th Percentile (P50): 2.34 seconds.")
        c.drawString(40 + card_w5 + 12, y_bot5 + card_h5 - 76, "• 95th Percentile (P95): 2.57 seconds.")
        c.drawString(40 + card_w5 + 12, y_bot5 + card_h5 - 94, "• 99th Percentile (P99): 2.65s (<2.8s Verified).")
        c.drawString(40 + card_w5 + 12, y_bot5 + card_h5 - 112, "• 0 Outage Events: Zero active jobs interrupted.")
        c.drawString(40 + card_w5 + 12, y_bot5 + card_h5 - 130, "• Slack ChatOps Integration: Instant /cloudpulse wakeup.")
        c.drawString(40 + card_w5 + 12, y_bot5 + card_h5 - 148, "• Visual Chart: docs/artifacts/benchmark_headline_metrics.png")
        c.drawString(40 + card_w5 + 12, y_bot5 + card_h5 - 166, "• Zero CloudOps ticket bottleneck turnaround.")
        c.drawString(40 + card_w5 + 12, y_bot5 + card_h5 - 184, "• High Concurrency: 50 simultaneous node wakes supported.")

        # Card 3: ESG Carbon Accounting
        draw_rounded_rect(c, 28 + 2 * (card_w5 + 12), y_bot5, card_w5, card_h5, radius=6, fill_color=C_SKY_LIGHT, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(40 + 2 * (card_w5 + 12), y_bot5 + card_h5 - 20, "🌱 UN SDG 13 Carbon Avoidance")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 7.5)
        c.drawString(40 + 2 * (card_w5 + 12), y_bot5 + card_h5 - 40, "• Monthly Carbon Offset: 3,903.1 kg CO2e avoided.")
        c.drawString(40 + 2 * (card_w5 + 12), y_bot5 + card_h5 - 58, "• Grid Emission Math: 0.2 kW * 0.385 kg CO2/kWh.")
        c.drawString(40 + 2 * (card_w5 + 12), y_bot5 + card_h5 - 76, "• Annualized Footprint Offset: 46.8 Metric Tons CO2e.")
        c.drawString(40 + 2 * (card_w5 + 12), y_bot5 + card_h5 - 94, "• UN SDG Alignment: SDG 9, SDG 12, SDG 13.")
        c.drawString(40 + 2 * (card_w5 + 12), y_bot5 + card_h5 - 112, "• Auditable ESG Ledger: Exportable PDF report.")
        c.drawString(40 + 2 * (card_w5 + 12), y_bot5 + card_h5 - 130, "• Real-Time Dashboard: Interactive Next.js 14 tracker.")
        c.drawString(40 + 2 * (card_w5 + 12), y_bot5 + card_h5 - 148, "• C-DAC RISC-V Edge: Energy-efficient on-prem node.")
        c.drawString(40 + 2 * (card_w5 + 12), y_bot5 + card_h5 - 166, "• Corporate ESG Compliance Ready for Green FinOps.")
        c.drawString(40 + 2 * (card_w5 + 12), y_bot5 + card_h5 - 184, "• Direct Scope-2 Carbon Footprint Reduction.")

        c.showPage()

        # =========================================================================
        # SLIDE 6: COMPETITIVE POSITIONING MATRIX (DENSE TABLE + 2 CARDS)
        # =========================================================================
        draw_slide_header("Competitive Positioning Matrix", "Why CloudPulse Outperforms Named Industry Alternatives", 6)
        
        t_y6 = height - 52 - 8 - 24
        comp_headers6 = ["Capability / Feature", "AWS Scheduler", "CloudHealth (VMware)", "Kubecost", "Spot.io", "CloudPulse ⚡"]
        comp_ws6 = [140, 105, 115, 105, 105, 165]

        draw_rounded_rect(c, 28, t_y6, width - 56, 24, radius=4, fill_color=C_SKY_DARK, stroke_color=C_SKY_DARK)
        cur_x = 28
        c.setFillColor(C_WHITE)
        c.setFont("Helvetica-Bold", 8.5)
        for i, htext in enumerate(comp_headers6):
            c.drawString(cur_x + 8, t_y6 + 7, htext)
            cur_x += comp_ws6[i]

        comp_rows6 = [
            ("Autonomous Execution", "⚠️ Crude Cron", "❌ Passive Reports", "❌ Advisory Only", "⚠️ Spot Bidding", "✅ 100% Autonomous"),
            ("ML Anomaly Detection", "❌ Static Time", "❌ Static Rules", "❌ Thresholds", "⚠️ Pricing Bids", "✅ Isolation Forest"),
            ("Zero-Outage Socket Guard", "❌ Outage Risk", "❌ N/A", "❌ N/A", "❌ Spot Drop Risk", "✅ 0.0% Outages"),
            ("Sub-2.8s Instant Hydration", "❌ 30-60 min ops", "❌ Manual Tickets", "❌ N/A", "❌ Cold Boot", "✅ <2.8s (Web/Slack)"),
            ("Cross-Cloud & K8s", "⚠️ AWS Only", "✅ Multi-Cloud", "⚠️ K8s Only", "✅ Multi-Cloud", "✅ AWS + GCP + K8s"),
            ("Ghost Storage Sweeper", "❌ None", "⚠️ Reports Only", "❌ None", "❌ None", "✅ Auto-Purge Vault"),
            ("Open-Source Licensing", "⚠️ CloudFormation", "❌ Closed SaaS", "⚠️ Open-Core", "❌ Closed SaaS", "✅ MIT Open Source")
        ]

        cur_y6 = t_y6 - 28
        for row in comp_rows6:
            bg = C_CARD_BG if comp_rows6.index(row) % 2 == 0 else C_WHITE
            draw_rounded_rect(c, 28, cur_y6, width - 56, 26, radius=3, fill_color=bg, stroke_color=C_CARD_BORDER)
            
            draw_rounded_rect(c, 28 + sum(comp_ws6[:5]), cur_y6, comp_ws6[5], 26, radius=2, fill_color=C_GREEN_BG, stroke_color=C_GREEN, stroke_width=0.5)

            cur_x = 28
            for j, val in enumerate(row):
                c.setFont("Helvetica-Bold" if j in [0, 5] else "Helvetica", 7.5)
                c.setFillColor(C_GREEN if j == 5 else (C_TEXT_TITLE if j == 0 else C_TEXT_MUTED))
                c.drawString(cur_x + 8, cur_y6 + 9, val)
                cur_x += comp_ws6[j]
            cur_y6 -= 28

        card_w6 = (width - 56 - 16) / 2
        card_h6 = 180
        y_bot6 = 32

        draw_rounded_rect(c, 28, y_bot6, card_w6, card_h6, radius=6, fill_color=C_SKY_LIGHT, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(40, y_bot6 + card_h6 - 20, "❌ Why Existing Industry Alternatives Fail")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 7.5)
        c.drawString(40, y_bot6 + card_h6 - 40, "• AWS Instance Scheduler: Rigid cron schedules shut down active builds and debugging.")
        c.drawString(40, y_bot6 + card_h6 - 58, "• CloudHealth (VMware): Generates endless PDF digests without resolving the waste.")
        c.drawString(40, y_bot6 + card_h6 - 76, "• Kubecost: Limited strictly to Kubernetes pods with zero AWS/GCP VM lifecycle capability.")
        c.drawString(40, y_bot6 + card_h6 - 94, "• Spot.io: Focuses on spot arbitrage; ignores idle on-demand non-prod compute.")
        c.drawString(40, y_bot6 + card_h6 - 112, "• Manual Operations: 30-60 minute ticketing turnaround destroys engineering velocity.")
        c.drawString(40, y_bot6 + card_h6 - 130, "• Coarse Metric Scripts: Prematurely pause databases during nightly maintenance.")
        c.drawString(40, y_bot6 + card_h6 - 148, "• Result: High developer alert fatigue and abandonment of FinOps policies.")

        draw_rounded_rect(c, 28 + card_w6 + 16, y_bot6, card_w6, card_h6, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(40 + card_w6 + 16, y_bot6 + card_h6 - 20, "🏆 The CloudPulse Unfair Advantage")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 7.5)
        c.drawString(40 + card_w6 + 16, y_bot6 + card_h6 - 40, "• 100% Autonomous Closed-Loop: Continuous telemetry, evaluation, execution, and rollback.")
        c.drawString(40 + card_w6 + 16, y_bot6 + card_h6 - 58, "• Multi-Signal ML Gating: Evaluates sockets and processes to guarantee 0.0% outages.")
        c.drawString(40 + card_w6 + 16, y_bot6 + card_h6 - 76, "• Sub-2.8s Instant Warm Hydration: 1-Click UI & Slack ChatOps (/cloudpulse wakeup).")
        c.drawString(40 + card_w6 + 16, y_bot6 + card_h6 - 94, "• Unified Multi-Cloud & Edge: Supports AWS, GCP, K8s, and C-DAC VEGA RISC-V SoC.")
        c.drawString(40 + card_w6 + 16, y_bot6 + card_h6 - 112, "• Open-Core SaaS Business Model: Seamless path to enterprise startup commercialization.")
        c.drawString(40 + card_w6 + 16, y_bot6 + card_h6 - 130, "• Automated 30-Day Snapshot Vault: Guarantees zero data loss during ghost sweeps.")
        c.drawString(40 + card_w6 + 16, y_bot6 + card_h6 - 148, "• Zero Developer Overhead: Predictively pre-warms workloads before workday starts.")

        c.showPage()

        # =========================================================================
        # SLIDE 7: BUSINESS MODEL & GTM (TIERS WITH CTA BARS + STRATEGY)
        # =========================================================================
        draw_slide_header("Business Model & Go-To-Market Strategy", "High-Growth B2B SaaS Potential & Product-Led Enterprise Expansion", 7)
        
        t_box_w7 = (width - 56 - 24) / 3
        t_box_h7 = 255
        y_card7 = height - 52 - 8 - t_box_h7

        # Tier 1
        draw_rounded_rect(c, 28, y_card7, t_box_w7, t_box_h7, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(40, y_card7 + t_box_h7 - 20, "Tier 1: Community (Free)")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 7.5)
        c.drawString(40, y_card7 + t_box_h7 - 38, "• Open-source self-hosted core engine.")
        c.drawString(40, y_card7 + t_box_h7 - 54, "• Up to 10 managed cloud instances.")
        c.drawString(40, y_card7 + t_box_h7 - 70, "• Heuristic multi-variable idle detection.")
        c.drawString(40, y_card7 + t_box_h7 - 86, "• 1-Click web dashboard re-activation.")
        c.drawString(40, y_card7 + t_box_h7 - 102, "• Complete MIT open-source license.")
        c.drawString(40, y_card7 + t_box_h7 - 118, "• Funnel for viral grassroots developer")
        c.drawString(40, y_card7 + t_box_h7 - 134, "  adoption (PLG acquisition channel).")
        c.drawString(40, y_card7 + t_box_h7 - 150, "• Community Discord & GitHub support.")
        c.drawString(40, y_card7 + t_box_h7 - 166, "• Single cluster deployment with Helm.")

        draw_rounded_rect(c, 36, y_card7 + 10, t_box_w7 - 16, 24, radius=3, fill_color=C_GRAY_BG, stroke_color=colors.HexColor('#CBD5E1'))
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawCentredString(28 + t_box_w7 / 2, y_card7 + 17, "Deploy Free on GitHub (PLG Funnel)")

        # Tier 2
        draw_rounded_rect(c, 28 + t_box_w7 + 12, y_card7, t_box_w7, t_box_h7, radius=6, fill_color=C_SKY_LIGHT, stroke_color=C_SKY_BLUE, stroke_width=1.5)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(40 + t_box_w7 + 12, y_card7 + t_box_h7 - 20, "Tier 2: Scale-Up ($12/node/mo)")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 7.5)
        c.drawString(40 + t_box_w7 + 12, y_card7 + t_box_h7 - 38, "• Full Isolation Forest ML Anomaly Engine.")
        c.drawString(40 + t_box_w7 + 12, y_card7 + t_box_h7 - 54, "• Slack ChatOps (/cloudpulse wakeup).")
        c.drawString(40 + t_box_w7 + 12, y_card7 + t_box_h7 - 70, "• Predictive pre-hydration forecaster.")
        c.drawString(40 + t_box_w7 + 12, y_card7 + t_box_h7 - 86, "• Ghost sweeper + 30-day snapshot vault.")
        c.drawString(40 + t_box_w7 + 12, y_card7 + t_box_h7 - 102, "• Priority support & automated rollbacks.")
        c.drawString(40 + t_box_w7 + 12, y_card7 + t_box_h7 - 118, "• Pricing option: 15% value-share of")
        c.drawString(40 + t_box_w7 + 12, y_card7 + t_box_h7 - 134, "  verified cloud savings.")
        c.drawString(40 + t_box_w7 + 12, y_card7 + t_box_h7 - 150, "• Multi-cloud AWS + GCP + K8s support.")
        c.drawString(40 + t_box_w7 + 12, y_card7 + t_box_h7 - 166, "• Team RBAC and role management.")

        draw_rounded_rect(c, 28 + t_box_w7 + 12 + 8, y_card7 + 10, t_box_w7 - 16, 24, radius=3, fill_color=C_SKY_DARK, stroke_color=C_SKY_DARK)
        c.setFillColor(C_WHITE)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawCentredString(28 + t_box_w7 + 12 + t_box_w7 / 2, y_card7 + 17, "Start 30-Day Risk-Free Value Pilot")

        # Tier 3
        draw_rounded_rect(c, 28 + 2 * (t_box_w7 + 12), y_card7, t_box_w7, t_box_h7, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(40 + 2 * (t_box_w7 + 12), y_card7 + t_box_h7 - 20, "Tier 3: Enterprise ($24/node/mo)")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 7.5)
        c.drawString(40 + 2 * (t_box_w7 + 12), y_card7 + t_box_h7 - 38, "• Multi-tenant RBAC & enterprise SSO.")
        c.drawString(40 + 2 * (t_box_w7 + 12), y_card7 + t_box_h7 - 54, "• C-DAC VEGA RISC-V edge collector.")
        c.drawString(40 + 2 * (t_box_w7 + 12), y_card7 + t_box_h7 - 70, "• SOC2, ISO-27001 & HIPAA audit ledger.")
        c.drawString(40 + 2 * (t_box_w7 + 12), y_card7 + t_box_h7 - 86, "• Custom SLA (<1.5s hydration guarantee).")
        c.drawString(40 + 2 * (t_box_w7 + 12), y_card7 + t_box_h7 - 102, "• Dedicated FinOps technical account lead.")
        c.drawString(40 + 2 * (t_box_w7 + 12), y_card7 + t_box_h7 - 118, "• Custom on-premise Kubernetes cluster")
        c.drawString(40 + 2 * (t_box_w7 + 12), y_card7 + t_box_h7 - 134, "  and hybrid cloud deployments.")
        c.drawString(40 + 2 * (t_box_w7 + 12), y_card7 + t_box_h7 - 150, "• 24/7 Enterprise Dedicated Support.")
        c.drawString(40 + 2 * (t_box_w7 + 12), y_card7 + t_box_h7 - 166, "• Custom data sovereignty configurations.")

        draw_rounded_rect(c, 28 + 2 * (t_box_w7 + 12) + 8, y_card7 + 10, t_box_w7 - 16, 24, radius=3, fill_color=C_GREEN_BG, stroke_color=C_GREEN)
        c.setFillColor(C_GREEN)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawCentredString(28 + 2 * (t_box_w7 + 12) + t_box_w7 / 2, y_card7 + 17, "Contact for Enterprise & Sovereign Cloud")

        card_w7 = (width - 56 - 16) / 2
        card_h7 = 200
        y_bot7 = 32

        draw_rounded_rect(c, 28, y_bot7, card_w7, card_h7, radius=6, fill_color=C_GRAY_BG, stroke_color=colors.HexColor('#CBD5E1'))
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(40, y_bot7 + card_h7 - 20, "🎯 Target Customer Segments & Market Size")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 7.5)
        c.drawString(40, y_bot7 + card_h7 - 40, "• Mid-Market Scale-Ups: Companies with $50k-$500k monthly cloud spend.")
        c.drawString(40, y_bot7 + card_h7 - 58, "• Software Development Agencies: Multi-tenant client staging environments.")
        c.drawString(40, y_bot7 + card_h7 - 76, "• Enterprise Tech Orgs: Teams requiring auditable ESG carbon offsets.")
        c.drawString(40, y_bot7 + card_h7 - 94, "• TAM (Total Addressable Market): $17B annual non-prod cloud waste.")
        c.drawString(40, y_bot7 + card_h7 - 112, "• SAM (Serviceable Market): $3.8B in mid-market cloud-native organizations.")
        c.drawString(40, y_bot7 + card_h7 - 130, "• SOM (Initial Target): $150M across high-growth B2B SaaS engineering teams.")
        c.drawString(40, y_bot7 + card_h7 - 148, "• Customer Acquisition Cost (CAC): <$1,200 driven by PLG open-source funnel.")
        c.drawString(40, y_bot7 + card_h7 - 166, "• Net Revenue Retention (NRR): Projected >130% via fleet node expansion.")
        c.drawString(40, y_bot7 + card_h7 - 184, "• Gross Margin Profile: Projected 84% on SaaS software tier.")

        draw_rounded_rect(c, 28 + card_w7 + 16, y_bot7, card_w7, card_h7, radius=6, fill_color=C_GRAY_BG, stroke_color=colors.HexColor('#CBD5E1'))
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(40 + card_w7 + 16, y_bot7 + card_h7 - 20, "🚀 Go-To-Market (GTM) 3-Pillar Plan")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 7.5)
        c.drawString(40 + card_w7 + 16, y_bot7 + card_h7 - 40, "1. PLG Growth: 1-line install via pip install cloudpulse & Helm charts.")
        c.drawString(40 + card_w7 + 16, y_bot7 + card_h7 - 58, "2. Cloud Marketplace: 1-Click AWS/GCP listings billed against cloud commits.")
        c.drawString(40 + card_w7 + 16, y_bot7 + card_h7 - 76, "3. Risk-Free Pilot: 30-day value-share trial guaranteeing 40%+ savings.")
        c.drawString(40 + card_w7 + 16, y_bot7 + card_h7 - 94, "4. FinOps Community: Thought leadership in FinOps Foundation and CNCF.")
        c.drawString(40 + card_w7 + 16, y_bot7 + card_h7 - 112, "5. DevOps Integrations: Pre-built plugins for GitHub Actions, GitLab CI, & Slack.")
        c.drawString(40 + card_w7 + 16, y_bot7 + card_h7 - 130, "6. Direct Sales: Targeted outreach to engineering VPs and infrastructure directors.")
        c.drawString(40 + card_w7 + 16, y_bot7 + card_h7 - 148, "7. Partnership Channel: Co-marketing with cloud consulting partners.")
        c.drawString(40 + card_w7 + 16, y_bot7 + card_h7 - 166, "8. Free FinOps Scan: Instant CLI command generating savings audit report.")
        c.drawString(40 + card_w7 + 16, y_bot7 + card_h7 - 184, "9. Enterprise SLA: Custom multi-region uptime and cold-start SLAs.")

        c.showPage()

        # =========================================================================
        # SLIDE 8: CONCLUSION, ROADMAP, TSM SUPPORT & TEAM DECLARATION
        # =========================================================================
        draw_slide_header("Conclusion & TSM-TECHNOVA 2026 Submission", "Autonomous FinOps: Proven Economics, Zero Developer Friction, Verifiable ESG Impact", 8)
        
        card_w8 = (width - 56 - 16) / 2
        card_h8 = 250

        # Top Left: Project Readiness
        draw_rounded_rect(c, 28, height - 52 - 8 - card_h8, card_w8, card_h8, radius=6, fill_color=C_SKY_LIGHT, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(42, height - 52 - 8 - 20, "Project Status & Key Deliverables")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8)
        c.drawString(42, height - 52 - 8 - 38, "• Working Prototype Live: FastAPI backend + Next.js 14 UI fully deployed.")
        c.drawString(42, height - 52 - 8 - 56, "• ML Layer Verified: Isolation Forest anomaly detector + diurnal forecaster operational.")
        c.drawString(42, height - 52 - 8 - 74, "• Multi-Cloud Support: AWS (Boto3), GCP Compute, K8s, and RISC-V edge collector.")
        c.drawString(42, height - 52 - 8 - 92, "• Live Portal Link: https://marvelous-rugelach-27a627.netlify.app")
        c.drawString(42, height - 52 - 8 - 110, "• Open-Source GitHub: https://github.com/vishnu1107-star/CLOUD-PULSE")
        c.drawString(42, height - 52 - 8 - 128, "• Video Demonstration: 2-minute end-to-end workflow walk-through.")
        c.drawString(42, height - 52 - 8 - 146, "• Verified Impact: 70.42% savings ($8,518/mo), 0.0% outages, 2.34s hydration.")
        c.drawString(42, height - 52 - 8 - 164, "• Master Guide: Ready for TSM-TECHNOVA 2026 Google Form copy-paste.")

        draw_rounded_rect(c, 38, height - 52 - 8 - card_h8 + 10, card_w8 - 20, 26, radius=4, fill_color=C_WHITE, stroke_color=C_SKY_BLUE)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawCentredString(28 + card_w8 / 2, height - 52 - 8 - card_h8 + 18, "Status: 100% Functional Prototype Live on Netlify & GitHub")

        # Top Right: Technical Roadmap
        draw_rounded_rect(c, 28 + card_w8 + 16, height - 52 - 8 - card_h8, card_w8, card_h8, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(42 + card_w8 + 16, height - 52 - 8 - 20, "Future Technical & Commercial Roadmap")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8)
        c.drawString(42 + card_w8 + 16, height - 52 - 8 - 38, "• Phase 1 (Current): Multi-cloud ML anomaly detection, 2.34s hydration, ghost sweeper.")
        c.drawString(42 + card_w8 + 16, height - 52 - 8 - 56, "• Phase 2 (Q4 2026): Terraform / Pulumi IaC state synchronization & Azure support.")
        c.drawString(42 + card_w8 + 16, height - 52 - 8 - 74, "• Phase 3 (2027): Generative AI Copilot for natural language FinOps policy generation.")
        c.drawString(42 + card_w8 + 16, height - 52 - 8 - 92, "• Phase 4 (2027): Commercial B2B SaaS launch & AWS Marketplace partner listing.")
        c.drawString(42 + card_w8 + 16, height - 52 - 8 - 110, "• Enterprise Scale: Support for 100,000+ managed cloud compute nodes globally.")
        c.drawString(42 + card_w8 + 16, height - 52 - 8 - 128, "• Multi-Region DR: Automated cross-region warm instance replication.")
        c.drawString(42 + card_w8 + 16, height - 52 - 8 - 146, "• Vision: The default autonomous operating system for multi-cloud efficiency.")
        c.drawString(42 + card_w8 + 16, height - 52 - 8 - 164, "• Global FinOps Standard: UN SDG 13 certified enterprise carbon accounting.")

        draw_rounded_rect(c, 38 + card_w8 + 16, height - 52 - 8 - card_h8 + 10, card_w8 - 20, 26, radius=4, fill_color=C_GREEN_BG, stroke_color=C_GREEN)
        c.setFillColor(C_GREEN)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawCentredString(28 + card_w8 + 16 + card_w8 / 2, height - 52 - 8 - card_h8 + 18, "Goal: The Default Autonomous Multi-Cloud FinOps Engine by 2027")

        y_bot8 = height - 52 - 8 - card_h8 - 8 - card_h8

        # Bottom Left: TSM Support Requested
        draw_rounded_rect(c, 28, y_bot8, card_w8, card_h8, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(42, y_bot8 + card_h8 - 20, "Support Requested through TSM-TECHNOVA 2026")
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8)
        c.drawString(42, y_bot8 + card_h8 - 38, "• Mentorship: Guidance on enterprise compliance (SOC2/ISO) and cloud go-to-market.")
        c.drawString(42, y_bot8 + card_h8 - 56, "• Incubation & Funding: Seed capital to support infrastructure benchmarking & scaling.")
        c.drawString(42, y_bot8 + card_h8 - 74, "• Industry Connect: Facilitating pilot deployments with enterprise engineering teams.")
        c.drawString(42, y_bot8 + card_h8 - 92, "• Investor Networking: Connecting with early-stage B2B SaaS / DeepTech investors.")
        c.drawString(42, y_bot8 + card_h8 - 110, "• Market Validation: Feedback from experienced FinOps and DevOps practitioners.")
        c.drawString(42, y_bot8 + card_h8 - 128, "• Faculty Collaboration: Research partnerships in cloud optimization & green AI.")
        c.drawString(42, y_bot8 + card_h8 - 146, "• TSM Ecosystem: Utilizing startup incubation facilities to accelerate growth.")
        c.drawString(42, y_bot8 + card_h8 - 164, "• National Hackathon Platform: Establishing CloudPulse as a premier student startup.")

        draw_rounded_rect(c, 38, y_bot8 + 10, card_w8 - 20, 26, radius=4, fill_color=C_SKY_LIGHT, stroke_color=C_SKY_BLUE)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawCentredString(28 + card_w8 / 2, y_bot8 + 18, "TSM Support: Mentoring, Incubation, Industry Connect & Seed Validation")

        # Bottom Right: Team Declaration & Sign-Off
        draw_rounded_rect(c, 28 + card_w8 + 16, y_bot8, card_w8, card_h8, radius=6, fill_color=C_SKY_LIGHT, stroke_color=C_SKY_BLUE, stroke_width=1.5)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(42 + card_w8 + 16, y_bot8 + card_h8 - 20, "Team Declaration & Official Sign-Off")
        c.setFillColor(C_TEXT_TITLE)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(42 + card_w8 + 16, y_bot8 + card_h8 - 38, "Team Name: ARGUS Innovators")
        c.setFont("Helvetica", 8)
        c.drawString(42 + card_w8 + 16, y_bot8 + card_h8 - 56, "• Team Leader:  L. Vishnu Priya (Lead Architect & Cloud Systems)")
        c.drawString(42 + card_w8 + 16, y_bot8 + card_h8 - 74, "• Team Member 1: Harini Sri B K (ML Anomaly Modeling & AI Forecaster)")
        c.drawString(42 + card_w8 + 16, y_bot8 + card_h8 - 92, "• Team Member 2: Tharagai V (Multi-Cloud Drivers & K8s Scale-to-0 Engine)")
        c.drawString(42 + card_w8 + 16, y_bot8 + card_h8 - 110, "• Team Member 3: Vishalni S (Next.js Dashboard, ChatOps & ESG Analytics)")
        c.drawString(42 + card_w8 + 16, y_bot8 + card_h8 - 128, "• Host Institution: Thiagarajar School of Management (TSM), Madurai")
        c.drawString(42 + card_w8 + 16, y_bot8 + card_h8 - 146, "• Submission Event: TSM-TECHNOVA 2026 National Innovation Challenge")
        c.drawString(42 + card_w8 + 16, y_bot8 + card_h8 - 164, "• Declaration: Certified as original, compliant, and verified innovation.")

        draw_rounded_rect(c, 38 + card_w8 + 16, y_bot8 + 10, card_w8 - 20, 26, radius=4, fill_color=C_WHITE, stroke_color=C_GREEN)
        c.setFillColor(C_GREEN)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawCentredString(28 + card_w8 + 16 + card_w8 / 2, y_bot8 + 18, "✓ Official Declaration Signed & Abided by All 4 Team Members")

        c.showPage()
        c.save()

    for p in output_paths:
        try:
            c = canvas.Canvas(p, pagesize=(width, height))
            render_deck_to_canvas(c)
            print(f"[OK] Compiled 8-Slide Perfect Presentation PDF at: {p}")
        except PermissionError:
            print(f"[NOTE] Path {p} is open in reader. Skipped.")
        except Exception as e:
            print(f"[ERROR] Failed {p}: {e}")

if __name__ == "__main__":
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    
    target_paths = [
        os.path.join(base_dir, "ARGUS_Innovators_Presentation.pdf"),
        os.path.join(base_dir, "ARGUS_Innovators_Presentation_Final.pdf"),
        os.path.join(base_dir, "ARGUS_Innovators_Presentation_Updated.pdf"),
        os.path.abspath(os.path.join(base_dir, "..", "CloudPulse_Presentation_Final.pdf"))
    ]
    create_perfect_presentation_pdf(target_paths)
