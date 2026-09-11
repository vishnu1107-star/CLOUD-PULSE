'use client'

import React, { useState } from 'react'
import { Layers, Server, Cpu, ShieldCheck, Zap, Ghost, Leaf, ArrowRight, CheckCircle2, ChevronRight, Terminal, Lock } from 'lucide-react'

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
      color: 'blue',
      description: 'Continuously queries AWS Boto3 SDK, GCP Compute API, and Kubernetes cluster namespaces. Dynamically parses tags (Environment: Production / Staging / Dev) to isolate mission-critical workloads.',
      codeFile: 'backend/app/engine/discovery.py',
      keyFeatures: [
        'Automatic isolation of Environment: Production (LOCKED)',
        'Multi-region discovery across us-east-1, us-west-2, etc.',
        'Kubernetes pod deployment & replica mapping'
      ]
    },
    {
      id: 'telemetry',
      num: '02',
      title: 'Multi-Signal Fusion',
      subtitle: '5D Anomaly AI Filter',
      icon: Cpu,
      color: 'indigo',
      description: 'Fuses CPU utilization (<2.0%), combined Network I/O (<10 KB/s), and active TCP socket connections (==0) across a rolling 30-minute window to verify genuine idle state.',
      codeFile: 'backend/app/engine/evaluator.py',
      keyFeatures: [
        '3-Signal Logical AND decision engine',
        'Rolling 30-minute time series moving average',
        'Developer grace period protection overrides'
      ]
    },
    {
      id: 'vaulting',
      num: '03',
      title: 'State Vaulting',
      subtitle: '30-Day Recovery Snapshot',
      icon: Lock,
      color: 'emerald',
      description: 'Automatically creates an AES-256 encrypted point-in-time state recovery snapshot prior to initiating any compute power adjustment.',
      codeFile: 'backend/app/engine/vault.py',
      keyFeatures: [
        'Pre-action state snapshot protection',
        '30-day point-in-time retention lifecycle',
        'Target: reversible rollback workflow'
      ]
    },
    {
      id: 'execution',
      num: '04',
      title: 'Autonomous Executor',
      subtitle: 'Safe Pausing & Ghost Reaper',
      icon: ShieldCheck,
      color: 'amber',
      description: 'Safely issues StopInstances API calls to idle VMs and scales K8s deployments down to 0 replicas. Simultaneously detects and sweeps unattached EBS storage and orphan Elastic IPs.',
      codeFile: 'backend/app/engine/executor.py',
      keyFeatures: [
        'Non-destructive EC2 / GCP instance pausing',
        'Kubernetes scale-to-zero replica management',
        'Unattached EBS and orphan Elastic IP cleaner'
      ]
    },
    {
      id: 'hydration',
      num: '05',
      title: 'Instant Hydration',
      subtitle: 'Warm Reactivation SLA',
      icon: Zap,
      color: 'teal',
      description: 'Warm restores workloads via Slack ChatOps command, 1-click Web UI button, or AI morning pre-warm schedule with sub-3s benchmark reactivation.',
      codeFile: 'backend/app/engine/hydration.py',
      keyFeatures: [
        '2.34s mean warm hydration (Repository benchmark)',
        'Slack & Webhook ChatOps integration',
        'Diurnal AI morning pre-warm schedule'
      ]
    }
  ]

  const current = stages.find((s) => s.id === selectedStage) || stages[0]
  const CurrentIcon = current.icon

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-8 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">
              End-to-End System Architecture Pipeline
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Modular multi-cloud autonomous closed-loop optimization architecture (AWS, GCP, K8s).
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
          Closed-Loop Engine Architecture
        </span>
      </div>

      {/* Interactive Stages Navigator */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {stages.map((stage) => {
          const isSelected = selectedStage === stage.id
          const Icon = stage.icon
          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-blue-50/60 border-blue-600 shadow-sm ring-1 ring-blue-500/30'
                  : 'bg-gray-50/70 border-gray-200 hover:bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-gray-400">{stage.num}</span>
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">{stage.title}</h4>
                <p className="text-[10px] text-gray-500 mt-0.5 truncate">{stage.subtitle}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Stage Detail Panel */}
      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white">
              <CurrentIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-blue-600 font-bold block">
                Stage {current.num} Pipeline Module
              </span>
              <h3 className="text-base font-bold text-gray-900">
                {current.title} — {current.subtitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-[11px] font-mono text-gray-600 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
            <Terminal className="w-3.5 h-3.5 text-gray-400" />
            <span>{current.codeFile}</span>
          </div>
        </div>

        <p className="text-xs text-gray-700 leading-relaxed">
          {current.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {current.keyFeatures.map((feat, i) => (
            <div key={i} className="p-3 bg-white rounded-xl border border-gray-200 flex items-start space-x-2 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-gray-800 font-medium">{feat}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
