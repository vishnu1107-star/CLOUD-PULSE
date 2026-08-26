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
  Info
} from 'lucide-react'

export function LandingSolution() {
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = [
    {
      id: 'telemetry',
      step: '01',
      title: 'Telemetry',
      action: 'Multi-Signal Fusion',
      icon: Cpu,
      color: 'cyan',
      badge: '<350ns RISC-V Edge Probe',
      desc: 'Samples 5D telemetry: CPU (<2.0%), Network I/O (<10KB/s), disk IOPS, and active TCP socket connections (==0) over a 30-min moving window.',
      details: [
        'Rolling 30-minute time-series moving average',
        'Hardware socket gate prevents killing active sessions',
        'Noise decimation via C-DAC VEGA RISC-V pre-filter'
      ]
    },
    {
      id: 'detect',
      step: '02',
      title: 'Detect',
      action: 'Isolation Forest AI',
      icon: Search,
      color: 'purple',
      badge: '95.3% Benchmark Accuracy',
      desc: 'Unsupervised ML isolates genuine TRUE_IDLE workloads from ACTIVE_QUIET states (such as locked DBs, CI/CD runners, or active SSH debugging).',
      details: [
        '5-Dimensional anomaly outlier scoring',
        'Distinguishes background heartbeat from real jobs',
        'Zero false-positive outages in 72k evaluations'
      ]
    },
    {
      id: 'vault',
      step: '03',
      title: 'Vault',
      action: 'Point-in-Time Backup',
      icon: Lock,
      color: 'emerald',
      badge: '30-Day Automated Vault',
      desc: 'Takes an instantaneous EBS/Persistent Disk snapshot before initiating state transitions or orphan resource reclamation for guaranteed rollback.',
      details: [
        'Zero-risk rollback guarantee',
        'Automated 30-day point-in-time retention',
        '1-click instant disk restore capability'
      ]
    },
    {
      id: 'reclaim',
      step: '04',
      title: 'Reclaim',
      action: 'Autonomous Execution',
      icon: RefreshCw,
      color: 'amber',
      badge: 'Non-Destructive Pausing',
      desc: 'Issues non-destructive StopInstances API calls and scales K8s deployments down to 0 replicas. Sweeps unattached disks & orphan Elastic IPs.',
      details: [
        'Cuts compute and RAM costs to $0.00/hr',
        'Preserves root filesystem & network elastic IPs',
        'Kubernetes pod scale-to-zero automation'
      ]
    },
    {
      id: 'hydrate',
      step: '05',
      title: 'Hydrate',
      action: 'Sub-3s Warm Wakeup',
      icon: Zap,
      color: 'emerald',
      badge: '< 2.34s Latency',
      desc: 'Environments instantly warm-start via 1-click Web UI button, Slack ChatOps command (/cloudpulse wakeup), or AI predictive pre-hydration at 08:30 AM.',
      details: [
        'Mean re-activation speed: 2.34 seconds',
        'Slack & Discord ChatOps webhook integration',
        'Autoregressive diurnal AI morning pre-warm'
      ]
    }
  ]

  const current = steps[activeStep]
  const IconCurrent = current.icon

  return (
    <section id="solution-section" className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Closed-Loop Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The 5-Stage Autonomous FinOps Loop
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          How CloudPulse autonomously executes cost reclamation with sub-second precision and 100% reversible safety.
        </p>
      </div>

      {/* Safety Principle Banner Highlight */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-cyan-950/70 border border-emerald-500/40 p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Core Architectural Invariant
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              Safety Principle:{' '}
              <span className="text-emerald-300 italic">
                “Every action is reversible — wrong decisions are cheap to undo.”
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 bg-slate-950/70 px-3.5 py-2 rounded-xl border border-slate-800 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Zero-State-Loss Guarantee</span>
        </div>
      </div>

      {/* 5-Step Visual Loop Diagram (Horizontal Pipeline / Cards) */}
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
                  ? 'bg-slate-800/95 border-emerald-400 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/30 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">{item.step}</span>
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{item.action}</p>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className="font-mono text-emerald-400 font-semibold">{item.badge}</span>
                <ArrowRight className={`w-3 h-3 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`} />
              </div>
            </button>
          )
        })}
      </div>

      {/* Deep-Dive Step Inspector */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <IconCurrent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Step {current.step} Execution</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{current.badge}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{current.title} — {current.action}</h3>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            Pipeline Stage: {activeStep + 1} / 5
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {current.desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {current.details.map((point, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start space-x-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-slate-200">{point}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
