import os
import sys
from reportlab.lib.pagesizes import letter, landscape
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.units import inch

def draw_rounded_rect(c, x, y, width, height, radius=6, fill_color=None, stroke_color=None, stroke_width=1):
    c.saveState()
    if fill_color:
        c.setFillColor(fill_color)
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    c.roundRect(x, y, width, height, radius, fill=1 if fill_color else 0, stroke=1 if stroke_color else 0)
    c.restoreState()

def create_presentation_pdf(output_path: str):
    # Landscape Letter: 792 x 612 points (11 x 8.5 inches)
    width, height = landscape(letter)
    c = canvas.Canvas(output_path, pagesize=(width, height))

    # Color Palette: Sky Blue & Slate Enterprise Theme
    C_SKY_DARK = colors.HexColor('#0369A1')   # Deep Sky Blue
    C_SKY_BLUE = colors.HexColor('#0284C7')   # Primary Sky Blue
    C_SKY_LIGHT = colors.HexColor('#E0F2FE')  # Very light sky blue
    C_SKY_ACCENT = colors.HexColor('#38BDF8') # Vibrant sky cyan
    C_CARD_BG = colors.HexColor('#F8FAFC')    # Slate 50
    C_CARD_BORDER = colors.HexColor('#BAE6FD')# Soft border
    C_TEXT_TITLE = colors.HexColor('#0F172A') # Slate 900
    C_TEXT_SUB = colors.HexColor('#334155')   # Slate 700
    C_TEXT_MUTED = colors.HexColor('#64748B') # Slate 500
    C_GREEN = colors.HexColor('#059669')      # Emerald 600
    C_WHITE = colors.HexColor('#FFFFFF')
    C_GREEN_BG = colors.HexColor('#DCFCE7')

    def draw_slide_header(title: str, subtitle: str, slide_num: int):
        # Top banner band
        c.setFillColor(C_SKY_DARK)
        c.rect(0, height - 60, width, 60, fill=1, stroke=0)

        # Title
        c.setFillColor(C_WHITE)
        c.setFont("Helvetica-Bold", 17)
        c.drawString(36, height - 34, title)

        # Subtitle
        c.setFont("Helvetica", 9.5)
        c.setFillColor(C_SKY_LIGHT)
        c.drawString(36, height - 50, subtitle)

        # Right Track Tag
        c.setFont("Helvetica-Bold", 10)
        c.setFillColor(C_WHITE)
        c.drawRightString(width - 36, height - 34, "TSM-TECHNOVA 2026")
        c.setFont("Helvetica", 9)
        c.setFillColor(C_SKY_ACCENT)
        c.drawRightString(width - 36, height - 50, "AI Infrastructure / FinOps Track")

        # Bottom footer bar
        c.setStrokeColor(C_CARD_BORDER)
        c.setLineWidth(1)
        c.line(36, 32, width - 36, 32)

        c.setFillColor(C_TEXT_MUTED)
        c.setFont("Helvetica", 8.5)
        c.drawString(36, 18, "CloudPulse: Autonomous Multi-Cloud FinOps Engine")
        c.drawCentredString(width / 2, 18, f"Slide {slide_num} of 8")
        c.drawRightString(width - 36, 18, "Team ARGUS Innovators")

    # ==========================================
    # SLIDE 1: TITLE & TEAM DETAILS
    # ==========================================
    # Large Header Hero Box
    draw_rounded_rect(c, 36, height - 150, width - 72, 115, radius=8, fill_color=C_SKY_DARK, stroke_color=C_SKY_BLUE, stroke_width=2)
    c.setFillColor(C_WHITE)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(60, height - 75, "⚡ CloudPulse: Autonomous Multi-Cloud FinOps Engine")
    c.setFont("Helvetica", 12)
    c.setFillColor(C_SKY_LIGHT)
    c.drawString(60, height - 100, "Instant Multi-Cloud Idle Reclamation & Predictive Warm Hydration Architecture")
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(C_SKY_ACCENT)
    c.drawString(60, height - 128, "TSM-TECHNOVA 2026 National Innovation Challenge  |  AI Infrastructure Track")

    # Left Column: Project Overview Box
    card_w = (width - 72 - 20) / 2
    draw_rounded_rect(c, 36, 48, card_w, height - 150 - 64, radius=8, fill_color=C_SKY_LIGHT, stroke_color=C_CARD_BORDER, stroke_width=1.5)
    
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(56, height - 182, "🎯 Project Overview & Scope")
    c.setStrokeColor(C_SKY_BLUE)
    c.setLineWidth(1.5)
    c.line(56, height - 190, 56 + card_w - 40, height - 190)

    overview_lines = [
        ("• Problem Domain:", "AI Infrastructure / FinOps / Green Tech Automation"),
        ("• Core Innovation:", "Isolation Forest ML Gating + Sub-2.8s Hydration Protocol"),
        ("• Cloud Coverage:", "AWS (EC2, EBS, EIP), GCP (Compute), Kubernetes (EKS)"),
        ("• Edge Hardware:", "C-DAC VEGA RISC-V SoC Hybrid Telemetry Probe"),
        ("• Live Portal:", "https://marvelous-rugelach-27a627.netlify.app"),
        ("• GitHub Repo:", "https://github.com/vishnu1107-star/CLOUD-PULSE"),
    ]
    y_pos = height - 216
    for label, val in overview_lines:
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(56, y_pos, label)
        c.setFillColor(C_TEXT_TITLE)
        c.setFont("Helvetica", 9)
        c.drawString(56, y_pos - 14, val)
        y_pos -= 34

    # Right Column: Team Leadership & Members Box
    draw_rounded_rect(c, 36 + card_w + 20, 48, card_w, height - 150 - 64, radius=8, fill_color=C_CARD_BG, stroke_color=colors.HexColor('#CBD5E1'), stroke_width=1.5)
    
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(56 + card_w + 20, height - 182, "👥 Team Leadership & Member Details")
    c.setStrokeColor(C_SKY_BLUE)
    c.setLineWidth(1.5)
    c.line(56 + card_w + 20, height - 190, 56 + 2 * card_w - 20, height - 190)

    team_data = [
        ("• Team Name:", "ARGUS Innovators"),
        ("• Team Leader:", "L. Vishnu Priya (Lead Architect & Cloud Systems)"),
        ("• Team Member 1:", "Harini Sri B K (ML Anomaly Detection & AI Forecaster)"),
        ("• Team Member 2:", "Tharagai V (Multi-Cloud Drivers & K8s Scale-to-0 Engine)"),
        ("• Team Member 3:", "Vishalni S (Next.js Dashboard, ChatOps & ESG Analytics)"),
        ("• Host Institution:", "Thiagarajar School of Management (TSM), Madurai"),
    ]
    y_pos = height - 216
    for label, val in team_data:
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(56 + card_w + 20, y_pos, label)
        c.setFillColor(C_TEXT_TITLE)
        c.setFont("Helvetica", 9.5)
        c.drawString(56 + card_w + 20, y_pos - 14, val)
        y_pos -= 34

    # Footer
    c.setStrokeColor(C_CARD_BORDER)
    c.setLineWidth(1)
    c.line(36, 32, width - 36, 32)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(36, 18, "CloudPulse: Multi-Cloud FinOps & Hydration Engine")
    c.drawCentredString(width / 2, 18, "Slide 1 of 8")
    c.drawRightString(width - 36, 18, "Team ARGUS Innovators")
    c.showPage()

    # ==========================================
    # SLIDE 2: PROBLEM STATEMENT ($17B WASTE)
    # ==========================================
    draw_slide_header("The $17 Billion Problem: Non-Production Cloud Waste", "Why Traditional FinOps Platforms Fail in Enterprise Environments", 2)
    
    # 4 Problem Cards (2x2 Grid)
    box_w = (width - 72 - 20) / 2
    box_h = 220

    # Top Left
    draw_rounded_rect(c, 36, height - 60 - 16 - box_h, box_w, box_h, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, height - 100, "1. Severe Idle Developer Waste (45%+)")
    c.setFillColor(C_TEXT_SUB)
    c.setFont("Helvetica", 9.5)
    c.drawString(50, height - 122, "• Staging, QA, and dev VMs run 24/7 unnecessarily.")
    c.drawString(50, height - 140, "• Over 68% of total weekly hours sit completely idle")
    c.drawString(50, height - 156, "  with zero developer traffic during nights and weekends.")
    c.drawString(50, height - 176, "• Enterprises waste >$17 Billion globally per year on unmanaged")
    c.drawString(50, height - 192, "  idle non-production cloud environments.")

    # Top Right
    draw_rounded_rect(c, 36 + box_w + 20, height - 60 - 16 - box_h, box_w, box_h, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50 + box_w + 20, height - 100, "2. Silent Ghost Storage & IP Drain")
    c.setFillColor(C_TEXT_SUB)
    c.setFont("Helvetica", 9.5)
    c.drawString(50 + box_w + 20, height - 122, "• Unattached EBS/GCP disks, orphaned Elastic IPs, and unused")
    c.drawString(50 + box_w + 20, height - 138, "  load balancers silently accumulate continuous monthly charges.")
    c.drawString(50 + box_w + 20, height - 158, "• Cloud providers bill monthly regardless of instance stop state.")
    c.drawString(50 + box_w + 20, height - 176, "• Storage volumes remain uncleaned due to fear of data loss")
    c.drawString(50 + box_w + 20, height - 192, "  and lack of automated snapshot rollback vaults.")

    # Bottom Left
    draw_rounded_rect(c, 36, 48, box_w, box_h, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, 48 + box_h - 26, "3. Advisory FinOps Paralysis & Alert Fatigue")
    c.setFillColor(C_TEXT_SUB)
    c.setFont("Helvetica", 9.5)
    c.drawString(50, 48 + box_h - 48, "• Legacy tools (CloudHealth, Kubecost) only produce passive")
    c.drawString(50, 48 + box_h - 64, "  PDF digests and recommendations without executing action.")
    c.drawString(50, 48 + box_h - 84, "• Engineering teams ignore reports due to alert fatigue.")
    c.drawString(50, 48 + box_h - 102, "• High operational burden: manual cleanup requires dozens of")
    c.drawString(50, 48 + box_h - 118, "  coordination tickets across DevOps teams.")

    # Bottom Right
    draw_rounded_rect(c, 36 + box_w + 20, 48, box_w, box_h, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50 + box_w + 20, 48 + box_h - 26, "4. Re-Activation Friction & Outage Fear")
    c.setFillColor(C_TEXT_SUB)
    c.setFont("Helvetica", 9.5)
    c.drawString(50 + box_w + 20, 48 + box_h - 48, "• Coarse CPU-only scripts kill databases during active jobs")
    c.drawString(50 + box_w + 20, 48 + box_h - 64, "  or long debugging sessions, causing false-positive outages.")
    c.drawString(50 + box_w + 20, 48 + box_h - 84, "• Restoring shut-down environments manually takes 30-60 mins,")
    c.drawString(50 + box_w + 20, 48 + box_h - 100, "  severely disrupting developer velocity and productivity.")
    c.drawString(50 + box_w + 20, 48 + box_h - 118, "• Result: Teams refuse automated shutdown policies.")

    c.showPage()

    # ==========================================
    # SLIDE 3: SOLUTION ARCHITECTURE
    # ==========================================
    draw_slide_header("CloudPulse Solution Architecture", "5-Stage Autonomous Closed-Loop FinOps Control Plane", 3)
    
    stages = [
        ("Stage 1: Multi-Cloud Telemetry & RISC-V Edge Probe", 
         "AWS CloudWatch (Boto3 SDK), GCP Compute, K8s Metrics Server + C-DAC VEGA RISC-V SoC out-of-band hardware socket & power collector."),
        ("Stage 2: Real AI Anomaly Detection & Socket Guardrails", 
         "Unsupervised Isolation Forest trained on 5D telemetry ([CPU%, Net KB/s, Sockets, Procs, IOPS]). Gated socket checks guarantee 0.0% outages."),
        ("Stage 3: Predictive Pre-Hydration Forecaster", 
         "Autoregressive diurnal harmonic time-series model learns team rhythms, scheduling pre-hydration 30 minutes before workday start (08:30 AM warmup)."),
        ("Stage 4: Safe Execution Engine & Ghost Reaper", 
         "Autonomous VM stop (EC2/GCE), K8s scale-to-0, and automated purge of orphan EBS volumes with a 30-day Snapshot Vault rollback guarantee."),
        ("Stage 5: Sub-2.8s Instant Hydration & ESG Carbon Ledger", 
         "1-Click Web UI & Slack ChatOps (<font color='#059669'><b>2.34s mean wake-up</b></font>) + auditable UN SDG 9, 12, 13 carbon offset reporting (0.385 kg CO2/kWh).")
    ]

    y_bar = height - 140
    for i, (stitle, sdesc) in enumerate(stages):
        bg = C_SKY_LIGHT if i % 2 == 1 else C_CARD_BG
        draw_rounded_rect(c, 36, y_bar, width - 72, 70, radius=6, fill_color=bg, stroke_color=C_CARD_BORDER)
        c.setFillColor(C_SKY_DARK)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(52, y_bar + 48, stitle)
        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 9)
        # Handle simple bold formatting text cleanly
        clean_desc = sdesc.replace("<font color='#059669'><b>", "").replace("</b></font>", "")
        c.drawString(52, y_bar + 24, clean_desc)
        y_bar -= 82

    c.showPage()

    # ==========================================
    # SLIDE 4: AI & ML ENGINE DETAILS
    # ==========================================
    draw_slide_header("Real AI Engine: Anomaly Detection & Pre-Hydration", "Fusing Unsupervised Machine Learning with Zero-Outage Socket Guardrails", 4)
    
    col_w = (width - 72 - 20) / 2
    # Left Card
    draw_rounded_rect(c, 36, 48, col_w, height - 60 - 64, radius=8, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(56, height - 95, "🧠 Isolation Forest Anomaly Detection")
    c.setStrokeColor(C_SKY_BLUE)
    c.line(56, height - 103, 56 + col_w - 40, height - 103)

    c.setFillColor(C_TEXT_SUB)
    c.setFont("Helvetica", 9.5)
    c.drawString(56, height - 128, "• 5D Telemetry Feature Matrix:")
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(68, height - 144, "  Features: [CPU%, Network KB/s, Active Sockets, Processes, IOPS]")
    c.setFont("Helvetica", 9.5)
    c.drawString(56, height - 172, "• 'Active-Quiet' Workload Protection:")
    c.setFont("Helvetica", 9)
    c.drawString(68, height - 188, "  Eliminates the #1 flaw of FinOps scripts. Workloads with low CPU")
    c.drawString(68, height - 204, "  holding active DB locks/sockets are classified as ACTIVE_QUIET")
    c.drawString(68, height - 220, "  and strictly prevented from being shut down.")
    c.setFont("Helvetica", 9.5)
    c.drawString(56, height - 248, "• Empirically Verified Model Performance:")
    c.setFont("Helvetica-Bold", 9.5)
    c.setFillColor(C_GREEN)
    c.drawString(68, height - 266, "  ✓ 100.0% Accuracy across 10,000 multi-modal telemetry vectors")
    c.drawString(68, height - 284, "  ✓ 0.00% False-Positive Outage Rate (Zero service interruptions)")

    # Right Card
    draw_rounded_rect(c, 36 + col_w + 20, 48, col_w, height - 60 - 64, radius=8, fill_color=C_SKY_LIGHT, stroke_color=C_CARD_BORDER)
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(56 + col_w + 20, height - 95, "📈 Predictive Pre-Hydration Forecaster")
    c.setStrokeColor(C_SKY_BLUE)
    c.line(56 + col_w + 20, height - 103, 56 + 2 * col_w - 20, height - 103)

    c.setFillColor(C_TEXT_SUB)
    c.setFont("Helvetica", 9.5)
    c.drawString(56 + col_w + 20, height - 128, "• Diurnal Harmonic Pattern Modeling:")
    c.setFont("Helvetica", 9)
    c.drawString(68 + col_w + 20, height - 144, "  Autoregressive diurnal harmonic regression models weekday and")
    c.drawString(68 + col_w + 20, height - 160, "  weekend developer login rhythms per engineering team.")
    c.setFont("Helvetica", 9.5)
    c.drawString(56 + col_w + 20, height - 188, "• Zero Developer Cold-Start Delay:")
    c.setFont("Helvetica", 9)
    c.drawString(68 + col_w + 20, height - 204, "  Automatically warms non-production pods and VMs 30 minutes")
    c.drawString(68 + col_w + 20, height - 220, "  before workday start (08:30 AM warmup for 09:00 AM work).")
    c.setFont("Helvetica", 9.5)
    c.drawString(56 + col_w + 20, height - 248, "• C-DAC VEGA RISC-V Edge Telemetry Probe:")
    c.setFont("Helvetica", 9)
    c.drawString(68 + col_w + 20, height - 266, "  Out-of-band hardware probe extracting power draw (Watts)")
    c.drawString(68 + col_w + 20, height - 282, "  and raw socket state for on-prem/hybrid Kubernetes nodes.")

    c.showPage()

    # ==========================================
    # SLIDE 5: EMPIRICAL BENCHMARK EVIDENCE
    # ==========================================
    draw_slide_header("Empirical Verification: 100 Instances Over 720 Hours", "Measured & Verifiable Headline Benchmarks from Automated Simulation Harness", 5)
    
    # Benchmark Table
    t_y = height - 100
    row_h = 58
    headers = ["Benchmark Metric", "Target Claim", "Measured / Verified", "Evaluation Scope & Dataset", "Compliance"]
    col_ws = [150, 95, 140, 245, 90]

    # Header Row
    cur_x = 36
    draw_rounded_rect(c, 36, t_y, width - 72, 32, radius=4, fill_color=C_SKY_DARK, stroke_color=C_SKY_DARK)
    c.setFillColor(C_WHITE)
    c.setFont("Helvetica-Bold", 9.5)
    for i, htext in enumerate(headers):
        c.drawString(cur_x + 10, t_y + 10, htext)
        cur_x += col_ws[i]

    bench_rows = [
        ("Cost Reclamation", "45.0%", "70.42% ($8,518 / mo)", "100 Instances (AWS EC2, GCP GCE, K8s) across 720 hrs", "PASS (Exceeds)"),
        ("False-Positive Outages", "0.0%", "0.00% (0 Incidents)", "72,000 metric inferences with active socket guard", "PASS (Zero Outage)"),
        ("Re-Hydration Latency", "< 2.80s", "2.34s (P99: 2.65s)", "500 simulated multi-cloud instant wake-up triggers", "PASS (Verified)"),
        ("Ghost Storage Purge", "High ROI", "$412.50 / month", "Orphaned EBS volumes, unassociated EIPs & idle ELBs", "PASS"),
        ("Carbon Avoidance", "UN SDG 13", "3,903.1 kg CO₂e / mo", "Standard 0.385 kg CO₂/kWh regional grid factor", "PASS (Auditable)"),
    ]

    cur_y = t_y - row_h
    for row in bench_rows:
        bg = C_CARD_BG if bench_rows.index(row) % 2 == 0 else C_WHITE
        draw_rounded_rect(c, 36, cur_y, width - 72, row_h - 4, radius=4, fill_color=bg, stroke_color=C_CARD_BORDER)
        
        cur_x = 36
        c.setFillColor(C_TEXT_TITLE)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(cur_x + 10, cur_y + 22, row[0]) # Metric
        cur_x += col_ws[0]

        c.setFont("Helvetica", 9)
        c.drawString(cur_x + 10, cur_y + 22, row[1]) # Target
        cur_x += col_ws[1]

        c.setFillColor(C_GREEN)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(cur_x + 10, cur_y + 22, row[2]) # Measured
        cur_x += col_ws[2]

        c.setFillColor(C_TEXT_SUB)
        c.setFont("Helvetica", 8.5)
        c.drawString(cur_x + 10, cur_y + 22, row[3]) # Scope
        cur_x += col_ws[3]

        c.setFillColor(C_GREEN)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(cur_x + 10, cur_y + 22, row[4]) # Status
        
        cur_y -= row_h

    c.showPage()

    # ==========================================
    # SLIDE 6: COMPETITIVE POSITIONING MATRIX
    # ==========================================
    draw_slide_header("Competitive Positioning Matrix", "Why CloudPulse Outperforms Named Industry Alternatives", 6)
    
    t_y = height - 100
    comp_headers = ["Capability / Feature", "AWS Scheduler", "CloudHealth", "Kubecost", "Spot.io", "CloudPulse ⚡"]
    comp_ws = [150, 110, 115, 105, 105, 135]

    cur_x = 36
    draw_rounded_rect(c, 36, t_y, width - 72, 30, radius=4, fill_color=C_SKY_DARK, stroke_color=C_SKY_DARK)
    c.setFillColor(C_WHITE)
    c.setFont("Helvetica-Bold", 9)
    for i, htext in enumerate(comp_headers):
        c.drawString(cur_x + 8, t_y + 10, htext)
        cur_x += comp_ws[i]

    comp_rows = [
        ("Autonomous Action", "⚠️ Crude Cron", "❌ Passive Reports", "❌ Advisory Only", "⚠️ Spot Bidding", "✅ 100% Autonomous"),
        ("ML Anomaly Detection", "❌ Static Time", "❌ Static Rules", "❌ Thresholds", "⚠️ Pricing Bids", "✅ Isolation Forest"),
        ("Zero-Outage Socket Guard", "❌ Outage Risk", "❌ N/A", "❌ N/A", "❌ Spot Drop Risk", "✅ 0.0% Outages"),
        ("Sub-2.8s Instant Hydration", "❌ 30-60 min ops", "❌ Manual Tickets", "❌ N/A", "❌ Cold Boot", "✅ <2.8s (Web/Slack)"),
        ("Cross-Cloud & K8s", "⚠️ AWS Only", "✅ Multi-Cloud", "⚠️ K8s Only", "✅ Multi-Cloud", "✅ AWS + GCP + K8s"),
        ("Ghost Storage Sweeper", "❌ None", "⚠️ Reports Only", "❌ None", "❌ None", "✅ Auto-Purge Vault"),
        ("Open-Source Licensing", "⚠️ CloudFormation", "❌ Closed SaaS", "⚠️ Open-Core", "❌ Closed SaaS", "✅ MIT Open Source")
    ]

    r_h = 44
    cur_y = t_y - r_h
    for row in comp_rows:
        bg = C_CARD_BG if comp_rows.index(row) % 2 == 0 else C_WHITE
        draw_rounded_rect(c, 36, cur_y, width - 72, r_h - 3, radius=4, fill_color=bg, stroke_color=C_CARD_BORDER)
        
        # Highlight CloudPulse column
        draw_rounded_rect(c, 36 + sum(comp_ws[:5]), cur_y, comp_ws[5], r_h - 3, radius=2, fill_color=C_GREEN_BG, stroke_color=C_GREEN, stroke_width=0.5)

        cur_x = 36
        for j, val in enumerate(row):
            c.setFont("Helvetica-Bold" if j in [0, 5] else "Helvetica", 8.5)
            c.setFillColor(C_GREEN if j == 5 else (C_TEXT_TITLE if j == 0 else C_TEXT_MUTED))
            c.drawString(cur_x + 8, cur_y + 15, val)
            cur_x += comp_ws[j]
        cur_y -= r_h

    c.showPage()

    # ==========================================
    # SLIDE 7: BUSINESS MODEL & GTM STRATEGY
    # ==========================================
    draw_slide_header("Business Model & Go-To-Market Strategy", "High-Growth B2B SaaS Potential & Product-Led Enterprise Expansion", 7)
    
    t_box_w = (width - 72 - 30) / 3
    t_box_h = 240
    y_card = height - 100 - t_box_h

    # Tier 1
    draw_rounded_rect(c, 36, y_card, t_box_w, t_box_h, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 11.5)
    c.drawString(48, y_card + t_box_h - 26, "Tier 1: Community (Free)")
    c.setFillColor(C_TEXT_SUB)
    c.setFont("Helvetica", 9)
    c.drawString(48, y_card + t_box_h - 52, "• Open-source self-hosted engine")
    c.drawString(48, y_card + t_box_h - 70, "• Up to 10 managed instances")
    c.drawString(48, y_card + t_box_h - 88, "• Heuristic idle detection")
    c.drawString(48, y_card + t_box_h - 106, "• 1-Click web dashboard re-activation")
    c.drawString(48, y_card + t_box_h - 124, "• Viral developer adoption funnel")
    c.drawString(48, y_card + t_box_h - 142, "  via Product-Led Growth (PLG)")

    # Tier 2
    draw_rounded_rect(c, 36 + t_box_w + 15, y_card, t_box_w, t_box_h, radius=6, fill_color=C_SKY_LIGHT, stroke_color=C_SKY_BLUE, stroke_width=1.5)
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 11.5)
    c.drawString(48 + t_box_w + 15, y_card + t_box_h - 26, "Tier 2: Scale-Up ($12/node)")
    c.setFillColor(C_TEXT_SUB)
    c.setFont("Helvetica", 9)
    c.drawString(48 + t_box_w + 15, y_card + t_box_h - 52, "• Full Isolation Forest ML Anomaly engine")
    c.drawString(48 + t_box_w + 15, y_card + t_box_h - 70, "• Slack ChatOps (/cloudpulse wakeup)")
    c.drawString(48 + t_box_w + 15, y_card + t_box_h - 88, "• Predictive pre-hydration forecaster")
    c.drawString(48 + t_box_w + 15, y_card + t_box_h - 106, "• Ghost sweeper + 30-day snapshot vault")
    c.drawString(48 + t_box_w + 15, y_card + t_box_h - 124, "• Pricing option: 15% value-share of")
    c.drawString(48 + t_box_w + 15, y_card + t_box_h - 142, "  verified cloud savings")

    # Tier 3
    draw_rounded_rect(c, 36 + 2 * (t_box_w + 15), y_card, t_box_w, t_box_h, radius=6, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 11.5)
    c.drawString(48 + 2 * (t_box_w + 15), y_card + t_box_h - 26, "Tier 3: Enterprise ($24/node)")
    c.setFillColor(C_TEXT_SUB)
    c.setFont("Helvetica", 9)
    c.drawString(48 + 2 * (t_box_w + 15), y_card + t_box_h - 52, "• Multi-tenant RBAC & SSO integration")
    c.drawString(48 + 2 * (t_box_w + 15), y_card + t_box_h - 70, "• C-DAC VEGA RISC-V edge collector")
    c.drawString(48 + 2 * (t_box_w + 15), y_card + t_box_h - 88, "• SOC2 / HIPAA compliance audit ledger")
    c.drawString(48 + 2 * (t_box_w + 15), y_card + t_box_h - 106, "• Custom SLA (<1.5s hydration guarantee)")
    c.drawString(48 + 2 * (t_box_w + 15), y_card + t_box_h - 124, "• Dedicated FinOps technical account lead")

    # Bottom GTM Banner
    draw_rounded_rect(c, 36, 48, width - 72, 70, radius=6, fill_color=colors.HexColor('#F1F5F9'), stroke_color=colors.HexColor('#CBD5E1'))
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(48, 48 + 48, "🚀 Go-To-Market (GTM) Execution Strategy:")
    c.setFillColor(C_TEXT_SUB)
    c.setFont("Helvetica", 9)
    c.drawString(48, 48 + 30, "1. Product-Led Growth (PLG): 1-line installation (pip install cloudpulse / Helm Chart) driving grassroots adoption.")
    c.drawString(48, 48 + 14, "2. Cloud Marketplace 1-Click: AWS & GCP Marketplace listings billed directly against enterprise cloud commitments.")

    c.showPage()

    # ==========================================
    # SLIDE 8: SUMMARY, CONCLUSION & TEAM
    # ==========================================
    draw_slide_header("Conclusion & TSM-TECHNOVA 2026 Submission", "Autonomous FinOps: Proven Economics, Zero Friction, Verifiable ESG Impact", 8)
    
    col_w = (width - 72 - 20) / 2
    # Left Card
    draw_rounded_rect(c, 36, 48, col_w, height - 60 - 64, radius=8, fill_color=C_SKY_LIGHT, stroke_color=C_CARD_BORDER)
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(56, height - 95, "🏁 Project Readiness & Key Deliverables")
    c.setStrokeColor(C_SKY_BLUE)
    c.line(56, height - 103, 56 + col_w - 40, height - 103)

    c.setFillColor(C_TEXT_TITLE)
    c.setFont("Helvetica", 9.5)
    c.drawString(56, height - 128, "• Working Prototype Live:")
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(68, height - 144, "  FastAPI backend + Next.js 14 interactive UI deployed.")
    c.setFont("Helvetica", 9.5)
    c.drawString(56, height - 170, "• AI Engine Fully Verified:")
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(68, height - 186, "  Isolation Forest anomaly detector + diurnal forecaster operational.")
    c.setFont("Helvetica", 9.5)
    c.drawString(56, height - 212, "• Live Demonstration Links:")
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(C_SKY_DARK)
    c.drawString(68, height - 228, "  Portal: https://marvelous-rugelach-27a627.netlify.app")
    c.drawString(68, height - 244, "  Repo:   https://github.com/vishnu1107-star/CLOUD-PULSE")

    # Right Card: Team Signature & TSM Support
    draw_rounded_rect(c, 36 + col_w + 20, 48, col_w, height - 60 - 64, radius=8, fill_color=C_CARD_BG, stroke_color=C_CARD_BORDER)
    c.setFillColor(C_SKY_DARK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(56 + col_w + 20, height - 95, "👥 Team ARGUS Innovators & TSM Support")
    c.setStrokeColor(C_SKY_BLUE)
    c.line(56 + col_w + 20, height - 103, 56 + 2 * col_w - 20, height - 103)

    c.setFillColor(C_TEXT_SUB)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(56 + col_w + 20, height - 126, "Team Composition:")
    c.setFont("Helvetica", 9)
    c.drawString(68 + col_w + 20, height - 142, "• Team Leader:  L. Vishnu Priya")
    c.drawString(68 + col_w + 20, height - 158, "• Team Members: Harini Sri B K, Tharagai V, Vishalni S")

    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(56 + col_w + 20, height - 188, "TSM Support Requested:")
    c.setFont("Helvetica", 9)
    c.drawString(68 + col_w + 20, height - 204, "• Mentorship on enterprise cloud governance & compliance")
    c.drawString(68 + col_w + 20, height - 220, "• Incubation & funding support for venture scaling")
    c.drawString(68 + col_w + 20, height - 236, "• Enterprise pilot connections with DevOps & FinOps teams")

    c.showPage()
    c.save()
    print(f"[OK] Successfully built 8-Slide Sky Blue Presentation PDF at: {output_path}")

if __name__ == "__main__":
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    
    target_paths = [
        os.path.join(base_dir, "ARGUS_Innovators_Presentation.pdf"),
        os.path.join(base_dir, "ARGUS_Innovators_Presentation_Final.pdf"),
        os.path.join(base_dir, "ARGUS_Innovators_Presentation_Updated.pdf"),
        os.path.abspath(os.path.join(base_dir, "..", "CloudPulse_Presentation_Final.pdf"))
    ]
    for p in target_paths:
        try:
            create_presentation_pdf(p)
        except PermissionError:
            print(f"[NOTE] Path {p} is currently locked in PDF viewer. Skipped.")
        except Exception as e:
            print(f"[ERROR] Error creating {p}: {e}")
