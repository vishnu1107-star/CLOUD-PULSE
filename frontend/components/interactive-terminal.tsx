'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Terminal, CornerDownLeft, Zap, Shield, HelpCircle, Check, Play } from 'lucide-react'

interface LogEntry {
  type: 'cmd' | 'output' | 'error' | 'success'
  text: string
}

export function InteractiveTerminal() {
  const [input, setInput] = useState<string>('')
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'output', text: '⚡ CloudPulse FinOps CLI v1.0.4 initialized.' },
    { type: 'output', text: 'Type "help" to see available autonomous commands, or try "status", "evaluate", "reap".' }
  ])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.trim()
    if (!cmd) return

    setHistory(prev => [...prev, { type: 'cmd', text: `$ ${cmd}` }])
    setInput('')

    const lower = cmd.toLowerCase()

    if (lower === 'help') {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          text: `Available Commands:
  • status                - Display current cloud workloads & idle state
  • discover              - Trigger tag-aware AWS / GCP asset discovery
  • evaluate              - Run multi-signal telemetry idle evaluation
  • wakeup <env>          - Trigger sub-3s warm hydration (e.g. wakeup staging)
  • reap [--dry-run]      - Sweep and purge unattached EBS & orphan IPs
  • roi [--nodes=N]       - Compute instant FinOps ROI & Carbon savings
  • esg                   - Print corporate carbon emissions offset ledger
  • clear                 - Clear terminal output stream`
        }
      ])
    } else if (lower === 'clear') {
      setHistory([])
    } else if (lower === 'status') {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          text: `[CLOUDPULSE CONTROL LOOP STATUS]
• Active Environments: Staging (PAUSED), Dev (RUNNING), QA (PAUSED), Prod (ISOLATED)
• Monitored Workloads: 6 Instances, 2 K8s Deployments, 4 Ghost Disks
• Total Capital Reclaimed: $248.50 USD
• Carbon Avoided: 89.2 kg CO2e
• Autonomous Control Daemon: ACTIVE (Next evaluation in 4m 12s)`
        }
      ])
    } else if (lower === 'discover') {
      setHistory(prev => [
        ...prev,
        {
          type: 'success',
          text: `[DISCOVERY EXECUTION COMPLETE]
Scanning AWS us-east-1, us-west-2, GCP us-central1...
✓ Discovered: 6 VMs, 2 EBS Disks, 1 Elastic IP
✓ Isolated: 2 Production instances (Tag: Environment=Production)`
        }
      ])
    } else if (lower === 'evaluate') {
      setHistory(prev => [
        ...prev,
        {
          type: 'success',
          text: `[METRIC EVALUATION PASS]
Evaluating 30-min rolling window:
• staging-api-server-01: CPU: 0.8%, Net: 1.2 KB/s, Sockets: 0 -> IDLE CANDIDATE (Paused)
• dev-frontend-react-02: CPU: 0.4%, Net: 0.5 KB/s, Sockets: 0 -> IDLE CANDIDATE (Paused)
✓ Auto-paused 2 idle workloads. Reclaimed $0.288/hr.`
        }
      ])
    } else if (lower.startsWith('wakeup')) {
      const parts = lower.split(' ')
      const env = parts[1] || 'staging'
      setHistory(prev => [
        ...prev,
        {
          type: 'success',
          text: `[WARM HYDRATION PROTOCOL TRIGGERED]
✓ Target Environment: ${env.toUpperCase()}
✓ Sending Warm Hydration API call...
✓ Awakened 2 instances in 2.14 seconds!
✓ Developer Grace Period active for 3 hours.`
        }
      ])
    } else if (lower.startsWith('reap')) {
      setHistory(prev => [
        ...prev,
        {
          type: 'success',
          text: `[GHOST RESOURCE REAPER EXECUTED]
✓ Swept 2 unattached EBS volumes (vol-0a1b2c3d4e5f, vol-089912bc)
✓ Saved 30-day rollback snapshot snap-091a2bc
✓ Purged 1 orphaned Elastic IP (eipalloc-012345)
✓ Reclaimed $28.60/month recurring waste!`
        }
      ])
    } else if (lower.startsWith('roi')) {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          text: `[FINOPS ROI ESTIMATE]
• Analyzed Fleet: 50 Instances (65% Non-Production)
• Projected Monthly Savings: $2,840.50 / month
• Projected Annual Savings:  $34,086.00 / year
• Annual Carbon Avoided:     4.2 MT CO2e (~200 Trees Planted)`
        }
      ])
    } else if (lower === 'esg') {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          text: `[ESG SUSTAINABILITY COMPLIANCE LEDGER]
• UN Sustainable Development Goals: SDG 9, SDG 12, SDG 13 Compliant
• Total Kilowatt-Hours Saved: 231.7 kWh
• Grid Emission Factor: 0.385 kg CO2/kWh
• Verified Carbon Credit Equivalent: 0.089 Verified ESG Credits`
        }
      ])
    } else {
      setHistory(prev => [
        ...prev,
        {
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`
        }
      ])
    }
  }

  const runQuickCmd = (c: string) => {
    setInput(c)
  }

  return (
    <div className="rounded-2xl border border-border bg-slate-950 p-6 shadow-2xl space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            CloudPulse Interactive FinOps CLI Terminal
          </h3>
        </div>

        {/* Quick Click Badges */}
        <div className="flex items-center space-x-1 text-[11px] text-slate-400">
          <span>Quick:</span>
          {['status', 'evaluate', 'wakeup staging', 'reap', 'roi'].map((qc) => (
            <button
              key={qc}
              type="button"
              onClick={() => runQuickCmd(qc)}
              className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-emerald-400 font-mono border border-slate-800 transition-colors"
            >
              {qc}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="h-64 overflow-y-auto space-y-2 p-4 rounded-xl bg-black/60 border border-slate-800/80 font-mono text-xs text-slate-300">
        {history.map((h, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            {h.type === 'cmd' && <span className="text-emerald-400 font-bold">{h.text}</span>}
            {h.type === 'output' && <span className="text-slate-300">{h.text}</span>}
            {h.type === 'success' && <span className="text-cyan-300">{h.text}</span>}
            {h.type === 'error' && <span className="text-rose-400">{h.text}</span>}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Command Input Form */}
      <form onSubmit={handleCommand} className="flex items-center space-x-2">
        <div className="relative flex-1 flex items-center">
          <span className="absolute left-3 text-emerald-400 font-mono text-xs font-bold">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (e.g. status, evaluate, wakeup staging, help)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono flex items-center space-x-1 shadow-md shadow-emerald-600/30 transition-all"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
          <span>Exec</span>
        </button>
      </form>

    </div>
  )
}
