'use client'

import React, { useState, useEffect } from 'react'
import { AuditRecord, initialAuditRecords } from '@/lib/demo-store'
import { 
  Activity, 
  ShieldAlert, 
  Zap, 
  Trash2, 
  Filter, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock,
  Lock,
  DollarSign,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'
import { useToast } from '@/components/toast'

export function AuditLogStream() {
  const [records, setRecords] = useState<AuditRecord[]>(initialAuditRecords)
  const [filterAction, setFilterAction] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { showToast } = useToast()

  // Periodic simulation of new audit event
  useEffect(() => {
    const timer = setInterval(() => {
      const actions: AuditRecord['action'][] = ['RECLAIM', 'HYDRATE', 'SNAPSHOT', 'POLICY']
      const randomAction = actions[Math.floor(Math.random() * actions.length)]
      
      const newEvt: AuditRecord = {
        id: 'aud-' + Math.floor(Math.random() * 9000 + 1000),
        timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
        user_or_system: randomAction === 'HYDRATE' ? 'DevOps User' : 'CloudPulse AI',
        cloud: Math.random() > 0.5 ? 'AWS' : 'GCP',
        resource: randomAction === 'HYDRATE' ? 'dev-frontend-react-02' : 'staging-api-0' + Math.floor(Math.random() * 9 + 1),
        action: randomAction,
        reason: randomAction === 'RECLAIM' 
          ? 'Multi-signal verified: 98% idle confidence, 0 TCP connections'
          : randomAction === 'HYDRATE'
          ? '1-Click developer warm re-activation in 2.34s'
          : '30-day point-in-time state recovery snapshot vaulted',
        savings: randomAction === 'RECLAIM' ? '+$14.70/day' : '2.34s recovery',
        snapshot: 'vault-snap-' + Math.floor(1000 + Math.random() * 9000),
        result: 'Success ✓'
      }

      setRecords(prev => [newEvt, ...prev.slice(0, 24)])
    }, 15000)

    return () => clearInterval(timer)
  }, [])

  const filtered = records.filter((r) => {
    const matchesAction = filterAction === 'ALL' || r.action === filterAction
    const matchesSearch = r.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.user_or_system.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesAction && matchesSearch
  })

  const exportLogs = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(records, null, 2))}`
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', jsonString)
    downloadAnchor.setAttribute('download', `CloudPulse_Audit_Ledger_${new Date().toISOString().split('T')[0]}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
    showToast({
      type: 'info',
      title: 'Audit Ledger Exported',
      description: 'Downloaded tamper-evident JSON audit stream.'
    })
  }

  const getActionBadge = (action: AuditRecord['action']) => {
    switch (action) {
      case 'RECLAIM':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">RECLAIM</span>
      case 'HYDRATE':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">HYDRATE</span>
      case 'SNAPSHOT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">SNAPSHOT</span>
      case 'POLICY':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">POLICY</span>
      case 'GHOST_PURGE':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">GHOST PURGE</span>
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">{action}</span>
    }
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 shadow-sm">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold text-gray-900">Autonomous FinOps Audit Ledger</h2>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  Tamper-Evident Audit Record
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Full governance audit trail recording every autonomous reclaim, snapshot creation, and warm hydration event.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={exportLogs}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold border border-gray-300 transition-all shadow-xs"
        >
          <Download className="w-4 h-4 text-emerald-600" />
          <span>Export Audit Ledger (JSON)</span>
        </button>
      </div>

      {/* Prompt #12: Simple Visual Timeline Header */}
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
          Standard Autonomous Lifecycle Timeline:
        </span>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs font-bold font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">DETECTED</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">VALIDATED</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">SNAPSHOTTED</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">RECLAIMED</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">RESTORE REQUESTED</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">HYDRATED</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'ALL', label: 'All Actions' },
            { id: 'RECLAIM', label: 'Reclamation' },
            { id: 'HYDRATE', label: 'Hydration' },
            { id: 'SNAPSHOT', label: 'Snapshot' },
            { id: 'POLICY', label: 'Policy' },
            { id: 'GHOST_PURGE', label: 'Ghost Purge' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterAction(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                filterAction === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resource, actor, reason..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

      </div>

      {/* Audit Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-50/80 font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 text-[10px]">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Actor</th>
              <th className="py-3 px-4">Cloud &amp; Resource</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Evaluation Reason</th>
              <th className="py-3 px-4">Savings Impact</th>
              <th className="py-3 px-4">Snapshot Ref</th>
              <th className="py-3 px-4 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50/80 transition-colors">
                
                {/* 1. Timestamp */}
                <td className="py-3 px-4 font-mono text-gray-500 whitespace-nowrap">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{r.timestamp}</span>
                  </span>
                </td>

                {/* 2. Actor */}
                <td className="py-3 px-4 font-bold text-gray-900 whitespace-nowrap">
                  {r.user_or_system}
                </td>

                {/* 3. Cloud & Resource */}
                <td className="py-3 px-4">
                  <div>
                    <span className="font-mono font-bold text-gray-900 block text-xs">{r.resource}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{r.cloud}</span>
                  </div>
                </td>

                {/* 4. Action */}
                <td className="py-3 px-4 whitespace-nowrap">
                  {getActionBadge(r.action)}
                </td>

                {/* 5. Reason */}
                <td className="py-3 px-4 text-gray-600 max-w-xs leading-relaxed">
                  {r.reason}
                </td>

                {/* 6. Savings */}
                <td className="py-3 px-4 font-mono font-bold text-emerald-700 whitespace-nowrap">
                  {r.savings}
                </td>

                {/* 7. Snapshot */}
                <td className="py-3 px-4 font-mono text-[11px] text-indigo-700">
                  {r.snapshot}
                </td>

                {/* 8. Result */}
                <td className="py-3 px-4 text-right font-bold text-emerald-700 whitespace-nowrap">
                  {r.result}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
