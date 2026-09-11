'use client'

import React from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  Target, 
  Compass, 
  Rocket, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Layers,
  ShieldCheck,
  DollarSign,
  Briefcase
} from 'lucide-react'

export function LandingBusiness() {
  // Prompt #17: 90-Day Pilot Phased Roadmap
  const roadmapPhases = [
    {
      phase: '0–30 DAYS',
      tag: 'Pilot Phase',
      title: 'Telemetry & Safety Validation',
      color: 'blue',
      milestones: [
        'Connect read-only telemetry (< 5 mins IAM role)',
        'Measure baseline spend & non-prod idle waste',
        'Validate safety with 30-day snapshot rollback'
      ]
    },
    {
      phase: '31–60 DAYS',
      tag: 'Prove Phase',
      title: 'Measure Savings & Performance',
      color: 'emerald',
      milestones: [
        'Measure actual monthly cloud cost savings',
        'Measure multi-signal detection accuracy',
        'Measure warm hydration latency (<2.34s benchmark)'
      ]
    },
    {
      phase: '61–90 DAYS',
      tag: 'Scale Phase',
      title: 'Enterprise Fleet Rollout',
      color: 'indigo',
      milestones: [
        'Expand to all non-prod staging & dev workloads',
        'Add GPU & serverless workload coverage',
        'Expand multi-cloud coverage across AWS & GCP'
      ]
    }
  ]

  // Prompt #16: Business Model & Personas
  const businessElements = [
    {
      label: 'TARGET CUSTOMER',
      title: 'Cloud-Heavy Enterprises',
      desc: 'Organizations running 50+ non-production instances or Kubernetes clusters across AWS and GCP.'
    },
    {
      label: 'PRIMARY BUYER',
      title: 'FinOps & Platform Teams',
      desc: 'FinOps Leads, DevOps Engineers, and Platform Engineering Teams responsible for cloud economics and reliability.'
    },
    {
      label: 'BUSINESS MODEL',
      title: 'Pilot → Prove ROI → Subscription',
      desc: '30-day zero-commitment pilot to prove ROI and safety, transitioning to production SaaS subscription.'
    },
    {
      label: 'PRICING STRUCTURE',
      title: 'Platform Fee + Usage Coverage',
      desc: 'Predictable monthly tier based on managed non-production compute volume with high projected ROI.'
    }
  ]

  return (
    <section id="business-section" className="space-y-8 pt-6 border-t border-gray-200 text-gray-900">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 mb-2">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span>Commercial Strategy &amp; GTM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Commercial Model &amp; 90-Day Adoption Journey
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md">
          A low-friction, pilot-first adoption model engineered for mid-to-large engineering organizations.
        </p>
      </div>

      {/* Prompt #16: Business Foundations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {businessElements.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block">
                {item.label}
              </span>
              <h4 className="text-base font-bold text-gray-900">{item.title}</h4>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Market Sizing: Concentric Rings & TAM/SAM/SOM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Col (5 cols): Concentric Circle Visualizer */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold mb-4">
            Market Opportunity Sizing
          </span>

          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* TAM Circle (Outer) */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-300 bg-rose-50/50 flex items-start justify-center pt-2">
              <span className="text-[10px] font-mono font-bold text-rose-700">TAM: $17B Global</span>
            </div>

            {/* SAM Circle (Middle) */}
            <div className="absolute inset-6 rounded-full border-2 border-blue-300 bg-blue-50/60 flex items-start justify-center pt-2">
              <span className="text-[10px] font-mono font-bold text-blue-700">SAM: $5B Mid-Market</span>
            </div>

            {/* SOM Circle (Inner Target) */}
            <div className="absolute inset-14 rounded-full border-2 border-emerald-400 bg-emerald-100/90 shadow-sm flex flex-col items-center justify-center text-center p-2">
              <span className="text-[10px] font-mono font-bold text-emerald-800">SOM</span>
              <span className="text-xs font-black text-emerald-900 font-mono">$250K Y1</span>
              <span className="text-[9px] text-emerald-700 font-medium">→ $1M Y2 Target</span>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500 font-medium">
            Concentric TAM ($17B) → SAM ($5B) → SOM ($250K–$1M Target)
          </div>
        </div>

        {/* Right Col (7 cols): TAM SAM SOM Tiers */}
        <div className="lg:col-span-7 space-y-3.5">
          
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] font-mono font-bold text-rose-600">TAM</span>
              <span className="text-xs font-black text-rose-700">$17B</span>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900">Total Addressable Market (TAM)</h4>
                <span className="text-[11px] font-mono text-gray-500 font-semibold">$17B / year</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Global annual spend on idle and orphaned non-production compute across all public cloud vendors.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] font-mono font-bold text-blue-600">SAM</span>
              <span className="text-xs font-black text-blue-700">$5B</span>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900">Serviceable Addressable Market (SAM)</h4>
                <span className="text-[11px] font-mono text-gray-500 font-semibold">$5B / year</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Mid-to-large engineering firms running AWS EC2 &amp; Kubernetes staging clusters.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm flex items-start space-x-4 bg-gradient-to-r from-white to-emerald-50/50">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] font-mono font-bold text-emerald-800">SOM</span>
              <span className="text-xs font-black text-emerald-900">$250K</span>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900">Serviceable Obtainable Market (SOM)</h4>
                <span className="text-[11px] font-mono text-emerald-800 font-bold">$250K Y1 → $1M Y2 Target</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Initial beachhead: 10 pilot adopters in Year 1 expanding to 40 organizations in Year 2.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Prompt #17: 90-Day Pilot Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            90-Day Enterprise Adoption Plan (0–30d Pilot → 31–60d Prove → 61–90d Scale)
          </h3>
          <Link href="/pilot" className="text-xs text-blue-600 font-bold hover:underline flex items-center space-x-1">
            <span>View Pilot Framework</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roadmapPhases.map((phase, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    {phase.phase}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-500 font-mono">{phase.tag}</span>
                </div>
                <h4 className="text-base font-bold text-gray-900 leading-snug">{phase.title}</h4>
                <div className="space-y-2 pt-1">
                  {phase.milestones.map((m, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-gray-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                <span>Phase Objective</span>
                <span className="font-bold text-gray-900">{idx === 0 ? 'Telemetry & Safety' : idx === 1 ? 'Measure ROI & Latency' : 'Fleet Rollout'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
