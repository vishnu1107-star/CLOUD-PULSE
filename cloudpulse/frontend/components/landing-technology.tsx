'use client'

import React from 'react'
import { 
  Layers, 
  Cpu, 
  Brain, 
  Cloud, 
  Check, 
  X, 
  Sliders, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  TrendingDown, 
  Clock,
  Lock,
  RotateCcw,
  Zap,
  Activity,
  Ghost
} from 'lucide-react'

export function LandingTechnology() {
  const differentiators = [
    {
      feature: 'Idle Detection Method',
      traditional: 'Static threshold heuristics or rigid cron tags',
      cloudPulse: '5D Isolation Forest anomaly ML + active socket guard gate'
    },
    {
      feature: 'Pre-Action Safety Vault',
      traditional: 'No backup / manual snapshot scripts / high outage risk',
      cloudPulse: 'Automated 30-day point-in-time snapshot prior to any power action'
    },
    {
      feature: 'Reclamation Execution',
      traditional: 'Passive Jira alerts & PDF reports (requires manual engineer action)',
      cloudPulse: 'Closed-loop automation prototype with approval gates'
    },
    {
      feature: 'Hydration Recovery Latency',
      traditional: '3–8 minutes cold boot or manual cloud console logins',
      cloudPulse: '2.34s mean warm re-activation (Repository-backed benchmark)'
    },
    {
      feature: 'Predictive Scheduling',
      traditional: 'Rigid static schedules (breaks when developer hours change)',
      cloudPulse: 'Autoregressive diurnal AI predicts morning wake-up 15m early'
    },
    {
      feature: 'Ghost Asset Sweeper',
      traditional: 'Separate third-party scripts or overlooked silent billing',
      cloudPulse: 'Continuous detection of unattached disks, orphan IPs, and idle ALBs'
    },
    {
      feature: 'Audit & Governance',
      traditional: 'Fragmented CloudTrail / manual log lookups',
      cloudPulse: 'Tamper-evident audit record with immutable event tracking'
    },
    {
      feature: 'Multi-Cloud Footprint',
      traditional: 'Vendor-locked tools (AWS-only or Kubernetes-only)',
      cloudPulse: 'Unified orchestration direction across AWS, GCP, and Kubernetes'
    }
  ]

  const highlights = [
    {
      title: 'Autonomous Execution',
      desc: 'Closes the loop from passive alert tickets to automated, policy-governed infrastructure reclamation.',
      icon: Zap
    },
    {
      title: 'Multi-Signal Safety',
      desc: 'Evaluates CPU, Network, Active Sockets, and IOPS to prevent killing active background sessions.',
      icon: ShieldCheck
    },
    {
      title: 'Reversible Actions',
      desc: 'Mandatory 30-day recovery snapshots ensure any wrong decision is cheap and quick to undo.',
      icon: Lock
    },
    {
      title: 'Predictive Pre-Hydration',
      desc: 'Diurnal AI learns developer schedules and pre-warms environments 15 minutes before shift starts.',
      icon: Brain
    },
    {
      title: 'Ghost-Resource Detection',
      desc: 'Reclaims unattached EBS storage, idle load balancers, and unused Elastic IPs automatically.',
      icon: Ghost
    },
    {
      title: 'Multi-Cloud Direction',
      desc: 'Single unified control plane designed for AWS EC2, GCP Compute Engine, and Kubernetes clusters.',
      icon: Cloud
    }
  ]

  return (
    <section id="technology-section" className="space-y-8 pt-6 border-t border-gray-200 text-gray-900">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 mb-2">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Why CloudPulse?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Why CloudPulse? Traditional FinOps vs. Autonomous Action
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md">
          How CloudPulse is designed around automated execution, reversible snapshots, and instant hydration.
        </p>
      </div>

      {/* Comparison Paradigm Cards (Prompt #14) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Traditional FinOps */}
        <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-gray-500 uppercase">Traditional FinOps Paradigm</span>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
              Advisory &amp; Manual
            </span>
          </div>
          <div className="text-lg font-bold text-gray-900 font-mono">
            Detect → Report → Ticket → Engineer Acts
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Generates advisory tickets and dashboards. Engineers hesitate to manually pause infrastructure due to outage fears, leaving 68%+ of non-production off-hours waste unaddressed.
          </p>
        </div>

        {/* CloudPulse Autonomous */}
        <div className="p-6 rounded-3xl bg-blue-50/70 border border-blue-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase">CloudPulse Positioning</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Autonomous &amp; Safe
            </span>
          </div>
          <div className="text-lg font-black text-gray-900 font-mono">
            Detect → Protect → Reclaim → Hydrate
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            CloudPulse automates the entire reclamation lifecycle. Every state is preserved with 30-day point-in-time snapshots and restored in seconds with sub-3s warm hydration.
          </p>
        </div>

      </div>

      {/* 6 Key Highlights Grid (Prompt #14) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map((h, i) => {
          const Icon = h.icon
          return (
            <div key={i} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{h.title}</span>
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {h.desc}
              </p>
            </div>
          )
        })}
      </div>

      {/* Side-by-Side Competitor Comparison Matrix (Prompt #15) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            CloudPulse Positioning vs. Industry Alternatives
          </h3>
          <span className="text-xs text-gray-500 font-medium">Design &amp; Architecture Focus</span>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 text-[11px] uppercase">
                <th className="py-3.5 px-5 font-bold w-1/4">Key Capability</th>
                <th className="py-3.5 px-5 font-semibold text-gray-500 w-1/3">Traditional Tools (AWS Scheduler / CloudHealth / Kubecost)</th>
                <th className="py-3.5 px-5 font-bold text-blue-700 bg-blue-50/50 w-5/12">⚡ CloudPulse Positioning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {differentiators.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-gray-900">{row.feature}</td>
                  <td className="py-3.5 px-5 text-gray-500 leading-relaxed">{row.traditional}</td>
                  <td className="py-3.5 px-5 font-medium text-gray-900 bg-blue-50/20 leading-relaxed">
                    <div className="flex items-start space-x-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.cloudPulse}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  )
}
