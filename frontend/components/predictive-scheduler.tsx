'use client'

import React, { useState } from 'react'
import { Brain, Clock, Calendar, Zap, CheckCircle2, Sparkles, AlertCircle, ArrowRight, ToggleLeft, ToggleRight } from 'lucide-react'
import { useToast } from '@/components/toast'

interface PredictionItem {
  id: string
  team: string
  environment: string
  predictedStart: string
  confidence: number
  autoPrewarm: boolean
  status: 'SCHEDULED' | 'WARMED' | 'LEARNING'
  reasoning: string
}

const initialPredictions: PredictionItem[] = [
  {
    id: 'pred-1',
    team: 'Core API Team',
    environment: 'Staging-API-Server',
    predictedStart: 'Tomorrow, 08:50 AM',
    confidence: 96.4,
    autoPrewarm: true,
    status: 'SCHEDULED',
    reasoning: 'Model identified 94% probability of morning sprint commits between 08:45 - 09:15 AM based on past 30-day git telemetry.'
  },
  {
    id: 'pred-2',
    team: 'Frontend Web Team',
    environment: 'Dev-React-Cluster',
    predictedStart: 'Tomorrow, 09:15 AM',
    confidence: 92.8,
    autoPrewarm: true,
    status: 'SCHEDULED',
    reasoning: 'Pre-hydrating 10 minutes prior to daily standup to guarantee 0.0s cold-start delay for developers.'
  },
  {
    id: 'pred-3',
    team: 'Data & ML Pipeline',
    environment: 'QA-Data-Worker',
    predictedStart: 'Thursday, 02:00 PM',
    confidence: 88.1,
    autoPrewarm: false,
    status: 'LEARNING',
    reasoning: 'Bi-weekly batch model validation detected. Awaiting developer schedule confirmation.'
  }
]

export function PredictiveScheduler() {
  const [predictions, setPredictions] = useState<PredictionItem[]>(initialPredictions)
  const { showToast } = useToast()

  const togglePrewarm = (id: string) => {
    setPredictions(prev => prev.map(p => {
      if (p.id === id) {
        const updated = !p.autoPrewarm
        showToast({
          type: updated ? 'success' : 'info',
          title: updated ? 'Auto Pre-Warm Enabled' : 'Auto Pre-Warm Disabled',
          description: `${p.environment} will ${updated ? 'automatically pre-hydrate 10m before predicted start' : 'remain dormant until manual wakeup'}.`
        })
        return { ...p, autoPrewarm: updated }
      }
      return p
    }))
  }

  const triggerInstantPrewarm = (env: string) => {
    showToast({
      type: 'success',
      title: 'Pre-Hydration Executed',
      description: `Dispatched warm start command to ${env}. Ready for incoming developer traffic.`
    })
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">AI Predictive Pre-Hydration Scheduler</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Machine learning time-series model forecasting developer shift starts to pre-warm environments 10 minutes early.
          </p>
        </div>

        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/30">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Prophet AI Engine Online</span>
        </span>
      </div>

      {/* Predictions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {predictions.map((pred) => (
          <div
            key={pred.id}
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{pred.team}</span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {pred.confidence}% Match
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{pred.environment}</h4>
                <div className="flex items-center space-x-1.5 text-xs text-violet-300 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Predicted Start: <strong>{pred.predictedStart}</strong></span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/90 p-3 rounded-xl border border-slate-800/80">
                {pred.reasoning}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <button
                type="button"
                onClick={() => togglePrewarm(pred.id)}
                className="flex items-center space-x-2 text-xs text-slate-300 hover:text-white"
              >
                {pred.autoPrewarm ? (
                  <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Auto Pre-Warm</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 text-slate-500 font-medium">
                    <span>Manual Wakeup</span>
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => triggerInstantPrewarm(pred.environment)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Pre-Warm Now
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Bottom Technical Note */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start space-x-3 text-xs text-slate-400">
        <Sparkles className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <p>
          <strong>Zero Developer Friction Guarantee:</strong> Environments remain safely paused during all non-working hours and are restored automatically prior to developer arrival, eliminating cold-start bottlenecks.
        </p>
      </div>

    </div>
  )
}
