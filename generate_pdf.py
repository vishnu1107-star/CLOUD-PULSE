import os
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class LightThemeNumberedCanvas(canvas.Canvas):
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
        self.drawString(54, 25, "CloudPulse — Autonomous Multi-Cloud Cost Optimization & Hydration Engine")
        self.drawRightString(792 - 54, 25, f"Slide {self._pageNumber} of {page_count}")
        self.restoreState()

def create_pdf_presentation():
    paths = [
        os.path.join(r"C:\Users\dELL\OneDrive\Desktop\main-2", "CloudPulse_Presentation_Final.pdf"),
        os.path.join(r"C:\Users\dELL\OneDrive\Desktop\main-2\cloudpulse", "CloudPulse_Presentation_Final.pdf")
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
        
        bg_white = colors.HexColor("#FFFFFF")
        card_bg = colors.HexColor("#F8FAFC")
        card_border = colors.HexColor("#E2E8F0")
        primary_blue = colors.HexColor("#1D4ED8")
        accent_teal = colors.HexColor("#0D9488")
        text_dark = colors.HexColor("#0F172A")
        text_muted = colors.HexColor("#475569")
        accent_indigo = colors.HexColor("#4F46E5")
        
        kicker_style = ParagraphStyle(
            'Kicker', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, textColor=accent_teal, spaceAfter=4
        )
        title_style = ParagraphStyle(
            'DocTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=28, textColor=primary_blue, spaceAfter=8
        )
        subtitle_style = ParagraphStyle(
            'DocSubtitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=18, textColor=text_dark, spaceAfter=12
        )
        header_style = ParagraphStyle(
            'SlideHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=20, textColor=text_dark, spaceAfter=15
        )
        card_title_style = ParagraphStyle(
            'CardTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=14, textColor=primary_blue, spaceAfter=6
        )
        body_style = ParagraphStyle(
            'BodyTextCustom', parent=styles['Normal'], fontName='Helvetica', fontSize=11, textColor=text_muted, leading=15, spaceAfter=6
        )
        body_dark_style = ParagraphStyle(
            'BodyDarkCustom', parent=styles['Normal'], fontName='Helvetica', fontSize=11, textColor=text_dark, leading=15
        )

        story = []

        # SLIDE 1
        title_data = [
            [Paragraph("CLOUDPULSE FINOPS & INFRASTRUCTURE REANIMATION ENGINE", kicker_style)],
            [Paragraph("⚡ CloudPulse", title_style)],
            [Paragraph("Autonomous Multi-Cloud Idle Reclamation & Instant Hydration Engine", subtitle_style)],
            [Paragraph("A novel zero-downtime FinOps architecture combining multi-signal idle telemetry, ghost resource reaper, 3-second developer re-activation, and real-time carbon offset accounting.", ParagraphStyle('SubMuted', parent=body_style, fontSize=12, textColor=text_muted, leading=16))],
            [Spacer(1, 15)],
            [Paragraph("<b>PROPOSED INNOVATION • DETAILED PLAN • TECH STACK (3-5 SLIDES)</b>", ParagraphStyle('TealSub', parent=body_style, fontSize=11, textColor=accent_teal, fontName='Helvetica-Bold'))]
        ]
        t1 = Table(title_data, colWidths=[700])
        t1.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), card_bg),
            ('PADDING', (0,0), (-1,-1), 25),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOX', (0,0), (-1,-1), 1.5, primary_blue),
            ('ROUNDEDCORNERS', [10, 10, 10, 10])
        ]))
        story.append(Spacer(1, 30))
        story.append(t1)
        story.append(PageBreak())

        # SLIDE 2
        story.append(Paragraph("PROBLEM STATEMENT", kicker_style))
        story.append(Paragraph("The $17 Billion Cloud Idle & Ghost Resource Crisis", header_style))
        prob1_content = [
            Paragraph("01. Severe Dev/QA Idle Burn", card_title_style),
            Paragraph("• Non-production VMs (AWS EC2, GCP Compute) & K8s clusters run 24/7 unnecessarily.", body_style),
            Paragraph("• Over 68% of total weekly hours are idle with zero active developer usage.", body_style)
        ]
        prob2_content = [
            Paragraph("02. Silent Ghost Resource Leakage", card_title_style),
            Paragraph("• Unattached EBS/GCP disks, orphan Elastic IPs, and idle NAT gateways accumulate monthly costs.", body_style),
            Paragraph("• Cloud providers bill unattached assets continuously without generating alerts.", body_style)
        ]
        prob3_content = [
            Paragraph("03. Flaws of Passive FinOps", card_title_style),
            Paragraph("• Legacy platforms only output static email reports without executing safe automated actions.", body_style),
            Paragraph("• Manual cleanup causes developer friction and fear of breaking dependencies.", body_style)
        ]
        prob_table = Table([[prob1_content, prob2_content, prob3_content]], colWidths=[230, 230, 230])
        prob_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), card_bg),
            ('PADDING', (0,0), (-1,-1), 15),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('BOX', (0,0), (0,0), 1, primary_blue),
            ('BOX', (1,0), (1,0), 1, accent_teal),
            ('BOX', (2,0), (2,0), 1, accent_indigo),
        ]))
        story.append(prob_table)
        story.append(PageBreak())

        # SLIDE 3
        story.append(Paragraph("PROPOSED INNOVATIVE SOLUTION", kicker_style))
        story.append(Paragraph("The Novel CloudPulse Autonomous Engine Architecture", header_style))
        sol_rows = [
            [
                Paragraph("<b>1. Multi-Signal Telemetry Fusion</b>", ParagraphStyle('SolTitle', parent=body_style, textColor=primary_blue, fontSize=11, fontName='Helvetica-Bold')),
                Paragraph("Combines CPU (&lt;2%), Network (&lt;10KB/s), IOPS, and active DB/HTTP socket telemetry over rolling 30-min windows to eliminate false positives.", body_dark_style)
            ],
            [
                Paragraph("<b>2. Safe Tag-Aware Governance</b>", ParagraphStyle('SolTitle2', parent=body_style, textColor=primary_blue, fontSize=11, fontName='Helvetica-Bold')),
                Paragraph("Dynamically exempts critical production workloads (<code>Environment: Production</code>) while governing staging/dev resources.", body_dark_style)
            ],
            [
                Paragraph("<b>3. Instant-Warm Hydration Protocol</b>", ParagraphStyle('SolTitle3', parent=body_style, textColor=primary_blue, fontSize=11, fontName='Helvetica-Bold')),
                Paragraph("3-second developer re-activation via Web Portal or Slack Slash Command (<code>/cloudpulse wakeup staging</code>) with zero state loss.", body_dark_style)
            ],
            [
                Paragraph("<b>4. Autonomous Ghost Resource Reaper</b>", ParagraphStyle('SolTitle4', parent=body_style, textColor=primary_blue, fontSize=11, fontName='Helvetica-Bold')),
                Paragraph("Purges unattached EBS volumes, orphan EIPs, and idle load balancers with automated 30-day rollback snapshots.", body_dark_style)
            ],
            [
                Paragraph("<b>5. Auditable FinOps & Carbon Ledger</b>", ParagraphStyle('SolTitle5', parent=body_style, textColor=primary_blue, fontSize=11, fontName='Helvetica-Bold')),
                Paragraph("Real-time interactive dashboard tracking dollar savings ($) and verified carbon footprint reduction (kg CO₂ emissions avoided).", body_dark_style)
            ]
        ]
        sol_table = Table(sol_rows, colWidths=[220, 480])
        sol_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), card_bg),
            ('PADDING', (0,0), (-1,-1), 10),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LINEBELOW', (0,0), (-1,-2), 0.5, card_border)
        ]))
        story.append(sol_table)
        story.append(PageBreak())

        # SLIDE 4
        story.append(Paragraph("TECH STACK", kicker_style))
        story.append(Paragraph("Technology Architecture & System Layering", header_style))
        t_stack1 = [
            Paragraph("Frontend & Web3 Portal", card_title_style),
            Paragraph("<b>Tech:</b> Next.js 14, React 18, TailwindCSS, Web3.js / Solana Py, Recharts Analytics", ParagraphStyle('TealT', parent=body_style, textColor=accent_teal, fontName='Helvetica-Bold')),
            Paragraph("Executive web dashboard for telemetry, ghost resource sweeping, 1-click hydration, and Web3 carbon credit minting.", body_style)
        ]
        t_stack2 = [
            Paragraph("AI Telemetry & Backend Engine", card_title_style),
            Paragraph("<b>Tech:</b> FastAPI (Python 3.11), Time-Series AI Engine (Scikit/Prophet), Async SQLAlchemy, PostgreSQL", ParagraphStyle('TealT2', parent=body_style, textColor=accent_teal, fontName='Helvetica-Bold')),
            Paragraph("High-concurrency REST engine handling predictive AI telemetry evaluation, scheduled job dispatch, and secure webhook verification.", body_style)
        ]
        t_stack3 = [
            Paragraph("Multi-Cloud & VEGA Hardware", card_title_style),
            Paragraph("<b>Tech:</b> C-DAC VEGA RISC-V SoC Board, AWS Boto3 SDK, GCP Compute Client, Kubernetes SDK, Docker", ParagraphStyle('TealT3', parent=body_style, textColor=accent_teal, fontName='Helvetica-Bold')),
            Paragraph("Physical VEGA RISC-V Edge Hardware Gateway paired with native cloud drivers executing zero-downtime pause/scale commands.", body_style)
        ]
        t_stack4 = [
            Paragraph("DevOps, ChatOps & Web3 Ledger", card_title_style),
            Paragraph("<b>Tech:</b> Slack Webhooks API, On-Chain Carbon Ledger (Solana/Polygon), Docker Compose, OpenAPI Specs", ParagraphStyle('TealT4', parent=body_style, textColor=accent_teal, fontName='Helvetica-Bold')),
            Paragraph("Instant ChatOps re-activation (<code>/cloudpulse wakeup</code>), on-chain proof-of-green compute ledger, and containerized deployment.", body_style)
        ]
        tech_table = Table([[t_stack1, t_stack2], [t_stack3, t_stack4]], colWidths=[350, 350])
        tech_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), card_bg),
            ('PADDING', (0,0), (-1,-1), 14),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('BOX', (0,0), (0,0), 1, accent_teal),
            ('BOX', (1,0), (1,0), 1, primary_blue),
            ('BOX', (0,1), (0,1), 1, primary_blue),
            ('BOX', (1,1), (1,1), 1, accent_teal),
        ]))
        story.append(tech_table)
        story.append(PageBreak())

        # SLIDE 5
        story.append(Paragraph("IMPLEMENTATION PLAN & IMPACT", kicker_style))
        story.append(Paragraph("Structured Roadmap & Strategic Deliverables", header_style))
        plan_rows = [
            [
                Paragraph("Phase 1: Discovery & Telemetry Sync (W1-W2)", card_title_style),
                Paragraph("Deploy multi-cloud provider drivers, configure tag-aware asset inventory, and baseline idle telemetry across non-prod clusters.", body_dark_style)
            ],
            [
                Paragraph("Phase 2: Sweeping & ChatOps Hydration (W3-W4)", card_title_style),
                Paragraph("Enable dry-run ghost resource reaper, integrate K8s auto-scaler to 0, and launch Slack Slash commands (<code>/cloudpulse wakeup</code>).", body_dark_style)
            ],
            [
                Paragraph("Phase 3: Policy Enforcement & Carbon Ledger (W5-W6)", card_title_style),
                Paragraph("Activate full policy enforcement, real-time ROI tracking, and auditable CO2 carbon offset ledger for leadership reporting.", body_dark_style)
            ]
        ]
        plan_table = Table(plan_rows, colWidths=[240, 460])
        plan_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), card_bg),
            ('PADDING', (0,0), (-1,-1), 8),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LINEBELOW', (0,0), (-1,-2), 0.5, card_border)
        ]))
        story.append(plan_table)
        story.append(Spacer(1, 10))
        
        impact_box = [
            [Paragraph("<b>EXPECTED STRATEGIC IMPACT & ROI</b>", ParagraphStyle('ImpHeader', parent=body_style, textColor=accent_teal, fontSize=11, fontName='Helvetica-Bold'))],
            [
                Paragraph("• <b>55% - 65% Reduction</b> in non-production cloud infrastructure bills within 30 days.", body_dark_style),
                Paragraph("• <b>0% Developer Delay:</b> Instant ChatOps environment wakeup with zero lost state.", body_dark_style)
            ]
        ]
        imp_t = Table(impact_box, colWidths=[700])
        imp_t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EFF6FF")),
            ('PADDING', (0,0), (-1,-1), 8),
            ('BOX', (0,0), (-1,-1), 1, accent_teal)
        ]))
        story.append(imp_t)

        def draw_bg(canvas, document):
            canvas.saveState()
            canvas.setFillColor(bg_white)
            canvas.rect(0, 0, 792, 612, fill=True, stroke=False)
            canvas.restoreState()

        try:
            doc.build(story, canvasmaker=LightThemeNumberedCanvas, onFirstPage=draw_bg, onLaterPages=draw_bg)
            print(f"Saved PDF to {pdf_filename}")
        except Exception as e:
            print(f"Error saving to {pdf_filename}: {e}")

if __name__ == "__main__":
    create_pdf_presentation()
