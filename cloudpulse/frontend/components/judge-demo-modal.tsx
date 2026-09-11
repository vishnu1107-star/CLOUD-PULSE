'use client'

import React, { useState, useEffect } from 'react'
import { 
  Sparkles, 
  X, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Zap, 
  DollarSign, 
  Clock, 
  Lock,
  ArrowRight,
  RefreshCw,
  Activity,
  Layers,
  ChevronRight,
  TrendingDown
} from 'lucide-react'

interface JudgeDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function JudgeDemoModal({ isOpen, onClose }: JudgeDemoModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)

  // 8-stage Demo steps requested in Prompt #8 & #20
  const steps = [
    {
      id: 'step-1',
      title: '1. Idle Resource Detected',
      statusLabel: 'DETECTED',
      badge: 'Multi-Signal Discovery',
      color: 'blue',
      desc: 'Workload staging-api-cluster (12 pods, 3 AWS EC2 instances) has maintained <1.2% CPU and zero active TCP network sockets for 45 minutes.',
      details: [
        { label: 'Cloud & Region', value: 'AWS us-east-1 (Staging)' },
        { label: 'Telemetry Signals', value: 'CPU: 1.1%, Net: 3 KB/s, Sockets: 0, IOPS: 2' },
        { label: 'Anomaly Isolation Score', value: '-0.42 (High Idle Confidence: 98.6%)' }
      ]
    },
    {
      id: 'step-2',
      title: '2. Multi-Signal Safety Check',
      statusLabel: '✓ SAFETY CHECK PASSED',
      badge: 'Socket Guard Active',
      color: 'emerald',
      desc: 'Evaluates socket guard gate and environment locks. Confirms environment is Staging (Non-Prod) and no long-running batch or SSH session is active.',
      details: [
        { label: 'Environment Policy', value: 'Non-Production (Allowed for Reclamation)' },
        { label: 'Hardware Socket Gate', value: '0 Active Connections Verified' },
        { label: 'Safety Principle', value: 'Every automated action is reversible' }
      ]
    },
    {
      id: 'step-3',
      title: '3. Point-in-Time Snapshot Created',
      statusLabel: '✓ SNAPSHOT CREATED',
      badge: '30-Day Recovery Vault',
      color: 'indigo',
      desc: 'Takes an automated point-in-time state recovery snapshot (vault-snap-7482) before any power action. Preserves filesystem, environment variables, and storage.',
      details: [
        { label: 'Snapshot ID', value: 'vault-snap-7482 (AES-256 Encrypted)' },
        { label: 'Volume Size', value: '120 GB Persistent Disk State' },
        { label: 'Retention Policy', value: '30-Day Point-in-Time Automated Rollback' }
      ]
    },
    {
      id: 'step-4',
      title: '4. Resource Reclaimed',
      statusLabel: '✓ RESOURCE RECLAIMED',
      badge: 'Non-Destructive Pause',
      color: 'amber',
      desc: 'Issues non-destructive StopInstances API command and scales Kubernetes deployment replicas to 0. Unused compute shuts down safely.',
      details: [
        { label: 'Action Taken', value: 'EC2 Instances Paused • K8s Scale to 0' },
        { label: 'State Preservation', value: 'Zero disk wipe • IP allocations held' },
        { label: 'Outage Risk', value: '0.00% Outage Risk (1-click reversible)' }
      ]
    },
    {
      id: 'step-5',
      title: '5. Cost Reduced',
      statusLabel: '✓ COST REDUCED',
      badge: 'Active Reclamation',
      color: 'emerald',
      desc: 'Compute and RAM burn rate immediately drops to $0.00/hr while dormant. Accumulates direct recurring bottom-line savings.',
      details: [
        { label: 'Daily Savings', value: '+$14.70 / day ($441 / month)' },
        { label: 'Fleet Projection', value: '45–70% non-prod bill reduction' },
        { label: 'Benchmark Label', value: 'Simulated 100-instance fleet benchmark' }
      ]
    },
    {
      id: 'step-6',
      title: '6. Restore Requested',
      statusLabel: '✓ RESTORE REQUESTED',
      badge: 'Developer Demand',
      color: 'blue',
      desc: 'Developer triggers warm start via Slack ChatOps (/cloudpulse wakeup), Web UI button, or AI diurnal schedule at 8:45 AM.',
      details: [
        { label: 'Trigger Channel', value: 'Slack ChatOps Webhook / Web UI / Scheduled' },
        { label: 'Target State', value: 'Full Staging Fleet Warm Hydration' },
        { label: 'Pre-flight Check', value: 'Routing DNS & Snapshot attachment verified' }
      ]
    },
    {
      id: 'step-7',
      title: '7. Resource Hydrated',
      statusLabel: '✓ HYDRATED',
      badge: '2.34s Benchmark',
      color: 'teal',
      desc: 'Warm instances boot, Kubernetes pods scale back to target replicas, load balancers re-attach, and health probes turn green in ~2.34s.',
      details: [
        { label: 'Mean Hydration Latency', value: '2.34s (Repository-backed benchmark)' },
        { label: 'Health Status', value: 'HTTP 200 OK — Ready for developer traffic' },
        { label: 'Developer Delay', value: '0.0s cold-start friction' }
      ]
    },
    {
      id: 'step-8',
      title: '8. Workload Available Again',
      statusLabel: '✓ WORKLOAD AVAILABLE',
      badge: 'Loop Complete',
      color: 'emerald',
      desc: 'The complete closed-loop cycle is recorded in the immutable audit ledger. Workload is fully online — snapshot-protected rollback remains available for 30 days.',
      details: [
        { label: 'Total Saved During Idle', value: '$29.40 (Weekend dormancy)' },
        { label: 'Audit Record', value: 'Tamper-evident record hash: 0x9B2C...41F' },
        { label: 'Net Business Outcome', value: 'Reversible cloud cost reclamation achieved' }
      ]
    }
  ]

  // Timer for automated 60-second video playback
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isOpen && isPlaying && currentStep < steps.length) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentStep((s) => (s < steps.length - 1 ? s + 1 : s))
            return 0
          }
          return prev + 5
        })
      }, 180)
    }
    return () => clearInterval(interval)
  }, [isOpen, isPlaying, currentStep, steps.length])

  if (!isOpen) return null

  const step = steps[currentStep]
  const isFinalStep = currentStep === steps.length - 1

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-gray-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto text-gray-900">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  ▶ CloudPulse Autonomous Demonstration
                </h3>
                <span className="text-[10px] font-mono font-bold bg-white/20 text-emerald-300 px-2 py-0.5 rounded-full">
                  Prototype Demo (Simulated Fleet)
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                8-Stage Closed-Loop Cost Reclamation &amp; Instant Hydration Flow
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 8-Stage Progress Step Indicator Bar */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-700">
              Stage {currentStep + 1} of {steps.length}: <span className="text-blue-600 font-mono">{step.statusLabel}</span>
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-xs font-semibold text-gray-600 hover:text-gray-900 px-2.5 py-1 rounded-lg bg-white border border-gray-200 shadow-xs"
              >
                {isPlaying ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={() => {
                  setCurrentStep(0)
                  setProgress(0)
                  setIsPlaying(true)
                }}
                className="text-xs font-semibold text-gray-600 hover:text-gray-900 px-2.5 py-1 rounded-lg bg-white border border-gray-200 shadow-xs"
              >
                Restart
              </button>
            </div>
          </div>

          {/* 8 Progress Segments */}
          <div className="grid grid-cols-8 gap-1.5">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentStep(idx)
                  setProgress(0)
                }}
                className={`h-2 rounded-full transition-all relative overflow-hidden ${
                  idx < currentStep
                    ? 'bg-emerald-500'
                    : idx === currentStep
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                }`}
                title={s.title}
              >
                {idx === currentStep && isPlaying && (
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-emerald-400 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Status Timeline Pills */}
          <div className="hidden sm:grid grid-cols-8 gap-1 text-center pt-2 text-[9px] font-mono text-gray-500">
            <span className={currentStep === 0 ? 'text-blue-700 font-bold' : ''}>DETECT</span>
            <span className={currentStep === 1 ? 'text-emerald-700 font-bold' : ''}>SAFETY</span>
            <span className={currentStep === 2 ? 'text-indigo-700 font-bold' : ''}>SNAPSHOT</span>
            <span className={currentStep === 3 ? 'text-amber-700 font-bold' : ''}>RECLAIM</span>
            <span className={currentStep === 4 ? 'text-emerald-700 font-bold' : ''}>SAVINGS</span>
            <span className={currentStep === 5 ? 'text-blue-700 font-bold' : ''}>RESTORE</span>
            <span className={currentStep === 6 ? 'text-teal-700 font-bold' : ''}>HYDRATE</span>
            <span className={currentStep === 7 ? 'text-emerald-700 font-bold' : ''}>ONLINE</span>
          </div>
        </div>

        {/* Active Step Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {step.statusLabel}
              </span>
              <span className="text-xs font-semibold text-gray-500">
                {step.badge}
              </span>
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {step.title}
            </h4>

            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-200">
              {step.desc}
            </p>
          </div>

          {/* Technical Telemetry Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {step.details.map((d, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white border border-gray-200 space-y-1 shadow-xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  {d.label}
                </span>
                <span className="text-xs font-bold text-gray-900 font-mono block">
                  {d.value}
                </span>
              </div>
            ))}
          </div>

          {/* Final Screen: Prompt #20 Judge Summary */}
          {isFinalStep && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white space-y-4 shadow-xl border border-indigo-500/30 animate-in fade-in-50">
              <div className="space-y-1 text-center">
                <span className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-widest block">
                  CLOUDPULSE CORE VALUE PROPOSITION
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  “Detect idle resources. Protect state. Reclaim automatically. Hydrate in seconds.”
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold pt-2 border-t border-white/10 text-center">
                <div className="p-2.5 rounded-xl bg-white/10 text-slate-200">
                  From advisory FinOps → <span className="text-emerald-300 font-mono">Autonomous Action</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wide">
                  “MAKE CLOUD WASTE REVERSIBLE. MAKE FINOPS AUTONOMOUS.”
                </div>
              </div>
            </div>
          )}

          {/* Action Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                if (currentStep > 0) setCurrentStep(currentStep - 1)
              }}
              disabled={currentStep === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous Stage
            </button>

            <span className="text-xs text-gray-400 italic">
              * Prototype demonstration with simulated telemetry (repository benchmark validated)
            </span>

            {isFinalStep ? (
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all"
              >
                Close &amp; Explore Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  if (currentStep < steps.length - 1) {
                    setCurrentStep(currentStep + 1)
                    setProgress(0)
                  }
                }}
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
