import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER

def generate_innovation_summary_pdf(output_paths: list[str]):
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=15,
        leading=19,
        alignment=TA_CENTER,
        spaceAfter=8
    )

    meta_style = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=9.5,
        leading=13.5,
        alignment=TA_CENTER,
        spaceAfter=14
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=12,
        leading=18,  # 1.5 line spacing for 12pt
        alignment=TA_JUSTIFY,
        spaceAfter=8
    )

    story = []
    story.append(Paragraph("<b>CloudPulse: Autonomous Multi-Cloud FinOps & Instant Hydration Engine</b>", title_style))
    story.append(Paragraph(
        "<b>Track:</b> AI Infrastructure & FinOps &nbsp;|&nbsp; "
        "<b>Team:</b> ARGUS Innovators &nbsp;|&nbsp; "
        "<b>Leader:</b> L. Vishnu Priya &nbsp;|&nbsp; "
        "<b>Members:</b> Harini Sri B K, Tharagai V, Vishalni S &nbsp;|&nbsp; "
        "<b>Host:</b> TSM-TECHNOVA 2026", 
        meta_style
    ))

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

    for p in output_paths:
        try:
            doc = SimpleDocTemplate(
                p,
                pagesize=letter,
                rightMargin=0.75 * inch,
                leftMargin=0.75 * inch,
                topMargin=0.75 * inch,
                bottomMargin=0.75 * inch
            )
            # Recreate story list so it doesn't get consumed
            story_copy = list(story)
            doc.build(story_copy)
            print(f"[OK] Generated Innovation Summary PDF at: {p}")
        except PermissionError:
            print(f"[NOTE] Path {p} is open in reader. Skipped.")
        except Exception as e:
            print(f"[ERROR] Failed {p}: {e}")

if __name__ == "__main__":
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    paths = [
        os.path.join(base_dir, "ARGUS_Innovators_InnovationSummary.pdf"),
        os.path.join(base_dir, "ARGUS_Innovators_InnovationSummary_Final.pdf"),
        os.path.join(base_dir, "ARGUS_Innovators_InnovationSummary_Updated.pdf")
    ]
    generate_innovation_summary_pdf(paths)
