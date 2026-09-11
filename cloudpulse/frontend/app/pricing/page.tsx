'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Calculator, 
  Users, 
  TrendingUp, 
  Lock, 
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react'

export default function PricingPage() {
  const tiers = [
    {
      name: 'PILOT',
      badge: 'Low Friction Evaluation',
      price: '30-Day Free Trial',
      sub: 'Zero commitment • Read-only telemetry',
      desc: 'Deploy on 1–3 non-production staging clusters to prove idle detection accuracy, baseline spend waste, and snapshot safety.',
      cta: 'Start 30-Day Pilot',
      href: '/pilot',
      popular: false,
      features: [
        'Connect up to 25 non-prod workloads',
        'Read-only AWS/GCP telemetry connection',
        'Multi-signal 5D idle detection engine',
        'Disaster Recovery Snapshot Vault (30-day)',
        '1-Click sub-2.34s warm hydration portal (benchmark)',
        'Automated ROI & savings verification report'
      ]
    },
    {
      name: 'GROWTH',
      badge: 'Most Popular',
      price: 'Flexible Subscription',
      sub: 'Transparent monthly SaaS billing',
      desc: 'Full autonomous closed-loop optimization prototype for scaling engineering organizations running active dev, QA, and staging estates.',
      cta: 'Book Growth Demo',
      href: '/pilot',
      popular: true,
      features: [
        'Multi-cloud: AWS EC2, GCP GCE & Kubernetes',
        'Autonomous closed-loop cost reclamation prototype',
        'Ghost Reaper unattached disk & orphan IP sweeper',
        'Predictive AI diurnal pre-hydration scheduler',
        'Tamper-evident audit ledger stream',
        'Slack & Discord ChatOps webhook integrations',
        'Estimated Scope 2 environmental impact report',
        'Standard DevOps email & chat support'
      ]
    },
    {
      name: 'ENTERPRISE',
      badge: 'Custom Governance',
      price: 'Custom SLA & Pricing',
      sub: 'Tailored to enterprise non-prod scale',
      desc: 'Advanced governance, custom policy engines, dedicated compliance features, and SSO integration for large multi-account fleets.',
      cta: 'Contact Enterprise Team',
      href: '/security',
      popular: false,
      features: [
        'Unlimited workloads & multi-account fleet support',
        'Enterprise RBAC (Admin, FinOps, DevOps, Viewer)',
        'SAML 2.0 / Okta / Azure AD Single Sign-On (SSO)',
        'Custom multi-variable policy engine & gates',
        'Dedicated Technical Account Manager (TAM)',
        'Custom API & Terraform / Pulumi providers',
        'Target: 99.99% hydration availability — subject to pilot validation',
        'Target: zero data-loss workflow through snapshot protection'
      ]
    }
  ]

  const customerPersonas = [
    {
      role: 'Primary Buyers',
      titles: 'CTO • VP Engineering • FinOps Lead',
      pain: '“We know we’re wasting cloud budget on idle staging infrastructure, but engineers don’t have the time to manually schedule power states and fear accidental outages.”',
      benefit: '45–70% projected non-production savings based on benchmark modeling. Production environments remain protected by default; safety will be validated during the pilot.'
    },
    {
      role: 'Primary Users',
      titles: 'DevOps • Platform Engineers • SREs',
      pain: '“Legacy FinOps tools dump static PDF reports and Jira tickets on us. We ignore them because turning off developer machines causes cold-start friction and broken dependencies.”',
      benefit: 'Target: zero data-loss workflow through 30-day snapshot protection with sub-3s warm re-activation via Slack ChatOps.'
    }
  ]

  return (
    <div className="space-y-12 text-gray-900">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Transparent Business Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900">
          Turn Cloud Waste Into Measurable Capital.
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Designed to demonstrate measurable ROI during the pilot.
        </p>
      </div>

      {/* Pricing Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`p-6 sm:p-8 rounded-3xl bg-white border flex flex-col justify-between transition-all ${
              tier.popular
                ? 'border-blue-600 shadow-xl ring-2 ring-blue-500/20 relative'
                : 'border-gray-200 shadow-sm hover:shadow-md'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                Most Popular
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600">{tier.badge}</span>
                  <span className="text-xs font-mono font-bold text-gray-400">{tier.name}</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{tier.price}</h3>
                <p className="text-xs text-gray-500">{tier.sub}</p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {tier.desc}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  Included Capabilities:
                </span>
                {tier.features.map((f, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-gray-700 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <Link
                href={tier.href}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all ${
                  tier.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                <span>{tier.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* Customer Persona Section: "Who is CloudPulse for?" */}
      <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">Who is CloudPulse Built For?</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Targeting mid-size B2B SaaS companies running large non-production environments on AWS &amp; GCP.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            Target: 50–1,000 Engineers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customerPersonas.map((p, i) => (
            <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-blue-600 font-bold">{p.role}</span>
                <span className="text-xs font-bold text-gray-900">{p.titles}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">The Core Pain Point:</span>
                <p className="text-xs text-gray-700 italic leading-relaxed bg-white p-3 rounded-xl border border-gray-200">
                  {p.pain}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">The CloudPulse Solution:</span>
                <p className="text-xs text-gray-800 font-semibold leading-relaxed">
                  {p.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business ROI Case Study: Mid-Size SaaS Company */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-700/50 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                <TrendingUp className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-black tracking-tight text-white">
                ROI Financial Scenario: Mid-Size SaaS Company
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Illustrative business case modeling monthly and annual net capital reclamation
            </p>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/20">
            Illustrative example — benchmark model
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-[10px] text-slate-300 uppercase block">Non-Prod Spend</span>
            <span className="text-xl font-extrabold font-mono text-white mt-1 block">$100,000/mo</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/30">
            <span className="text-[10px] text-amber-300 uppercase block">Estimated Idle Waste</span>
            <span className="text-xl font-extrabold font-mono text-amber-300 mt-1 block">$30,000/mo</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40">
            <span className="text-[10px] text-emerald-300 uppercase block">CloudPulse Savings</span>
            <span className="text-xl font-extrabold font-mono text-emerald-300 mt-1 block">$21,000/mo</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-[10px] text-slate-300 uppercase block">CloudPulse SaaS Fee</span>
            <span className="text-xl font-extrabold font-mono text-slate-200 mt-1 block">$5,000/mo</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border border-emerald-300/50">
            <span className="text-[10px] text-emerald-200 uppercase font-bold block">Net Monthly Saved</span>
            <span className="text-xl font-black font-mono text-emerald-200 mt-1 block">+$16,000/mo</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border border-emerald-300/50">
            <span className="text-[10px] text-emerald-200 uppercase font-bold block">Annual Net Savings</span>
            <span className="text-xl font-black font-mono text-emerald-200 mt-1 block">+$192,000/yr</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 border-t border-indigo-700/50 pt-3 gap-2">
          <span>Net Return on Investment: <strong className="text-emerald-300 font-mono text-sm">320% Projected ROI</strong></span>
          <Link
            href="/roi"
            className="flex items-center space-x-1 font-semibold text-emerald-300 hover:text-emerald-200 underline"
          >
            <span>Simulate Custom Footprint in ROI Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  )
}
