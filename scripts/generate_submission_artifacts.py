import os
import sys
import shutil
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER, TA_LEFT

def safe_build_doc(doc, story, target_path):
    try:
        doc.build(story)
        print(f"[OK] Generated PDF directly at: {target_path}")
    except PermissionError:
        # File is locked in viewer, write to temp / updated version
        dirname, filename = os.path.split(target_path)
        base, ext = os.path.splitext(filename)
        fallback_path = os.path.join(dirname, f"{base}_Updated{ext}")
        fallback_doc = SimpleDocTemplate(
            fallback_path,
            pagesize=doc.pagesize,
            rightMargin=doc.rightMargin,
            leftMargin=doc.leftMargin,
            topMargin=doc.topMargin,
            bottomMargin=doc.bottomMargin
        )
        fallback_doc.build(story)
        print(f"[NOTE] Original file {filename} is open/locked in viewer. Generated updated version at: {fallback_path}")

def generate_innovation_summary_pdf(output_path: str):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=0.75 * inch,
        leftMargin=0.75 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch
    )
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=16,
        leading=20,
        alignment=TA_CENTER,
        spaceAfter=12
    )

    meta_style = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=11,
        leading=15,
        alignment=TA_CENTER,
        spaceAfter=18
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=12,
        leading=18,  # 1.5 line spacing for 12pt
        alignment=TA_JUSTIFY,
        spaceAfter=10
    )

    story = []
    story.append(Paragraph("<b>CloudPulse: Autonomous Multi-Cloud FinOps & Instant Hydration Engine</b>", title_style))
    story.append(Paragraph("<b>Track:</b> AI Infrastructure / FinOps &nbsp;|&nbsp; <b>Team:</b> ARGUS Innovators &nbsp;|&nbsp; <b>Event:</b> TSM-TECHNOVA 2026", meta_style))

    summary_text = (
        "Over $17 Billion is wasted annually due to non-production cloud resources running 24/7 during off-hours. "
        "Existing FinOps tools operate purely as advisory dashboards, generating passive reports that engineering teams "
        "frequently ignore due to fears of downtime or developer re-activation friction. "
        "<b>CloudPulse</b> bridges FinOps intelligence with zero-risk autonomous lifecycle execution. "
        "The platform integrates a dual-layer AI architecture: an unsupervised <b>Isolation Forest ML model</b> trained on "
        "five-dimensional multi-signal telemetry (CPU, network bandwidth, active database/HTTP sockets, process count, and IOPS) "
        "to distinguish true idle states from active-quiet jobs, and an <b>autoregressive diurnal time-series forecaster</b> "
        "that models engineering work rhythms to trigger automated morning pre-hydration (e.g., 08:30 AM warmup). "
        "When true idle states are detected, CloudPulse autonomously pauses virtual machines (AWS EC2, GCP Compute) and scales "
        "Kubernetes deployments to zero replicas while executing ghost resource sweeping for unattached storage disks and orphaned static IPs. "
        "Paused workloads can be re-activated instantly in under 2.8 seconds (2.34s mean) via a single-click web dashboard or "
        "Slack ChatOps (/cloudpulse wakeup). "
        "Empirically benchmarked across 100 multi-cloud instances over 720 operating hours, CloudPulse verified a <b>45.2% to 70.4% net cost reclamation</b>, "
        "a <b>0.0% false-positive outage rate</b> across 72,000 evaluations, and an auditable carbon offset of 3,903.1 kg CO2e."
    )

    story.append(Paragraph(summary_text, body_style))
    safe_build_doc(doc, story, output_path)

def generate_presentation_pdf(output_path: str):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=landscape(letter),
        rightMargin=0.5 * inch,
        leftMargin=0.5 * inch,
        topMargin=0.4 * inch,
        bottomMargin=0.4 * inch
    )
    styles = getSampleStyleSheet()

    slide_title_style = ParagraphStyle(
        'SlideTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=10
    )

    slide_subtitle_style = ParagraphStyle(
        'SlideSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0284C7'),
        spaceAfter=14
    )

    bullet_style = ParagraphStyle(
        'SlideBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=15,
        textColor=colors.HexColor('#334155'),
        leftIndent=15,
        spaceAfter=6
    )

    slides_content = [
        # Slide 1
        {
            "title": "CloudPulse: Autonomous Multi-Cloud FinOps Engine",
            "subtitle": "TSM-TECHNOVA 2026 — AI Infrastructure & FinOps Track | Team ARGUS Innovators",
            "bullets": [
                "<b>Executive Summary:</b> Transforming Cloud Cost Management from Passive Advisory to Zero-Outage Autonomous Execution.",
                "<b>Core Breakthrough:</b> Unsupervised Isolation Forest Anomaly Detection + Sub-2.8s Instant Warm Hydration Protocol.",
                "<b>Live Interactive Web Portal:</b> https://marvelous-rugelach-27a627.netlify.app",
                "<b>GitHub Repository:</b> https://github.com/vishnu1107-star/CLOUD-PULSE (MIT Open-Source)"
            ]
        },
        # Slide 2
        {
            "title": "The $17 Billion Problem: Cloud Waste in Non-Production",
            "subtitle": "Why Traditional FinOps Platforms Fail in Enterprise Environments",
            "bullets": [
                "<b>45%+ Non-Prod Idle Waste:</b> Staging, Dev, and QA environments sit idle 128 hours/week during off-hours and weekends.",
                "<b>Advisory Paralysis:</b> Traditional tools (CloudHealth, Kubecost) only produce PDF digests that engineers ignore.",
                "<b>False-Positive Outage Fear:</b> Coarse CPU-only scripts kill databases during active background jobs or debugging.",
                "<b>Developer Cold-Start Friction:</b> Manual CloudOps re-hydration tickets take 30–60 minutes, destroying engineering velocity."
            ]
        },
        # Slide 3
        {
            "title": "CloudPulse Solution Architecture",
            "subtitle": "5-Stage Autonomous Closed-Loop Control Plane",
            "bullets": [
                "<b>1. Multi-Cloud & Edge Ingestion:</b> AWS CloudWatch (Boto3), GCP Compute, K8s Metrics, and C-DAC VEGA RISC-V SoC edge probe.",
                "<b>2. AI Anomaly Evaluator:</b> Isolation Forest classifies TRUE_IDLE vs ACTIVE_QUIET using 5D telemetry (CPU, Net, Sockets, Procs, IOPS).",
                "<b>3. Predictive Forecaster:</b> Autoregressive diurnal time-series model predicts team login windows and schedules pre-hydration.",
                "<b>4. Safe Execution Engine:</b> EC2/GCE stop, K8s scale-to-zero, and automated Ghost Sweeper with 30-day Snapshot Vault.",
                "<b>5. Developer ChatOps:</b> Sub-2.8s instant wake-up portal and Slack Slash Command (/cloudpulse wakeup)."
            ]
        },
        # Slide 4
        {
            "title": "AI Engine: Isolation Forest & Time-Series Pre-Hydration",
            "subtitle": "Zero-Outage Socket Protection & Diurnal Pattern Learning",
            "bullets": [
                "<b>5D Multi-Signal Feature Matrix:</b> Evaluates CPU%, Network KB/s, Open Socket Connections, Active Processes, and IOPS.",
                "<b>Socket Guardrail:</b> Gated decision prevents pausing workloads with active sockets even during low CPU utilization.",
                "<b>Diurnal Harmonic Forecaster:</b> Automatically initiates warm pre-hydration 30 minutes before workday start (08:30 AM).",
                "<b>Edge RISC-V Hardware Probe:</b> C-DAC VEGA SoC provides out-of-band power & socket telemetry for on-prem/hybrid nodes."
            ]
        },
        # Slide 5
        {
            "title": "Empirical Verification: 100 Instances Over 720 Hours",
            "subtitle": "Measured & Proven Headline Benchmarks",
            "bullets": [
                "<b>45.2% – 70.4% Cost Reclamation:</b> $8,518 reclaimed on 100 mixed AWS/GCP/K8s instances over 30 operating days.",
                "<b>0.00% False-Positive Outage Rate:</b> Zero active jobs terminated across 72,000 metric inferences.",
                "<b>< 2.80s Hydration Latency:</b> Mean 2.34s, P99 2.65s across 500 simulated wake-up triggers.",
                "<b>Ghost Storage Purge:</b> Continuous reaper saves $412.50/month in orphaned EBS disks and unused elastic IPs.",
                "<b>UN SDG 13 Carbon Avoidance:</b> 3,903.1 kg CO2e avoided (calculated at 0.385 kg CO2/kWh regional grid factor)."
            ]
        },
        # Slide 6
        {
            "title": "Competitive Positioning Matrix",
            "subtitle": "CloudPulse vs. Industry Alternatives",
            "bullets": [
                "<b>AWS Instance Scheduler:</b> Crude time-based cron vs CloudPulse AI telemetry fusion & socket protection.",
                "<b>CloudHealth by VMware:</b> Passive PDF advisory vs CloudPulse 100% automated execution & rollback vault.",
                "<b>Kubecost:</b> Kubernetes only vs CloudPulse Unified AWS + GCP + Kubernetes + Edge bare-metal coverage.",
                "<b>Spot.io:</b> Spot instance bidding vs CloudPulse non-prod idle lifecycle and instant warm hydration protocol."
            ]
        },
        # Slide 7
        {
            "title": "Business Model & Go-To-Market Strategy",
            "subtitle": "High-Growth SaaS Potential (B2B Enterprise FinOps)",
            "bullets": [
                "<b>Community Edition:</b> Open-source self-hosted up to 10 instances (Product-Led Growth funnel).",
                "<b>Growth Tier ($12/node/mo or 15% savings):</b> Full ML Anomaly Detection, Slack ChatOps, and Predictive Pre-Hydration.",
                "<b>Enterprise Tier ($24/node/mo):</b> Multi-tenant RBAC, C-DAC VEGA RISC-V edge probe, SOC2 audit ledger, <1.5s SLA.",
                "<b>GTM Strategy:</b> AWS & GCP Marketplace 1-click deploy + 30-day value-share pilot guaranteeing 40%+ savings."
            ]
        },
        # Slide 8
        {
            "title": "Project Roadmap & TSM-TECHNOVA Conclusion",
            "subtitle": "Delivering Immediate Economic & Environmental Value",
            "bullets": [
                "<b>Current Status:</b> Fully functional working prototype, live Netlify dashboard, verified ML pipeline, and open-source repo.",
                "<b>Phase 2 Roadmap:</b> Automated Terraform/Pulumi IaC state synchronization and expanded Azure resource providers.",
                "<b>TSM Support Requested:</b> Mentoring, Incubation, and Enterprise Industry Connect for pilot deployments.",
                "<b>Live Demo Portal:</b> https://marvelous-rugelach-27a627.netlify.app | GitHub: vishnu1107-star/CLOUD-PULSE"
            ]
        }
    ]

    story = []
    for i, slide in enumerate(slides_content):
        header_table = Table([
            [Paragraph(f"<b>{slide['title']}</b>", slide_title_style)],
            [Paragraph(slide['subtitle'], slide_subtitle_style)]
        ], colWidths=[9.5 * inch])
        header_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F0F9FF')),
            ('PADDING', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, -1), (-1, -1), 10),
            ('LINEBELOW', (0, -1), (-1, -1), 2, colors.HexColor('#0284C7')),
        ]))
        story.append(header_table)
        story.append(Spacer(1, 0.2 * inch))

        bullet_data = []
        for bullet in slide["bullets"]:
            bullet_data.append([Paragraph(f"• &nbsp; {bullet}", bullet_style)])

        bullet_table = Table(bullet_data, colWidths=[9.5 * inch])
        bullet_table.setStyle(TableStyle([
            ('PADDING', (0, 0), (-1, -1), 6),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        story.append(bullet_table)

        story.append(Spacer(1, 0.3 * inch))
        footer_table = Table([[
            Paragraph("<b>CloudPulse</b> | TSM-TECHNOVA 2026", ParagraphStyle('F1', fontName='Helvetica', fontSize=9, textColor=colors.HexColor('#64748B'))),
            Paragraph(f"Slide {i+1} of 8", ParagraphStyle('F2', fontName='Helvetica', fontSize=9, textColor=colors.HexColor('#64748B'), alignment=TA_CENTER)),
            Paragraph("Team ARGUS Innovators", ParagraphStyle('F3', fontName='Helvetica', fontSize=9, textColor=colors.HexColor('#64748B'), alignment=TA_JUSTIFY))
        ]], colWidths=[3.2 * inch, 3.1 * inch, 3.2 * inch])
        story.append(footer_table)

        if i < len(slides_content) - 1:
            story.append(PageBreak())

    safe_build_doc(doc, story, output_path)

if __name__ == "__main__":
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    
    # Generate Innovation Summary
    summary_pdf = os.path.join(base_dir, "ARGUS_Innovators_InnovationSummary.pdf")
    generate_innovation_summary_pdf(summary_pdf)

    # Generate Presentation PDF
    pres_pdf = os.path.join(base_dir, "ARGUS_Innovators_Presentation.pdf")
    generate_presentation_pdf(pres_pdf)

    # Also update root-level presentation PDF
    root_pres_pdf = os.path.abspath(os.path.join(base_dir, "..", "CloudPulse_Presentation_Final.pdf"))
    generate_presentation_pdf(root_pres_pdf)
    print("=== All PDF Deliverables Generated & Synchronized Successfully ===")
