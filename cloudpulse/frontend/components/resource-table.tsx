'use client'

import React, { useState } from 'react'
import { WorkloadItem, initialWorkloads } from '@/lib/demo-store'
import { 
  Play, 
  Square, 
  Clock, 
  Cpu, 
  Activity, 
  Cloud, 
  Server, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Download,
  X,
  Lock,
  RotateCcw,
  ShieldCheck,
  Search,
  Eye,
  Tag
} from 'lucide-react'
import { useToast } from '@/components/toast'

interface ResourceTableProps {
  workloads?: WorkloadItem[]
  onInspect?: (workload: WorkloadItem) => void
  onSafeReclaim?: (workload: WorkloadItem) => void
  onHydrate?: (workload: WorkloadItem) => void
}

export function ResourceTable({ 
  workloads = initialWorkloads, 
  onInspect, 
  onSafeReclaim, 
  onHydrate 
}: ResourceTableProps) {
  const [selectedCloud, setSelectedCloud] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { showToast } = useToast()

  const exportCsv = () => {
    const headers = 'Workload Name,Cloud Provider,Region,Environment,Production,CPU (%),Network (MB/s),Active Connections,IOPS,Idle Confidence (%),Current Cost ($/day),Potential Savings ($/day),Status,Last Activity,Recommended Action\n'
    const rows = workloads.map(w => 
      `"${w.name}","${w.provider}","${w.region}","${w.environment}","${w.isProduction ? 'YES' : 'NO'}",${w.cpu},${w.network_kbps},${w.active_connections},"${w.iops}",${w.idle_confidence},${w.current_cost_day},${w.potential_savings_day},"${w.state}","${w.last_activity}","${w.recommended_action}"`
    ).join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `CloudPulse_Workloads_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    showToast({
      type: 'info',
      title: 'Workload Inventory Exported',
      description: 'Infrastructure telemetry exported to CSV.'
    })
  }

  const handleSnapshotQuick = (w: WorkloadItem) => {
    showToast({
      type: 'success',
      title: 'Snapshot Created & Secured',
      description: `Vaulted 30-day recovery snapshot for ${w.name} in Disaster Recovery Vault.`
    })
  }

  const filtered = workloads.filter(w => {
    const matchesCloud = selectedCloud === 'ALL' || w.provider.toUpperCase() === selectedCloud.toUpperCase()
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.environment.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCloud && matchesSearch
  })

  const getProviderBadge = (provider: string) => {
    switch (provider.toUpperCase()) {
      case 'AWS':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">AWS</span>
      case 'GCP':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">GCP</span>
      case 'K8S':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">Kubernetes</span>
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-gray-100 text-gray-700">{provider}</span>
    }
  }

  const getStateBadge = (state: string, isProduction: boolean) => {
    if (isProduction) {
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <Lock className="w-3 h-3 text-rose-600" />
          <span>PROD: LOCKED</span>
        </span>
      )
    }
    if (state === 'RUNNING') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>RUNNING</span>
        </span>
      )
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span>RECLAIMED / PAUSED</span>
      </span>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm space-y-0">
      
      {/* Table Header Controls */}
      <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Multi-Cloud Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'ALL', label: 'All Clouds' },
            { id: 'AWS', label: 'AWS' },
            { id: 'GCP', label: 'GCP' },
            { id: 'K8S', label: 'Kubernetes' },
            { id: 'AZURE', label: 'Azure (Coming next)', disabled: true }
          ].map((tab) => (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => setSelectedCloud(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                tab.disabled
                  ? 'bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed italic'
                  : selectedCloud === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Export CSV */}
        <div className="flex items-center space-x-2">
          <div className="relative w-48 sm:w-56">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workloads..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={exportCsv}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-300 text-xs font-semibold shadow-xs transition-all"
            title="Export to CSV"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>

      </div>

      {/* Responsive Workload Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-50/80 font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 text-[10px]">
            <tr>
              <th className="py-3 px-4">Workload &amp; Cloud</th>
              <th className="py-3 px-4">Environment</th>
              <th className="py-3 px-4">Telemetry (CPU / Net / Sockets)</th>
              <th className="py-3 px-4">Idle Confidence</th>
              <th className="py-3 px-4">Current Spend</th>
              <th className="py-3 px-4">Reclaim Potential</th>
              <th className="py-3 px-4">Status &amp; Last Activity</th>
              <th className="py-3 px-4 text-right">Autonomous FinOps Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((w) => (
              <tr key={w.id} className="hover:bg-gray-50/80 transition-colors">
                
                {/* 1. Name & Provider */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-2">
                    {getProviderBadge(w.provider)}
                    <div>
                      <span className="font-bold text-gray-900 block text-xs">{w.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{w.region} • ID: {w.id}</span>
                    </div>
                  </div>
                </td>

                {/* 2. Environment */}
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                    w.isProduction
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}>
                    {w.environment}
                  </span>
                </td>

                {/* 3. Telemetry Metrics */}
                <td className="py-3.5 px-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-gray-400">CPU:</span>
                      <span className={`font-mono font-bold ${w.cpu < 2.0 ? 'text-emerald-700' : 'text-gray-900'}`}>{w.cpu}%</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-400">Net:</span>
                      <span className="font-mono text-gray-700">{w.network_kbps} MB/s</span>
                    </div>
                    <div className="flex items-center space-x-1 text-[10px] text-gray-500">
                      <span>Sockets: <strong className="font-mono text-gray-700">{w.active_connections} TCP</strong></span>
                      <span>•</span>
                      <span>IOPS: <strong className="text-gray-700">{w.iops}</strong></span>
                    </div>
                  </div>
                </td>

                {/* 4. Idle Confidence */}
                <td className="py-3.5 px-4">
                  {w.isProduction ? (
                    <span className="text-gray-400 text-[11px] italic">Active Production</span>
                  ) : (
                    <div className="space-y-1">
                      <span className="font-mono font-bold text-emerald-700 text-xs">
                        {w.idle_confidence}% Confidence
                      </span>
                      <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${w.idle_confidence}%` }}
                        />
                      </div>
                    </div>
                  )}
                </td>

                {/* 5. Current Spend */}
                <td className="py-3.5 px-4 font-mono">
                  <span className="font-bold text-gray-900">${w.current_cost_day.toFixed(2)}</span>
                  <span className="text-[10px] text-gray-400">/day</span>
                </td>

                {/* 6. Potential Savings */}
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                  {w.potential_savings_day > 0 ? (
                    <span>+${w.potential_savings_day.toFixed(2)}/day</span>
                  ) : (
                    <span className="text-gray-400 font-normal">$0.00 (Protected)</span>
                  )}
                </td>

                {/* 7. Status & Last Activity */}
                <td className="py-3.5 px-4">
                  <div className="space-y-1">
                    <div>{getStateBadge(w.state, w.isProduction)}</div>
                    <span className="text-[10px] text-gray-400 block truncate max-w-[140px]" title={w.last_activity}>
                      {w.last_activity}
                    </span>
                  </div>
                </td>

                {/* 8. Action Buttons (Inspect, Snapshot, Reclaim, Hydrate) */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end space-x-1.5">
                    
                    {/* Inspect Button */}
                    <button
                      onClick={() => onInspect && onInspect(w)}
                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors"
                      title="Inspect Workload Telemetry"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* Snapshot Button */}
                    <button
                      onClick={() => handleSnapshotQuick(w)}
                      className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
                      title="Create 30-Day Recovery Snapshot"
                    >
                      <Lock className="w-3.5 h-3.5" />
                    </button>

                    {/* Reclaim or Hydrate Button */}
                    {w.isProduction ? (
                      <span className="text-[11px] font-semibold text-gray-400 italic px-2">
                        Locked
                      </span>
                    ) : w.state === 'RUNNING' ? (
                      <button
                        onClick={() => onSafeReclaim && onSafeReclaim(w)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Safe Reclaim</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onHydrate && onHydrate(w)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Hydrate</span>
                      </button>
                    )}

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
