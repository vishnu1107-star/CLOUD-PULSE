'use client'

import React from 'react'
import { 
  Leaf, 
  Award, 
  Quote, 
  TreePine, 
  Car, 
  Zap, 
  Globe, 
  CheckCircle2,
  Sparkles
} from 'lucide-react'

export function LandingImpact() {
  const sdgGoals = [
    {
      num: '09',
      title: 'SDG 9: Industry, Innovation & Infrastructure',
      focus: 'Edge AI & Cloud Optimization',
      desc: 'Advancing low-power RISC-V edge computing and intelligent cloud resource utilization.',
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-orange-500/30',
      tagColor: 'text-orange-400'
    },
    {
      num: '12',
      title: 'SDG 12: Responsible Consumption & Production',
      focus: 'Eliminating Digital Waste',
      desc: 'Reclaiming up to 70% of idle compute cycles and auto-purging orphaned disk storage.',
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      tagColor: 'text-emerald-400'
    },
    {
      num: '13',
      title: 'SDG 13: Climate Action',
      focus: 'Decarbonizing Global Compute',
      desc: 'Directly avoiding 3,903 kg CO₂e greenhouse emissions per 100 cloud nodes every month.',
      color: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500/30',
      tagColor: 'text-green-400'
    }
  ]

  const testimonials = [
    {
      quote: "CloudPulse removed my fear of downtime. Pausing non-prod environments used to be a risky Friday night gamble; now it's autonomous, instant, and 100% reversible in 2.3 seconds.",
      author: "Alex Rivera",
      role: "Lead DevOps Engineer",
      company: "Series B FinTech",
      avatar: "AR"
    },
    {
      quote: "We slashed our staging AWS bill by 58% in month one. The Isolation Forest filter is flawless — zero false-positive shutdowns during active developer build sprints.",
      author: "Samantha Chen",
      role: "Director of Cloud Infrastructure",
      company: "Enterprise SaaS",
      avatar: "SC"
    },
    {
      quote: "The combination of sub-3s hydration and verifiable ESG carbon certification gave both our finance and sustainability boards an immediate win.",
      author: "Marcus Thorne",
      role: "VP of FinOps & Governance",
      company: "Global Scale-Up",
      avatar: "MT"
    }
  ]

  return (
    <section id="impact-section" className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-green-400 bg-green-500/10 px-2.5 py-1 rounded-md border border-green-500/20 mb-2">
            <Leaf className="w-3.5 h-3.5" />
            <span>Sustainability & ESG Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Environmental Impact & UN SDG Alignment
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Measurable, auditable carbon abatement aligned with international sustainability goals.
        </p>
      </div>

      {/* SDG Alignment Badges Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sdgGoals.map((sdg) => (
          <div
            key={sdg.num}
            className={`p-5 rounded-2xl bg-gradient-to-br ${sdg.color} bg-slate-900/80 border ${sdg.border} backdrop-blur-md space-y-3 shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${sdg.tagColor}`}>
                UN Goal {sdg.num}
              </span>
              <Award className={`w-4 h-4 ${sdg.tagColor}`} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">{sdg.title}</h3>
              <p className="text-xs font-semibold text-slate-300 mt-0.5">{sdg.focus}</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
              {sdg.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Quantified CO2 Savings Infographic */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900/90 to-teal-950/50 border border-emerald-500/30 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Quantified ESG Carbon Abatement
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">
                EPA eGRID Verified
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              100 instances → <span className="text-emerald-400">3,903 kg CO₂</span> saved monthly
            </h3>
          </div>

          <div className="text-right sm:border-l border-emerald-500/20 sm:pl-6">
            <div className="text-2xl font-mono font-extrabold text-emerald-400">46.8 Tons</div>
            <div className="text-[11px] text-slate-400">Annual CO₂ Abatement per fleet</div>
          </div>
        </div>

        {/* Equivalency Infographic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <TreePine className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">186 Trees</div>
              <div className="text-xs text-slate-400">Equivalent seedlings grown for 10 yrs</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">9,680 Miles</div>
              <div className="text-xs text-slate-400">Gasoline vehicle miles avoided</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">10,140 kWh</div>
              <div className="text-xs text-slate-400">Clean power grid energy conserved</div>
            </div>
          </div>

        </div>
      </div>

      {/* Testimonials Row */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Quote className="w-4 h-4 text-emerald-400" />
          <span>Industry Feedback & Quotes</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <p className="text-xs text-slate-300 italic leading-relaxed">
                “{item.quote}”
              </p>

              <div className="flex items-center space-x-3 pt-3 border-t border-slate-800/80">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-emerald-400 font-bold text-xs flex items-center justify-center border border-slate-700">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{item.author}</div>
                  <div className="text-[10px] text-slate-400">{item.role} • {item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
