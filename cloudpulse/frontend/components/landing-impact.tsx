'use client'

import React from 'react'
import { 
  Leaf, 
  Award, 
  Quote, 
  Sparkles, 
  Trees, 
  Car, 
  Zap, 
  Globe2,
  CheckCircle2,
  Info,
  Target,
  FlaskConical
} from 'lucide-react'

export function LandingImpact() {
  const sdgGoals = [
    {
      id: 'sdg-9',
      number: 'SDG 09',
      title: 'Industry, Innovation & Infrastructure',
      badge: 'Target 9.4',
      desc: 'Upgrading technological infrastructure for sustainable compute efficiency through multi-signal telemetry and machine learning anomaly detection.',
      color: 'amber'
    },
    {
      id: 'sdg-12',
      number: 'SDG 12',
      title: 'Responsible Consumption & Production',
      badge: 'Target 12.2',
      desc: 'Eliminating wasteful non-production CPU/RAM power draw by automatically pausing 128 off-hours of weekly staging zombie runtime.',
      color: 'emerald'
    },
    {
      id: 'sdg-13',
      number: 'SDG 13',
      title: 'Climate Action',
      badge: 'Target 13.1',
      desc: 'Estimated Scope 2 carbon abatement based on benchmark methodology for corporate sustainability disclosure.',
      color: 'blue'
    }
  ]

  const equivalents = [
    {
      icon: Trees,
      value: '186 Trees',
      label: 'Tree Absorption Equivalent',
      desc: 'Annual carbon sequestration equivalence of 186 mature urban trees per 100 VMs.'
    },
    {
      icon: Car,
      value: '9,680 Miles',
      label: 'Avoided Gasoline Travel',
      desc: 'Equivalent greenhouse gas emissions from 9,680 miles driven by average passenger car.'
    },
    {
      icon: Zap,
      value: '10,140 kWh',
      label: 'Conserved Data Center Power',
      desc: 'Estimated kilowatt-hours of thermal generation eliminated every month across dormant fleets.'
    }
  ]

  return (
    <section id="impact-section" className="space-y-8 pt-6 border-t border-gray-200 text-gray-900">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>ESTIMATED ENVIRONMENTAL IMPACT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Estimated Environmental Impact &amp; SDG Framework Alignment
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md">
          Scope 2 impact estimate based on benchmark methodology — to be validated with real telemetry during the enterprise pilot.
        </p>
      </div>

      {/* Quantified CO2 Savings Hero Infographic */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-sm shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
                Benchmark Emission Reduction
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                100 instances → ~3,903 kg estimated CO₂e avoided monthly.
              </h3>
            </div>
          </div>
          <div className="text-xs font-semibold text-emerald-800 bg-white px-3.5 py-2 rounded-xl border border-emerald-200 shadow-sm whitespace-nowrap">
            Scope 2 Impact Estimate (Benchmark)
          </div>
        </div>

        {/* 3 Green Equivalency Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {equivalents.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-black text-emerald-700 font-mono tracking-tight">{item.value}</div>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xs font-bold text-gray-900">{item.label}</div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="text-[11px] text-gray-500 italic pt-1 border-t border-emerald-100 flex items-center space-x-1">
          <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span>Scope 2 impact estimate based on benchmark methodology: Cloud resource usage → energy draw (0.2 kW/VM) → regional grid factor (0.385 kg CO₂/kWh). To be validated with real telemetry during the enterprise pilot.</span>
        </div>
      </div>

      {/* 3 SDG Badges Cards */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            UN SDG Sustainability Framework Alignment
          </h3>
          <span className="text-xs text-gray-500 font-medium">Framework Alignment</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sdgGoals.map((sdg) => (
            <div
              key={sdg.id}
              className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {sdg.number}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-500 font-mono">{sdg.badge}</span>
                </div>
                <h4 className="text-base font-bold text-gray-900 leading-snug">{sdg.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{sdg.desc}</p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center space-x-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Scope 2 Sustainability Target</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt #3: Replaced Customer Testimonial with Pilot Target Card */}
      <div className="p-6 rounded-3xl bg-blue-50/70 border border-blue-200 shadow-sm relative overflow-hidden">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-2xl bg-blue-600 text-white shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 block">
              PILOT TARGET
            </span>
            <p className="text-base font-bold text-gray-900 leading-relaxed">
              “Validate savings, detection accuracy, hydration latency and operational safety with a real enterprise non-production environment.”
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              CloudPulse is engineered for 30-day enterprise pilots to empirically measure cost reclamation on non-production staging fleets with snapshot protection.
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}
