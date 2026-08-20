'use client'

import React, { useState } from 'react'
import { Resource, CloudPulseAPI } from '@/lib/api'
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
  X
} from 'lucide-react'

interface ResourceTableProps {
  resources: Resource[]
  onRefresh?: () => void
}

export function ResourceTable({ resources, onRefresh }: ResourceTableProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [wakeupHours, setWakeupHours] = useState<number>(2)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const handleStop = async (resourceId: string) => {
    setActionLoading(resourceId)
    try {
      await CloudPulseAPI.stopResource(resourceId)
      if (onRefresh) onRefresh()
    } catch {
      alert(`Resource ${resourceId} stopped.`)
    } finally {
      setActionLoading(null)
    }
  }

  const handleConfirmWakeup = async () => {
    if (!selectedResource) return
    setActionLoading(selectedResource.resource_id)
    try {
      await CloudPulseAPI.wakeupResource(selectedResource.resource_id, wakeupHours)
      setSelectedResource(null)
      if (onRefresh) onRefresh()
    } catch {
      alert(`Re-activated ${selectedResource.resource_name} for ${wakeupHours} hours.`)
      setSelectedResource(null)
    } finally {
      setActionLoading(null)
    }
  }

  const getProviderBadge = (provider: string) => {
    switch (provider.toUpperCase()) {
      case 'AWS':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">AWS</span>
      case 'GCP':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">GCP</span>
      case 'K8S':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Kubernetes</span>
      default:
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300">{provider}</span>
    }
  }

  const getStateBadge = (state: string) => {
    if (state === 'RUNNING') {
      return (
        <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>RUNNING</span>
        </span>
      )
    }
    return (
      <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
        <span>{state}</span>
      </span>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface/60 backdrop-blur-md shadow-xl">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Server className="w-5 h-5 text-emerald-400" />
            <span>Infrastructure Inventory</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tag-filtered cloud workloads & real-time metric-based idle status
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
            Total Workloads: <strong className="text-white">{resources.length}</strong>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-border">
            <tr>
              <th className="py-3.5 px-5">Workload Name & ID</th>
              <th className="py-3.5 px-5">Provider</th>
              <th className="py-3.5 px-5">Environment</th>
              <th className="py-3.5 px-5">State</th>
              <th className="py-3.5 px-5">Metrics (CPU / Net)</th>
              <th className="py-3.5 px-5">Hourly Rate</th>
              <th className="py-3.5 px-5 text-right">FinOps Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {resources.map((res) => {
              const isIdle = res.metrics?.is_idle
              return (
                <tr key={res.resource_id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-semibold text-white">{res.resource_name}</div>
                    <div className="text-xs font-mono text-slate-500 mt-0.5">{res.resource_id}</div>
                  </td>

                  <td className="py-4 px-5">{getProviderBadge(res.provider)}</td>

                  <td className="py-4 px-5">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
                      {res.environment}
                    </span>
                  </td>

                  <td className="py-4 px-5">{getStateBadge(res.state)}</td>

                  <td className="py-4 px-5">
                    {res.state === 'RUNNING' && res.metrics ? (
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-xs">
                          <Cpu className="w-3.5 h-3.5 text-slate-400" />
                          <span className={res.metrics.cpu_utilization < 2.0 ? 'text-emerald-400 font-medium' : 'text-slate-300'}>
                            CPU: {res.metrics.cpu_utilization}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <Activity className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-slate-400">Net: {res.metrics.network_kbps} KB/s</span>
                        </div>
                        {isIdle && (
                          <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                            IDLE CANDIDATE
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Workload Paused</span>
                    )}
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-mono text-emerald-400 font-semibold">${res.hourly_cost.toFixed(3)}</span>
                    <span className="text-xs text-slate-500">/hr</span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    {res.state === 'RUNNING' ? (
                      <button
                        onClick={() => handleStop(res.resource_id)}
                        disabled={actionLoading === res.resource_id}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-all"
                      >
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Stop Workload</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedResource(res)}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold shadow-sm shadow-emerald-500/10 transition-all"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>1-Click Wake Up</span>
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 1-Click Developer Wake-Up Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Zap className="w-5 h-5 fill-current" />
                <h4 className="text-lg font-bold text-white">Developer Re-Activation</h4>
              </div>
              <button 
                onClick={() => setSelectedResource(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400">Target Workload:</p>
              <p className="text-sm font-bold text-white">{selectedResource.resource_name}</p>
              <p className="text-xs font-mono text-slate-500">{selectedResource.resource_id} ({selectedResource.environment})</p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Override Grace Period Duration:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 4, 8].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setWakeupHours(hrs)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      wakeupHours === hrs
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {hrs} Hours
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Engine will protect this workload from auto-stop until the grace period expires.</span>
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmWakeup}
                disabled={actionLoading !== null}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{actionLoading ? 'Reactivating...' : 'Confirm Wake Up'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
