'use client'

import React, { useState } from 'react'
import { MessageSquare, Bot, CheckCircle2, Clock, ShieldAlert, Check } from 'lucide-react'
import { useToast } from '@/components/toast'

export function ChatOpsApprovalCard() {
  const [decision, setDecision] = useState<'PAUSED' | 'EXTENDED' | 'EXEMPTED' | null>(null)
  const { showToast } = useToast()

  const handleAction = (action: 'PAUSED' | 'EXTENDED' | 'EXEMPTED') => {
    setDecision(action)
    if (action === 'PAUSED') {
      showToast({
        type: 'success',
        title: 'ChatOps Approval: Paused',
        description: 'Auto-paused staging cluster. Hourly rate reclaimed.'
      })
    } else if (action === 'EXTENDED') {
      showToast({
        type: 'info',
        title: 'ChatOps: Grace Extended',
        description: 'Extended developer grace window by 2 hours.'
      })
    } else {
      showToast({
        type: 'warning',
        title: 'ChatOps: Workload Exempted',
        description: 'Exempted staging cluster from auto-pause until tomorrow.'
      })
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 shadow-xl space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Slack & Teams ChatOps Approval Dispatcher
          </h3>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
          Bolt Webhook Active
        </span>
      </div>

      {/* Simulated Interactive Slack Message Card */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-sans text-xs">
        
        <div className="flex items-start space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <Bot className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-xs">CloudPulse FinOps Bot</span>
              <span className="text-[10px] text-slate-500">APP • Just now</span>
            </div>
            <p className="text-slate-300">
              ⚠️ <strong>Idle Workload Alert:</strong> <code className="text-emerald-400 font-mono">staging-api-server-01</code> has been idle for 30 minutes (CPU: 0.6%, Net: 1.1 KB/s, DB Sockets: 0).
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pl-9 pt-2 flex flex-wrap gap-2">
          {decision === null ? (
            <>
              <button
                onClick={() => handleAction('PAUSED')}
                className="px-3.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold transition-all"
              >
                Auto-Pause Workload
              </button>
              <button
                onClick={() => handleAction('EXTENDED')}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold transition-all"
              >
                Extend Grace (2 Hrs)
              </button>
              <button
                onClick={() => handleAction('EXEMPTED')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-all"
              >
                Exempt Today
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <Check className="w-4 h-4" />
              <span>Action Recorded: {decision === 'PAUSED' ? 'Paused Workload' : decision === 'EXTENDED' ? 'Grace Extended (2h)' : 'Exempted Today'} by @dev-engineer</span>
            </div>
          )}
        </div>

      </div>

    </div>
  )
}
