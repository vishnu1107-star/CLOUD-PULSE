'use client'

import React, { useState } from 'react'
import { 
  Brain, 
  Clock, 
  Calendar, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react'
import { useToast } from '@/components/toast'

interface PredictionPattern {
  id: string
  workload: string
  team: string
  activeHours: string
  predictedIdle: string
  recommendedReclaim: string
  predictedWakeup: string
  preHydrationEnabled: boolean
  confidence: number
  patternNote: string
}

const initialPatterns: PredictionPattern[] = [
  {
    id: 'pat-1',
    workload: 'staging-api-03',
    team: 'Core Backend API',
    activeHours: '9:00 AM – 7:00 PM',
    predictedIdle: '7:00 PM – 9:00 AM',
    recommendedReclaim: 'Reclaim at 7:15 PM',
    predictedWakeup: '8:45 AM (Pre-warm 15m early)',
    preHydrationEnabled: true,
    confidence: 96.4,
    patternNote: 'Past 30-day git commit & telemetry analysis shows 0% developer activity post 7:00 PM on weekdays.'
  },
  {
    id: 'pat-2',
    workload: 'dev-frontend-react-02',
    team: 'Frontend Web Team',
    activeHours: '9:30 AM – 6:30 PM',
    predictedIdle: '6:30 PM – 9:30 AM',
    recommendedReclaim: 'Reclaim at 6:45 PM',
    predictedWakeup: '9:15 AM (Pre-warm 15m early)',
    preHydrationEnabled: true,
    confidence: 94.2,
    patternNote: 'Pre-hydrating 15 minutes before daily sprint standup eliminates cold start delay for developers.'
  },
  {
    id: 'pat-3',
    workload: 'qa-data-processor-pool',
    team: 'Data & Analytics',
    activeHours: '10:00 AM – 5:00 PM (Tue / Thu)',
    predictedIdle: '5:00 PM – 10:00 AM',
    recommendedReclaim: 'Reclaim at 5:15 PM',
    predictedWakeup: '9:45 AM (Pre-warm batch)',
    preHydrationEnabled: false,
    confidence: 89.1,
    patternNote: 'Bi-weekly batch model verification schedule detected. Awaiting developer confirmation to enable auto pre-warm.'
  }
]

export function PredictiveScheduler() {
  const [patterns, setPatterns] = useState<PredictionPattern[]>(initialPatterns)
  const { showToast } = useToast()

  const togglePrewarm = (id: string) => {
    setPatterns(prev => prev.map(p => {
      if (p.id === id) {
        const updated = !p.preHydrationEnabled
        showToast({
          type: updated ? 'success' : 'info',
          title: updated ? 'Pre-Hydration Enabled' : 'Pre-Hydration Disabled',
          description: `${p.workload} will ${updated ? 'automatically pre-hydrate before developer shift start' : 'remain dormant until manual wake up'}.`
        })
        return { ...p, preHydrationEnabled: updated }
      }
      return p
    }))
  }

  const handleTriggerPrewarm = (workload: string) => {
    showToast({
      type: 'success',
      title: 'Pre-Hydration Triggered',
      description: `Dispatched warm-start command for ${workload}. Workload is healthy and ready for traffic.`
    })
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-8 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">
                Predictive Diurnal Pre-Hydration Scheduler
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                CloudPulse predicts when infrastructure will be needed again and pre-warms workloads automatically.
              </p>
            </div>
          </div>
        </div>

        <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Autoregressive Diurnal Forecaster</span>
        </span>
      </div>

      {/* Main Pattern Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {patterns.map((pat) => (
          <div
            key={pat.id}
            className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200 flex flex-col justify-between space-y-4 hover:bg-white hover:shadow-sm transition-all"
          >
            <div className="space-y-3">
              
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{pat.team}</span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {pat.confidence}% Accuracy
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-gray-900">{pat.workload}</h4>
              </div>

              {/* Schedule Timing Visual Card */}
              <div className="p-3.5 rounded-xl bg-white border border-gray-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Typical Active Hours:</span>
                  <span className="font-bold text-gray-900">{pat.activeHours}</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-1.5">
                  <span className="text-gray-500 font-medium">Predicted Idle Window:</span>
                  <span className="font-bold text-amber-700">{pat.predictedIdle}</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-1.5">
                  <span className="text-gray-500 font-medium">Recommended Action:</span>
                  <span className="font-bold text-blue-700">{pat.recommendedReclaim}</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-1.5">
                  <span className="text-gray-500 font-medium">Predicted Wake-Up:</span>
                  <span className="font-bold text-emerald-700">{pat.predictedWakeup}</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-600 leading-relaxed bg-white p-3 rounded-xl border border-gray-200">
                {pat.patternNote}
              </p>

            </div>

            {/* Toggle Prewarm Action */}
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => togglePrewarm(pat.id)}
                className="flex items-center space-x-2 text-xs font-semibold"
              >
                {pat.preHydrationEnabled ? (
                  <span className="flex items-center space-x-1 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pre-Hydration: ON</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 text-gray-500 font-medium">
                    <span>Manual Wakeup Only</span>
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleTriggerPrewarm(pat.workload)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold border border-gray-300 shadow-xs transition-colors"
              >
                Pre-Warm Now
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Trust & Zero-Friction SLA */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start space-x-3 text-xs text-blue-900 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p>
          <strong>Zero Developer Friction Target:</strong> Environments remain safely paused during off-hours, reclaiming 45–70% of compute spend based on benchmark models, and are pre-hydrated automatically 15 minutes before developer shift starts to minimize cold-start waiting.
        </p>
      </div>

    </div>
  )
}
