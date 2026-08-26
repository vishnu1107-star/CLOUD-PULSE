'use client'

import React from 'react'
import { 
  TrendingUp, 
  Target, 
  Compass, 
  CheckCircle2, 
  Calendar, 
  Rocket, 
  ShieldCheck, 
  Layers,
  ArrowRight
} from 'lucide-react'

export function LandingBusiness() {
  const roadmapPhases = [
    {
      phase: 'Phase 1',
      days: 'Days 1–30',
      title: 'Pilot & Read-Only Audit',
      badge: 'Zero-Friction Ingestion',
      icon: Compass,
      color: 'cyan',
      deliverables: [
        'Deploy read-only IAM probe (AWS/GCP/K8s)',
        'Continuous 30-day baseline idle & ghost asset audit',
        'Identify 40–70% immediate off-hours savings potential'
      ]
    },
    {
      phase: 'Phase 2',
      days: 'Days 31–60',
      title: 'Prove & Policy Guardrails',
      badge: 'Active Staging Automation',
      icon: ShieldCheck,
      color: 'emerald',
      deliverables: [
        'Enable autonomous off-hours pause on Staging & Dev',
        'Activate Slack /cloudpulse webhook 1-click rehydration',
        'Verify zero false-positive developer disruption'
      ]
    },
    {
      phase: 'Phase 3',
      days: 'Days 61–90',
      title: 'Scale & ESG Governance',
      badge: 'Enterprise Rollout',
      icon: Rocket,
      color: 'purple',
      deliverables: [
        'Multi-cloud fleet rollout with auto-purging 30-day vault',
        'C-DAC VEGA RISC-V edge hardware probe deployment',
        'Generate auditable ESG UN SDG carbon certificates'
      ]
    }
  ]

  return (
    <section id="business-section" className="space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20 mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Market Opportunity & Scale</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Market Sizing & 90-Day Enterprise Adoption
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          A clear $17B addressable opportunity coupled with a frictionless phased adoption pathway.
        </p>
      </div>

      {/* Market Sizing Snapshot (TAM / SAM / SOM) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span>Market Sizing Snapshot (TAM / SAM / SOM)</span>
            </h3>
            <p className="text-xs text-slate-400">Total Addressable Market, Serviceable Market, and Year 1-2 Targets</p>
          </div>
          <span className="text-[11px] font-mono text-purple-300 bg-purple-500/15 px-2.5 py-1 rounded-full border border-purple-500/25">
            $600B+ Public Cloud TAM
          </span>
        </div>

        {/* Concentric TAM/SAM/SOM Display Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* TAM */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900/90 to-slate-950 border border-purple-500/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-400">
                TAM • Global Market
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                $17 Billion
              </div>
              <p className="text-xs text-purple-200 mt-1 font-semibold">
                Idle non-production cloud waste globally.
              </p>
            </div>
            <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2.5 leading-relaxed">
              Calculated from 40–70% off-hours idle run-rate across AWS, Azure, GCP non-prod environments.
            </p>
          </div>

          {/* SAM */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-slate-950 border border-cyan-500/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                SAM • Serviceable
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                $5 Billion
              </div>
              <p className="text-xs text-cyan-200 mt-1 font-semibold">
                AWS & GCP mid-size SaaS enterprises.
              </p>
            </div>
            <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2.5 leading-relaxed">
              Targeting engineering orgs spending $50k to $500k monthly on multi-cloud developer clusters.
            </p>
          </div>

          {/* SOM */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-950 border border-emerald-500/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                SOM • Target ARR
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                $250K → $1.0M
              </div>
              <p className="text-xs text-emerald-200 mt-1 font-semibold">
                $250K ARR Y1 (10 pilots) → $1.0M ARR Y2
              </p>
            </div>
            <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2.5 leading-relaxed">
              Tiered SaaS pricing: $12–$24/node/month or 15% share of verified FinOps savings.
            </p>
          </div>

        </div>
      </div>

      {/* 90-Day Adoption Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>90-Day Enterprise Adoption Roadmap (Pilot → Prove → Scale)</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Frictionless Transition</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roadmapPhases.map((phase, idx) => {
            const Icon = phase.icon
            return (
              <div
                key={phase.phase}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 relative flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">{phase.phase}</span>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                      {phase.days}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-slate-800 text-white border border-slate-700">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{phase.title}</h4>
                      <p className="text-[11px] text-slate-400">{phase.badge}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                    {phase.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Milestone {idx + 1}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
