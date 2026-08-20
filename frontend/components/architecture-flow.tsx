'use client'

import React, { useState } from 'react'
import { Layers, Server, Cpu, ShieldCheck, Zap, Ghost, Leaf, ArrowRight, CheckCircle2, ChevronRight, Terminal } from 'lucide-react'

interface Stage {
  id: string
  num: string
  title: string
  subtitle: string
  icon: any
  color: string
  description: string
  codeFile: string
  keyFeatures: string[]
}

export function ArchitectureFlow() {
  const [selectedStage, setSelectedStage] = useState<string>('telemetry')

  const stages: Stage[] = [
    {
      id: 'discovery',
      num: '01',
      title: 'Tag-Aware Discovery',
      subtitle: 'Multi-Cloud Asset Harvester',
      icon: Server,
      color: 'emerald',
      description: 'Continuously queries AWS Boto3 SDK, GCP Compute API, and Kubernetes cluster namespaces. Dynamically parses tags (Environment: Production / Staging / Dev) to isolate mission-critical workloads.',
      codeFile: 'backend/app/engine/discovery.py',
      keyFeatures: [
        'Automatic isolation of Environment: Production',
        'Multi-region discovery across us-east-1, us-west-2, etc.',
        'Kubernetes pod deployment & replica mapping'
      ]
    },
    {
      id: 'telemetry',
      num: '02',
      title: 'Multi-Signal Fusion',
      subtitle: 'Zero-False-Positive AI Filter',
      icon: Cpu,
      color: 'cyan',
      description: 'Fuses CPU utilization (<2.0%), combined Network I/O (<10 KB/s), and active TCP/HTTP connection sockets (==0) across a rolling 30-minute window to verify genuine idle state.',
      codeFile: 'backend/app/engine/evaluator.py',
      keyFeatures: [
        '3-Signal Logical AND decision engine',
        'Rolling 30-minute time series moving average',
        'Developer grace period protection overrides'
      ]
    },
    {
      id: 'execution',
      num: '03',
      title: 'Autonomous Executor',
      subtitle: 'Zero-Downtime Pausing & Ghost Reaper',
      icon: ShieldCheck,
      color: 'violet',
      description: 'Safely issues StopInstances API calls to idle VMs and scales K8s deployments down to 0 replicas. Simultaneously detects and sweeps unattached EBS storage and orphan Elastic IPs.',
      codeFile: 'backend/app/engine/executor.py',
      keyFeatures: [
        'Non-destructive instance pausing (EBS preserved)',
        'Kubernetes kubectl scale --replicas=0 automation',
        'Automatic 30-day snapshot backups before disk purge'
      ]
    },
    {
      id: 'hydration',
      num: '04',
      title: 'Warm Hydration Protocol',
      subtitle: 'Sub-3-Second Developer Wake-Up',
      icon: Zap,
      color: 'amber',
      description: 'Provides 1-click Web UI re-activation and Slack Slash command webhook integration (/cloudpulse wakeup staging). Restores paused environments in <2.8s with zero developer friction.',
      codeFile: 'backend/app/api/v1/endpoints/hooks.py',
      keyFeatures: [
        'Sub-3.0s warm instance start latency',
        'Slack & Discord ChatOps webhook receiver',
        'Configurable developer grace windows (1-8 hours)'
      ]
    },
    {
      id: 'carbon',
      num: '05',
      title: 'FinOps & ESG Ledger',
      subtitle: 'Verifiable Carbon Accounting',
      icon: Leaf,
      color: 'emerald',
      description: 'Computes dollar savings against on-demand cloud rate cards and translates idle kilowatt-hours saved into verifiable greenhouse gas offsets (kg CO₂ avoided) for ESG compliance.',
      codeFile: 'backend/app/engine/analytics.py',
      keyFeatures: [
        'Real-time financial savings ledger ($ USD)',
        'ESG Carbon factor: 0.20 kW × 0.385 kg CO2/kWh',
        'SDG 9, 12, and 13 sustainability alignment'
      ]
    }
  ]

  const active = stages.find(s => s.id === selectedStage) || stages[0]

  return (
    <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur-md p-6 shadow-2xl space-y-8">
      
      {/* Header */}
      <div className="border-b border-border pb-5">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">System Architecture & Autonomous Control Loop</h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Interactive end-to-end pipeline visualization of the CloudPulse Autonomous FinOps & Instant Hydration Engine.
        </p>
      </div>

      {/* 5-Stage Interactive Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {stages.map((stage, idx) => {
          const isSelected = stage.id === selectedStage
          const Icon = stage.icon
          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 relative ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-bold text-slate-400">{stage.num}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
              </div>

              <div className="flex items-center space-x-2 mb-1">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="font-bold text-white text-xs truncate">{stage.title}</span>
              </div>

              <p className="text-[11px] text-slate-400 truncate">{stage.subtitle}</p>
            </button>
          )
        })}
      </div>

      {/* Deep-Dive Active Stage Details Card */}
      <div className="p-6 rounded-2xl bg-slate-950/80 border border-border space-y-6 animate-in fade-in duration-200">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 border border-slate-700">
              <active.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Stage {active.num} Deep Dive
              </span>
              <h3 className="text-lg font-extrabold text-white">{active.title} — {active.subtitle}</h3>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{active.codeFile}</span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">{active.description}</p>

        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Engineering Capabilities:</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {active.keyFeatures.map((feat, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-start space-x-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">{feat}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
