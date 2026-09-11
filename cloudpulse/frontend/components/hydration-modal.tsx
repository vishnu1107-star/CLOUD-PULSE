'use client'

import React, { useState, useEffect } from 'react'
import { WorkloadItem } from '@/lib/demo-store'
import { 
  Zap, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Server, 
  Lock, 
  X, 
  Sparkles,
  ShieldCheck
} from 'lucide-react'

interface HydrationModalProps {
  workload: WorkloadItem | null
  isOpen: boolean
  onClose: () => void
  onCompleteHydrate: (workload: WorkloadItem) => void
}

export function HydrationModal({ workload, isOpen, onClose, onCompleteHydrate }: HydrationModalProps) {
  const [step, setStep] = useState<number>(1)
  const [isDone, setIsDone] = useState<boolean>(false)

  const hydrationSteps = [
    { num: 1, text: '1. Hydration request received & authenticated' },
    { num: 2, text: '2. Snapshot located in 30-day recovery vault' },
    { num: 3, text: '3. Multi-cloud compute instance provisioned' },
    { num: 4, text: '4. Root filesystem & disk state restored' },
    { num: 5, text: '5. TCP port & HTTP health checks passed' },
    { num: 6, text: '6. Workload ready & live in production routing' }
  ]

  useEffect(() => {
    if (!isOpen || !workload) {
      setStep(1)
      setIsDone(false)
      return
    }

    const timer1 = setTimeout(() => setStep(2), 350)
    const timer2 = setTimeout(() => setStep(3), 700)
    const timer3 = setTimeout(() => setStep(4), 1100)
    const timer4 = setTimeout(() => setStep(5), 1500)
    const timer5 = setTimeout(() => {
      setStep(6)
      setIsDone(true)
      onCompleteHydrate(workload)
    }, 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [isOpen, workload])

  if (!isOpen || !workload) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full border border-gray-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-gray-900 space-y-5 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-sm">
              <Zap className="w-6 h-6 fill-current animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold text-gray-900">Instant Warm Hydration</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                  &lt; 2.34s SLA
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Automated sub-second state reactivation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workload Pill */}
        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
          <span className="text-gray-500 font-medium">Re-activating:</span>
          <span className="font-mono font-bold text-gray-900">{workload.name} ({workload.provider})</span>
        </div>

        {/* Step-by-Step Progress Animation */}
        <div className="space-y-2">
          {hydrationSteps.map((st) => {
            const isCompleted = step > st.num || (step === st.num && isDone)
            const isCurrent = step === st.num && !isDone

            return (
              <div
                key={st.num}
                className={`p-2.5 rounded-xl text-xs flex items-center justify-between border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold'
                    : isCurrent
                    ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold ring-1 ring-blue-400/30'
                    : 'bg-white border-gray-100 text-gray-400'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : isCurrent ? (
                    <Activity className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[9px] font-mono text-gray-400">
                      {st.num}
                    </div>
                  )}
                  <span>{st.text}</span>
                </div>

                {isCompleted && (
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">OK</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Final Ready State Box */}
        {isDone && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 text-center space-y-2 animate-in zoom-in-95 duration-200">
            <div className="inline-flex p-2 rounded-xl bg-emerald-600 text-white shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-emerald-950 uppercase tracking-wide">
                WORKLOAD READY
              </h4>
              <div className="flex items-center justify-center space-x-4 text-xs font-mono font-bold text-emerald-800 pt-1">
                <span>Recovery Time: <strong className="text-emerald-950">2.34s benchmark</strong></span>
                <span>•</span>
                <span>Status: <strong className="text-emerald-950">Healthy (200 OK)</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all ${
              isDone
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {isDone ? 'Close / Workload is Active' : 'Hydrating Workload...'}
          </button>
        </div>

      </div>
    </div>
  )
}
