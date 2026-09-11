'use client'

import React from 'react'
import { 
  Cpu, 
  Activity, 
  Brain, 
  SlidersHorizontal, 
  ShieldCheck, 
  Lock, 
  PauseCircle, 
  MessageSquare, 
  RotateCcw, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronRight
} from 'lucide-react'

export type PipelineStageId = 
  | 'vega'
  | 'telemetry'
  | 'tinyml'
  | 'isolation_forest'
  | 'safety_gate'
  | 'vault'
  | 'reclaim'
  | 'slack'
  | 'hydrate'

export interface PipelineVisualizerProps {
  activeStage?: PipelineStageId
  completedStages?: PipelineStageId[]
  isBlocked?: boolean
  blockReason?: string
  liveHydrationSeconds?: number | null
  activeScenario?: string
  onStageClick?: (stage: PipelineStageId) => void
}

export function PipelineVisualizer({
  activeStage = 'vega',
  completedStages = [],
  isBlocked = false,
  blockReason,
  liveHydrationSeconds,
  activeScenario,
  onStageClick
}: PipelineVisualizerProps) {

  const stages: Array<{
    id: PipelineStageId
    name: string
    shortLabel: string
    icon: any
    activeDesc: string
    subtext: string
  }> = [
    {
      id: 'vega',
      name: 'VEGA Aries',
      shortLabel: 'VEGA',
      icon: Cpu,
      activeDesc: 'C-DAC RISC-V SoC Active',
      subtext: '100MHz • THEJAS32'
    },
    {
      id: 'telemetry',
      name: 'Telemetry Stream',
      shortLabel: 'TELEMETRY',
      icon: Activity,
      activeDesc: 'Multi-Signal Frame Stream',
      subtext: '16-byte packed frame'
    },
    {
      id: 'tinyml',
      name: 'TinyML Pre-Filter',
      shortLabel: 'TinyML',
      icon: Zap,
      activeDesc: 'On-Device Edge Filtering',
      subtext: '14.2 µs latency'
    },
    {
      id: 'isolation_forest',
      name: 'Isolation Forest',
      shortLabel: 'ANOMALY ML',
      icon: Brain,
      activeDesc: 'Multi-Signal Evaluation',
      subtext: 'Contamination: 8%'
    },
    {
      id: 'safety_gate',
      name: 'Safety Gate',
      shortLabel: 'SAFETY GATE',
      icon: ShieldCheck,
      activeDesc: isBlocked ? 'Blocked by Socket Guard' : 'Multi-Signal Pass',
      subtext: 'Sockets == 0 verified'
    },
    {
      id: 'vault',
      name: 'Vault Snapshot',
      shortLabel: 'VAULT',
      icon: Lock,
      activeDesc: 'SHA-256 State Secured',
      subtext: 'Reversible point-in-time'
    },
    {
      id: 'reclaim',
      name: 'Resource Reclaim',
      shortLabel: 'RECLAIM',
      icon: PauseCircle,
      activeDesc: 'Spend Paused to $0.00',
      subtext: 'Non-destructive stop'
    },
    {
      id: 'slack',
      name: 'Slack ChatOps',
      shortLabel: 'SLACK',
      icon: MessageSquare,
      activeDesc: '/cloudpulse wakeup',
      subtext: 'Instant ChatOps trigger'
    },
    {
      id: 'hydrate',
      name: 'Live Hydration',
      shortLabel: 'HYDRATE',
      icon: RotateCcw,
      activeDesc: liveHydrationSeconds ? `Restored in ${liveHydrationSeconds.toFixed(2)}s` : 'Container State Resumed',
      subtext: liveHydrationSeconds ? `${liveHydrationSeconds.toFixed(2)}s [LIVE MEASURED]` : 'Zero data loss'
    }
  ]

  const getStageStatus = (id: PipelineStageId) => {
    if (id === 'safety_gate' && isBlocked) return 'blocked'
    if (completedStages.includes(id)) return 'completed'
    if (activeStage === id) return 'active'
    return 'pending'
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-white shadow-2xl space-y-6">
      
      {/* Header with Title and Mode Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="inline-flex items-center justify-center p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Zap className="w-5 h-5 text-blue-400 fill-blue-400/20" />
            </span>
            <div>
              <div className="flex items-center space-x-2.5">
                <h3 className="text-lg font-black tracking-tight text-white uppercase">
                  End-to-End Autonomous Control Pipeline
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                  DETECT → PROTECT → RECLAIM → HYDRATE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                VEGA RISC-V edge telemetry to reversible state recovery loop.
              </p>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-wrap items-center gap-2">
          {activeScenario && (
            <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold">
              Scenario: {activeScenario}
            </span>
          )}
          {liveHydrationSeconds ? (
            <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>HYDRATION: {liveHydrationSeconds.toFixed(2)}s [LIVE MEASURED]</span>
            </span>
          ) : (
            <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
              Target Hydration: &lt; 3.0s
            </span>
          )}
        </div>
      </div>

      {/* Hero Pipeline Flow Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
        {stages.map((stage, idx) => {
          const status = getStageStatus(stage.id)
          const Icon = stage.icon

          let bgClasses = 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
          let iconColor = 'text-slate-500'
          let badgeText = 'PENDING'
          let badgeClass = 'bg-slate-800 text-slate-500'

          if (status === 'completed') {
            bgClasses = 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-900/20'
            iconColor = 'text-emerald-400'
            badgeText = '✓ PASSED'
            badgeClass = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          } else if (status === 'active') {
            bgClasses = 'bg-blue-950/40 border-blue-500 text-blue-200 ring-2 ring-blue-500/20 shadow-lg shadow-blue-900/30 animate-pulse'
            iconColor = 'text-blue-400'
            badgeText = '● ACTIVE'
            badgeClass = 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
          } else if (status === 'blocked') {
            bgClasses = 'bg-red-950/40 border-red-500 text-red-200 ring-2 ring-red-500/20 shadow-lg shadow-red-900/30'
            iconColor = 'text-red-400'
            badgeText = '✗ BLOCKED'
            badgeClass = 'bg-red-500/20 text-red-300 border border-red-500/40'
          }

          return (
            <div
              key={stage.id}
              onClick={() => onStageClick && onStageClick(stage.id)}
              className={`relative flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${bgClasses}`}
            >
              {/* Step Number & Badge */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-mono text-slate-500 font-bold">0{idx + 1}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${badgeClass}`}>
                  {badgeText}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="space-y-1.5 my-1">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
                  <div className="text-xs font-bold truncate text-white">{stage.shortLabel}</div>
                </div>
                <div className="text-[10px] text-slate-400 leading-tight truncate">
                  {status === 'blocked' ? 'Active Sockets!' : stage.activeDesc}
                </div>
              </div>

              {/* Subtext */}
              <div className="text-[9px] font-mono text-slate-500 pt-2 border-t border-slate-800/60 mt-1 truncate">
                {stage.subtext}
              </div>
            </div>
          )
        })}
      </div>

      {/* Contextual Notice Banner (Shows Why Blocked or Highlights Protection) */}
      {isBlocked && (
        <div className="flex items-start space-x-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-bold text-amber-300">
              SAFETY GATE INTERACTION — RECLAMATION SAFELY PREVENTED
            </div>
            <p className="text-amber-200/90 leading-relaxed">
              {blockReason || 'Active socket detected (3 open connections). Resource protected from shutdown.'}
            </p>
            <div className="text-[11px] font-mono text-amber-300/70 pt-1">
              Safety Principle: CloudPulse never pauses a workload merely because CPU is low.
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
