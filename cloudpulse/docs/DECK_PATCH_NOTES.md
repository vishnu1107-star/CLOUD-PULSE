# CloudPulse — EMBRIX'26 VEGATHON Deck Patch Notes

**Purpose:** Exact slide-by-slide instructions to update the pitch deck  
**Award Track:** Edge AI & TinyML Track — EMBRIX'26 VEGATHON  
**Apply to:** `CloudPulse_Technical_Paper_Presentation.pptx` (or equivalent master deck)  
**Date:** 2026-08-23  

---

## Slide-by-Slide Patch Instructions

---

### Slide 1 — Title / Opening Slide

**Current (assumed):**
> CloudPulse: Autonomous Multi-Cloud FinOps & Instant Hydration Engine

**Add one line below the subtitle:**
```
Optimized for: Edge AI & TinyML Track — EMBRIX'26 VEGATHON
```

**Also add below team name:**
```
Track: Edge AI & TinyML | Problem Domain: Cloud FinOps | Technology: Isolation Forest + Predictive ML
```

**Text clipping check:** Ensure team member names are not clipped; use 12pt minimum font. Verify on 16:9 aspect.

---

### Slide 2 — Problem Statement (no change required)

Confirm the problem statement includes the one-liner:
> "Cloud teams waste 40–70% of compute budget on idle non-production workloads that advisory tools only *report* on — never act on."

---

### Slide 3 — Validation Slide (MAJOR UPDATE)

**Remove:** Any use of "VERIFIED" without a qualifier.

**Replace the metrics table with this exact content:**

| Metric | Value | Qualifier | Evidence |
| :--- | :---: | :---: | :--- |
| Idle Detection Accuracy | 95.3% | [Benchmarked] | 72,000-eval simulation; confusion matrix in repo |
| False-Positive Outages | 0 / 72,000 | [Benchmarked] | Same harness; zero ACTIVE_QUIET mis-paused |
| Warm Hydration Latency | < 2.8 s | [Benchmarked] | 1,000 re-activation cycles; local simulation |
| Edge Pre-Filter Speed | ~350 ns/eval | [Benchmarked] | 1M-cycle firmware bench; extrapolated to THEJAS32 |
| Non-Prod Cost Savings | 40 – 70% | [Design Target] | ROI simulator; AWS reference data |
| Real Pilot — Accuracy | 96.4% | [Real Pilot] | 1× t2.micro, 7 days, Aug 16–22 2026 |
| Real Pilot — False Outages | 0 | [Real Pilot] | Same 7-day pilot |
| Real Pilot — Idle Hours | 47 hrs / week | [Real Pilot] | Same 7-day pilot |

**Add footnote text at bottom of slide (8pt font acceptable):**
> [Benchmarked] = automated test harness, reproducible via github.com/vishnu1107-star/CLOUD-PULSE-2  
> [Design Target] = architectural goal; ROI simulator available at live demo  
> [Real Pilot] = 1 AWS t2.micro instance, 7 days; small-scale, not fleet-representative

---

### Slide 4 — Architecture Diagram

**Bug Fix — CRITICAL:**
- Find text "Dree!" in the architecture diagram
- Replace with: **"Detect"**
- Full corrected label context: "5D Multi-Signal Idle **Detect** Engine"

**Verify no other diagram typos.** Common ones to check:
- "Hydration" not "Hydration"
- "Isolation Forest" not "Isolation Forrest"
- "THEJAS32" not "THEJAS 32" (no space)

---

### Slide 5 — System Demo / Live Dashboard Screenshot

**Update screenshot** to show the new `/pilot` page on the live demo at:
`https://marvelous-rugelach-27a627.netlify.app/pilot`

Add caption: **"Real Pilot — Week 1 Results Dashboard"**

---

### NEW SLIDE (insert after slide 5) — Real Pilot: Week 1

**Slide Title:** `Real Pilot — Week 1 Evidence`  
**Subtitle:** `AWS Free-Tier Deployment | Aug 16–22, 2026 | 1 Instance | Small-Scale`

**Content to add:**

Left column — Results table:
| Metric | Result |
| :--- | :--- |
| Evaluations | 168 (hourly) |
| Detection Accuracy | 96.4% |
| False Outages | **0** |
| Idle Hours Captured | 47 hrs |
| Re-activation Latency | 2.1s – 2.7s |
| Cost Equivalent Saved | ~$4.50 (t2.micro) |

Right column — Key learning callout box:
> ✅ **Zero false-positive outages confirmed in live deployment.**  
> Socket guard correctly blocked 3 potential mis-pauses during lunch break.  
> Predictive pre-hydration fired every morning — environment warm before developer login.

**Footer disclaimer (small text):**
> Pilot: 1× AWS t2.micro, 7 days. Not fleet-representative. Full log: github.com/vishnu1107-star/CLOUD-PULSE-2/docs/pilot_results/

---

### Slide — Business Model (wherever it appears)

Add one line to the Enterprise tier description:
> `< 1.5s hydration SLA | SOC2/ISO-27001 audit ledger | THEJAS32 edge collector on-prem`

---

### Last Slide — Closing / Thank You

**Add one line at the bottom:**
```
CloudPulse — Edge AI & TinyML Track | EMBRIX'26 VEGATHON
github.com/vishnu1107-star/CLOUD-PULSE-2 | Live Demo: marvelous-rugelach-27a627.netlify.app
```

---

## Text Clipping Checklist

Run through these checks on every slide in Slide Sorter view:

- [ ] All text boxes have ≥ 4pt padding from slide edges
- [ ] No text overflows its bounding box (check in Normal view at 100% zoom)
- [ ] All slide titles are on one line at 28–36pt
- [ ] Metric tables: column widths wide enough for longest value
- [ ] Architecture diagram labels: min 9pt font, no overlap with arrows
- [ ] Footer text: 7–8pt, single line, does not bleed into content area
- [ ] Check slides 1, 3, 4, and new pilot slide specifically (most content-heavy)

## Qualifier Consistency Checklist

- [ ] Search deck for "VERIFIED" → replace every instance with `[Benchmarked]`, `[Design Target]`, or `[Real Pilot]`
- [ ] Search for "100% accuracy" → replace with "95.3% [Benchmarked]"
- [ ] Search for "proven" → replace with appropriate qualifier or remove
- [ ] Search for "guaranteed" (unless referring to SLA tier) → remove
- [ ] Ensure the word "Validated" always appears with a qualifier: e.g., "Validated [Benchmarked]"

---

## Consistent Story Checklist (Deck ↔ README ↔ Live Demo)

| Claim | Deck Slide | README.md | VALIDATION.md | Live Demo |
| :--- | :---: | :---: | :---: | :---: |
| Detection 95.3% [Benchmarked] | Slide 3 | ✅ | ✅ B-1 | ML Insights page |
| False Outages 0 [Benchmarked] | Slide 3 | ✅ | ✅ B-2 | Audit Ledger |
| Hydration < 2.8s [Benchmarked] | Slide 3 | ✅ | ✅ B-3 | Dashboard |
| Cost 40-70% [Design Target] | Slide 3 | ✅ | ✅ D-1 | ROI Calculator |
| Pilot 96.4% [Real Pilot] | New Pilot Slide | ✅ | ✅ P-1 | /pilot page |
| Award Track: Edge AI & TinyML | Slide 1, Last Slide | ✅ Badge | — | — |
