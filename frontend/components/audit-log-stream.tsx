'use client'

import React, { useState, useEffect } from 'react'
import { Activity, ShieldAlert, Zap, Trash2, Filter, Search, Download, CheckCircle2, Clock } from 'lucide-react'

export interface AuditEvent {
  id: string
  timestamp: string
  action: 'AUTONOMOUS_PAUSE' | 'WARM_HYDRATION' | 'GHOST_PURGE' | 'POLICY_ENFORCEMENT' | 'DISCOVERY_SYNC'
  resourceId: string
  provider: 'AWS' | 'GCP' | 'K8S'
  environment: string
  details: string
  impact: string
}

const initialAuditEvents: AuditEvent[] = [
  {
    id: 'evt-101',
    timestamp: 'Just now',
    action: 'AUTONOMOUS_PAUSE',
    resourceId: 'i-091a2b3c4d5e6f7g1',
    provider: 'AWS',
    environment: 'Staging',
    details: 'Idle multi-signal confirmed (CPU: 0.6%, Net: 1.1 KB/s, DB Sockets: 0). Paused EC2 instance.',
    impact: 'Saved $0.192/hr ($138/mo)'
  },
  {
    id: 'evt-102',
    timestamp: '4 mins ago',
    action: 'WARM_HYDRATION',
    resourceId: 'staging-api-server-01',
    provider: 'AWS',
    environment: 'Staging',
    details: 'Re-activation request from @dev-engineer via Slack (/cloudpulse wakeup). Awakened in 2.3s.',
    impact: 'Developer Grace Period: 3 hrs'
  },
  {
    id: 'evt-103',
    timestamp: '12 mins ago',
    action: 'GHOST_PURGE',
    resourceId: 'vol-0a1b2c3d4e5f6g7h8',
    provider: 'AWS',
    environment: 'Staging',
    details: 'Unattached EBS disk (250 GB) purged. Automated snapshot snap-089912a archived for 30 days.',
    impact: 'Reclaimed $25.00/mo waste'
  },
  {
    id: 'evt-104',
    timestamp: '25 mins ago',
    action: 'POLICY_ENFORCEMENT',
    resourceId: 'k8s-deploy-qa-worker-pool',
    provider: 'K8S',
    environment: 'QA',
    details: 'Off-hours policy trigger: kubectl scale --replicas=0 on qa-worker-pool namespace.',
    impact: 'Saved 12 pods (48 vCPU)'
  },
  {
    id: 'evt-105',
    timestamp: '42 mins ago',
    action: 'DISCOVERY_SYNC',
    resourceId: 'us-east-1, us-west-2, us-central1',
    provider: 'AWS',
    environment: 'Multi-Env',
    details: 'Tag-aware cloud inventory scanned. 28 non-prod assets indexed, 14 production assets isolated.',
    impact: 'Production 100% Protected'
  },
  {
    id: 'evt-106',
    timestamp: '1 hour ago',
    action: 'GHOST_PURGE',
    resourceId: 'eipalloc-0123456789abcdef0',
    provider: 'AWS',
    environment: 'Dev',
    details: 'Unassociated Elastic IP released from AWS EC2 VPC allocation.',
    impact: 'Reclaimed $3.60/mo'
  }
]

export function AuditLogStream() {
  const [events, setEvents] = useState<AuditEvent[]>(initialAuditEvents)
  const [filterAction, setFilterAction] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Periodic simulation of new audit event
  useEffect(() => {
    const timer = setInterval(() => {
      const actions: AuditEvent['action'][] = ['AUTONOMOUS_PAUSE', 'WARM_HYDRATION', 'GHOST_PURGE', 'POLICY_ENFORCEMENT']
      const randomAction = actions[Math.floor(Math.random() * actions.length)]
      
      const newEvt: AuditEvent = {
        id: 'evt-' + Math.floor(Math.random() * 9000 + 1000),
        timestamp: 'Just now',
        action: randomAction,
        resourceId: randomAction === 'WARM_HYDRATION' ? 'dev-frontend-react-02' : 'i-088a99b88c77d' + Math.floor(Math.random() * 99),
        provider: 'AWS',
        environment: 'Dev',
        details: randomAction === 'AUTONOMOUS_PAUSE' 
          ? 'Metric check: CPU 0.4%, Sockets 0. Successfully auto-paused VM.'
          : randomAction === 'WARM_HYDRATION'
          ? 'Reactivated in 1.9s via Next.js 1-Click Wake Up Portal.'
          : 'Cleaned unassociated resource state with backup snapshot.',
        impact: 'FinOps Optimization Complete'
      }

      setEvents(prev => [newEvt, ...prev.slice(0, 19)])
    }, 12000)

    return () => clearInterval(timer)
  }, [])

  const filteredEvents = events.filter((e) => {
    const matchesAction = filterAction === 'ALL' || e.action === filterAction
    const matchesSearch = e.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.resourceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.environment.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesAction && matchesSearch
  })

  const exportLogs = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(events, null, 2))}`
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', jsonString)
    downloadAnchor.setAttribute('download', `CloudPulse_FinOps_Audit_Log_${new Date().toISOString().split('T')[0]}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const getActionBadge = (action: AuditEvent['action']) => {
    switch (action) {
      case 'AUTONOMOUS_PAUSE':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">AUTO PAUSE</span>
      case 'WARM_HYDRATION':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">WARM HYDRATION</span>
      case 'GHOST_PURGE':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">GHOST PURGE</span>
      case 'POLICY_ENFORCEMENT':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">POLICY SCALE</span>
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-violet-500/10 text-violet-400 border border-violet-500/30">DISCOVERY</span>
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur-md p-6 shadow-2xl space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Live Autonomous FinOps Audit Ledger</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-proof real-time activity stream recording every pause, warm hydration, and ghost resource purge event.
          </p>
        </div>

        <button
          onClick={exportLogs}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all shadow-sm"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Audit Log (JSON)</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Action Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {['ALL', 'AUTONOMOUS_PAUSE', 'WARM_HYDRATION', 'GHOST_PURGE', 'POLICY_ENFORCEMENT'].map((action) => (
            <button
              key={action}
              onClick={() => setFilterAction(action)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterAction === action
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {action.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resource, env, or action..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

      </div>

      {/* Audit Log Table */}
      <div className="overflow-x-auto rounded-xl border border-border/80 bg-slate-950/40">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/90 font-semibold uppercase tracking-wider text-slate-400 border-b border-border">
            <tr>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Workload ID / Target</th>
              <th className="py-3 px-4">Environment</th>
              <th className="py-3 px-4">Engine Telemetry & Execution Details</th>
              <th className="py-3 px-4 text-right">Financial & Ops Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filteredEvents.map((evt) => (
              <tr key={evt.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{evt.timestamp}</span>
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">{getActionBadge(evt.action)}</td>
                <td className="py-3 px-4 font-mono text-white font-semibold">{evt.resourceId}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                    {evt.environment}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300 max-w-md">{evt.details}</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400 whitespace-nowrap">
                  {evt.impact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
