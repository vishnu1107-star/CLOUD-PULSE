'use client'

import React, { useState } from 'react'
import { 
  Cpu, 
  Search, 
  Lock, 
  RefreshCw, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Info,
  Layers,
  RotateCcw,
  Activity,
  HardDrive
} from 'lucide-react'

export function LandingSolution() {
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = [
    {
      id: 'telemetry',
      step: '01',
      title: 'TELEMETRY',
      subtitle: 'CPU + Network + Sockets + IOPS',
      icon: Cpu,
      badge: '5D Signal Fusion',
      color: 'blue',
      summary: 'Continuous 5-dimensional workload monitoring across compute, bandwidth, TCP connections, and disk activity.',
      points: [
        'CPU Utilization (< 2.0% rolling threshold)',
        'Network I/O Throughput (< 10 KB/s transfer)',
        'Active Sockets (0 TCP connections gate)',
        'Disk IOPS (Dormant read/write profile)'
      ]
    },
    {
      id: 'detect',
      step: '02',
      title: 'DETECT',
      subtitle: 'Multi-signal Anomaly Detection (TinyML / Isolation Forest)',
      icon: Search,
      badge: 'TinyML / Isolation Forest',
      color: 'indigo',
      summary: 'Unsupervised ML evaluates 5D metrics to classify TRUE_IDLE states while preserving active background workers and locked DBs.',
      points: [
        'Multi-signal anomaly detection scoring',
        'Separates TRUE_IDLE from ACTIVE_QUIET sessions',
        'Hardware Socket Guard prevents accidental outages',
        '0 false-outage events in 72,000 benchmark evaluations'
      ]
    },
    {
      id: 'vault',
      step: '03',
      title: 'VAULT',
      subtitle: 'Snapshot Before Action (30-Day Snapshot Concept)',
      icon: Lock,
      badge: '30-Day Recovery Vault',
      color: 'emerald',
      summary: 'Automated point-in-time state recovery snapshots taken before any power adjustments occur.',
      points: [
        'Snapshot before action — state recovery workflow',
        '30-day point-in-time retention lifecycle',
        'AES-256 encrypted disaster recovery backup',
        '1-Click automated volume restoration'
      ]
    },
    {
      id: 'reclaim',
      step: '04',
      title: 'RECLAIM',
      subtitle: 'Hibernate VMs • Scale K8s Workloads • Identify Ghost Resources',
      icon: RefreshCw,
      badge: 'Non-Destructive Pausing',
      color: 'amber',
      summary: 'Safely powers down dormant non-production compute and purges unattached orphan cloud assets.',
      points: [
        'Hibernate & pause AWS EC2 / GCP Compute instances',
        'Scale Kubernetes non-prod deployments to 0 replicas',
        'Sweep unattached EBS storage & orphan Elastic IPs',
        'Cuts non-production spend by 45–70% during off-hours'
      ]
    },
    {
      id: 'hydrate',
      step: '05',
      title: 'HYDRATE',
      subtitle: 'Warm Restore • Web UI / ChatOps Trigger • Fast Reactivation',
      icon: Zap,
      badge: '2.34s Benchmark',
      color: 'teal',
      summary: 'Instant sub-3s warm workload re-activation with zero developer cold-start friction.',
      points: [
        'Warm restore from dormant state in seconds',
        'Trigger via Web UI button, Slack (/cloudpulse wakeup), or API',
        'Autoregressive diurnal AI morning pre-hydration at 08:45 AM',
        'Mean re-activation speed: 2.34s repository benchmark'
      ]
    }
  ]

  const current = steps[activeStep]
  const IconCurrent = current.icon

  return (
    <section id="solution-section" className="space-y-6 pt-6 border-t border-gray-200 text-gray-900">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Core Closed-Loop Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            How CloudPulse Works: The 5-Stage Loop
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md">
          How CloudPulse demonstrates safe, reversible cost reclamation through a 5-stage workflow.
        </p>
      </div>

      {/* Safety Message Highlight (Prompt #7) */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-blue-50 to-indigo-50 border border-emerald-200 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-sm shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold">
              Core Architectural Invariant
            </span>
            <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
              Safety Principle:{' '}
              <span className="text-emerald-800 font-semibold italic">
                “Make a wrong decision cheap and quick to undo.”
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 bg-white px-4 py-2.5 rounded-2xl border border-emerald-200 shadow-sm whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Every Action is Reversible</span>
        </div>
      </div>

      {/* 5-Step Visual Loop Interactive Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {steps.map((item, idx) => {
          const isSelected = activeStep === idx
          const Icon = item.icon

          return (
            <button
              key={item.id}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 relative flex flex-col justify-between border ${
                isSelected
                  ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20 scale-[1.02]'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xs'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-gray-400">{item.step}</span>
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 tracking-tight">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{item.subtitle}</p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
                <span className="font-mono text-blue-600 font-semibold">{item.badge}</span>
                <ArrowRight className={`w-3 h-3 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
              </div>
            </button>
          )
        })}
      </div>

      {/* Deep-Dive Step Inspector for Selected Stage */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <IconCurrent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono uppercase text-blue-600 font-bold">Stage {current.step}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-mono font-medium">{current.badge}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{current.title} — {current.subtitle}</h3>
            </div>
          </div>

          <div className="text-xs font-mono text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
            Pipeline Stage: {activeStep + 1} / 5
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          {current.summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {current.points.map((point, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-start space-x-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-gray-800 font-medium">{point}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
