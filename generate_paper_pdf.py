import os
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFillColor(colors.HexColor("#64748B"))
        self.setFont("Helvetica-Bold", 9)
        self.drawString(54, 25, "CloudPulse Paper Presentation — Autonomous FinOps & VEGA RISC-V Edge Gateway")
        self.drawRightString(792 - 54, 25, f"Slide {self._pageNumber} of {page_count}")
        self.restoreState()

def create_paper_pdf():
    paths = [
        os.path.join(r"C:\Users\dELL\OneDrive\Desktop\main-2", "CloudPulse_Technical_Paper_Presentation.pdf"),
        os.path.join(r"C:\Users\dELL\OneDrive\Desktop\main-2\cloudpulse", "CloudPulse_Technical_Paper_Presentation.pdf")
    ]
    
    for pdf_filename in paths:
        doc = SimpleDocTemplate(
            pdf_filename,
            pagesize=landscape(letter),
            leftMargin=40,
            rightMargin=40,
            topMargin=35,
            bottomMargin=40
        )
        
        styles = getSampleStyleSheet()
        
        card_bg = colors.HexColor("#F8FAFC")
        primary_blue = colors.HexColor("#1D4ED8")
        accent_teal = colors.HexColor("#0D9488")
        text_dark = colors.HexColor("#0F172A")
        text_muted = colors.HexColor("#475569")
        math_purple = colors.HexColor("#7E22CE")
        
        kicker_style = ParagraphStyle('Kicker', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, textColor=accent_teal, spaceAfter=4)
        title_style = ParagraphStyle('DocTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=22, textColor=primary_blue, spaceAfter=8)
        header_style = ParagraphStyle('SlideHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=18, textColor=text_dark, spaceAfter=12)
        body_style = ParagraphStyle('BodyCustom', parent=styles['Normal'], fontName='Helvetica', fontSize=11, textColor=text_muted, leading=15, spaceAfter=6)

        story = []

        # SLIDE 1
        title_data = [
            [Paragraph("TECHNICAL RESEARCH PAPER PRESENTATION", kicker_style)],
            [Paragraph("⚡ CloudPulse: Autonomous Cost Reclamation & Hydration Engine", title_style)],
            [Paragraph("<b>Category:</b> Cloud Infrastructure, FinOps & Hardware Edge Orchestration (C-DAC VEGA RISC-V SoC)", ParagraphStyle('Sub', parent=body_style, textColor=text_dark, fontName='Helvetica-Bold'))],
            [Spacer(1, 10)],
            [Paragraph("<b>ABSTRACT:</b> Over $17B is lost annually due to idle, non-production cloud resources. CloudPulse bridges the gap between passive FinOps advisory and zero-downtime automated execution. By combining multi-signal telemetry fusion with tag-aware governance, CloudPulse safely pauses idle VMs (AWS/GCP) and scales K8s deployments to 0. Paired with a C-DAC VEGA RISC-V Edge Hardware Gateway and a <3.0s Instant-Warm Hydration Protocol, CloudPulse delivers up to 45% cost reclamation with zero production downtime.", body_style)]
        ]
        t1 = Table(title_data, colWidths=[700])
        t1.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), card_bg),
            ('PADDING', (0,0), (-1,-1), 20),
            ('BOX', (0,0), (-1,-1), 1.5, primary_blue),
        ]))
        story.append(t1)
        story.append(PageBreak())

        # SLIDE 2: Problem
        story.append(Paragraph("1. Motivation: The $17B Cloud Idle Waste Crisis", header_style))
        p_data = [
            [
                Paragraph("<b>01. Severe Idle Dev Burn</b><br/><br/>Non-production VMs run 24/7. Dev/Staging environments are active only ~40 hours out of a 168-hour week (68%+ waste off-hours).", body_style),
                Paragraph("<b>02. Silent Ghost Assets</b><br/><br/>Unattached EBS storage, orphan Elastic IPs, and idle load balancers silently drain enterprise cloud budgets month after month.", body_style),
                Paragraph("<b>03. Advisory FinOps Friction</b><br/><br/>Legacy FinOps tools output passive PDF reports and tickets. Engineers ignore alerts due to fear of breaking service dependencies.", body_style)
            ]
        ]
        t2 = Table(p_data, colWidths=[225, 225, 225])
        t2.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), card_bg),
            ('PADDING', (0,0), (-1,-1), 15),
            ('BOX', (0,0), (-1,-1), 1, primary_blue),
            ('VALIGN', (0,0), (-1,-1), 'TOP')
        ]))
        story.append(t2)
        story.append(PageBreak())

        # SLIDE 3: Architecture
        story.append(Paragraph("2. System Architecture & Core Methodology", header_style))
        arch_data = [
            [Paragraph("<b>1. Tag-Aware Discovery Driver</b> — Dynamically inspects infrastructure tags. Exempts Production while targetting Dev/Staging.", body_style)],
            [Paragraph("<b>2. Multi-Signal Telemetry Evaluator</b> — Combines rolling 30-min CPU (<2%), Network (<10KB/s), and active connection socket checks.", body_style)],
            [Paragraph("<b>3. Ghost Resource Reaper Engine</b> — Purges unattached EBS volumes and orphan EIPs with 30-day automated snapshot rollbacks.", body_style)],
            [Paragraph("<b>4. Instant Hydration ChatOps Portal</b> — Sub-3-second developer re-activation via Web UI & Slack (/cloudpulse wakeup staging).", body_style)],
            [Paragraph("<b>5. C-DAC VEGA RISC-V Edge Gateway</b> — On-premise physical SoC board executing secure cloud API polling and lifecycle loops at <5W.", body_style)]
        ]
        t3 = Table(arch_data, colWidths=[700])
        t3.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), card_bg),
            ('PADDING', (0,0), (-1,-1), 12),
            ('BOX', (0,0), (-1,-1), 1, accent_teal),
        ]))
        story.append(t3)
        story.append(PageBreak())

        # SLIDE 4: Mathematical Formulations
        story.append(Paragraph("3. Algorithmic Formulations & Mathematical Models", header_style))
        m_data = [
            [Paragraph("<b>A. Telemetry Fusion Idle Logic</b><br/><code>I(r, t) = (1/Δt ∫ CPU_r(τ)dτ &lt; 2.0%) AND (NetBW_r(t) &lt; 10KB/s) AND (Connections == 0) AND NOT Grace(t)</code><br/>Multi-signal logical AND evaluation over rolling 30-min window prevents false positive shutdowns.", body_style)],
            [Paragraph("<b>B. Cost Reclamation Model</b><br/><code>S_total = Σ [Paused] (H_idle × R_hourly) + Σ [Purged] (D_orphan/30 × C_monthly)</code><br/>Calculates dollar savings achieved from paused compute instances and early purged ghost asset billing cycles.", body_style)],
            [Paragraph("<b>C. Carbon Offset Ledger</b><br/><code>CO2 Saved (kg) = Σ H_idle × P_avg (0.20 kW) × E_grid (0.385 kg CO2/kWh)</code><br/>Translates reclaimed energy (kWh) into verified carbon emissions avoided.", body_style)]
        ]
        t4 = Table(m_data, colWidths=[700])
        t4.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), card_bg),
            ('PADDING', (0,0), (-1,-1), 14),
            ('BOX', (0,0), (-1,-1), 1.5, math_purple),
        ]))
        story.append(t4)
        story.append(PageBreak())

        # SLIDE 5: Hardware Co-Design
        story.append(Paragraph("4. Hardware-Software Co-Design: C-DAC VEGA RISC-V Gateway", header_style))
        hw_data = [
            [
                Paragraph("<b>On-Premise Hardware Orchestrator</b><br/><br/>Runs CloudPulse edge monitoring microservices locally on the C-DAC VEGA RISC-V SoC Board.", body_style),
                Paragraph("<b>Tamper-Proof Key Isolation</b><br/><br/>Maintains cloud provider master credentials securely on physical edge hardware.", body_style)
            ],
            [
                Paragraph("<b>Ultra-Low Power Telemetry</b><br/><br/>Operates 24/7 continuous telemetry polling and control loops at sub-5W power draw.", body_style),
                Paragraph("<b>Hybrid Cloud Execution</b><br/><br/>Issues native API commands directly to AWS Boto3, GCP Compute API, and K8s clusters.", body_style)
            ]
        ]
        t5 = Table(hw_data, colWidths=[340, 340])
        t5.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), card_bg),
            ('PADDING', (0,0), (-1,-1), 16),
            ('BOX', (0,0), (-1,-1), 1, accent_teal),
            ('VALIGN', (0,0), (-1,-1), 'TOP')
        ]))
        story.append(t5)
        story.append(PageBreak())

        # SLIDE 6: Results & Conclusion
        story.append(Paragraph("5. Performance Benchmarks & Future Scope", header_style))
        bench_data = [
            ["Metric", "Legacy Advisory FinOps", "CloudPulse Engine", "Impact"],
            ["Action Execution", "Manual Ticket Creation", "100% Autonomous", "Zero Manual Friction"],
            ["Outage Rate", "High (CPU-only check)", "0.0% (Multi-signal)", "100% Guaranteed Uptime"],
            ["Hydration Latency", "30 - 60 Minutes", "< 2.8 Seconds", "95%+ Speedup in Dev Velocity"],
            ["Off-Hours Waste Saved", "10% - 15%", "42.4% - 48.0%", "3x Higher Cost Reclamation"]
        ]
        t6 = Table(bench_data, colWidths=[150, 180, 180, 170])
        t6.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), primary_blue),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('BACKGROUND', (0,1), (-1,-1), card_bg),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
            ('PADDING', (0,0), (-1,-1), 8),
            ('ALIGN', (0,0), (-1,-1), 'CENTER')
        ]))
        story.append(t6)
        
        doc.build(story, canvasmaker=NumberedCanvas)
        print(f"Generated PDF presentation deck: {pdf_filename}")

if __name__ == "__main__":
    create_paper_pdf()
