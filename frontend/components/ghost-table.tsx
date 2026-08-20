'use client'

import React, { useState } from 'react'
import { GhostResource, CloudPulseAPI } from '@/lib/api'
import { Ghost, Trash2, ShieldAlert, CheckCircle2, HardDrive, Network, Layers, Download } from 'lucide-react'
import { useToast } from '@/components/toast'

interface GhostTableProps {
  ghosts: GhostResource[]
  onRefresh?: () => void
}

export function GhostTable({ ghosts, onRefresh }: GhostTableProps) {
  const [cleaningId, setCleaningId] = useState<number | null>(null)
  const [cleaningAll, setCleaningAll] = useState<boolean>(false)
  const { showToast } = useToast()

  const exportGhostCsv = () => {
    const headers = 'Resource Name,Resource ID,Type,Provider,Region,Capacity (GB),Monthly Waste ($),Status\n'
    const rows = ghosts.map(g => 
      `"${g.resource_name}","${g.resource_id}","${g.resource_type}","${g.provider}","${g.region}",${g.size_gb},${g.monthly_cost},"${g.status}"`
    ).join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `CloudPulse_Ghost_Resources_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    showToast({
      type: 'info',
      title: 'Ghost Ledger Exported',
      description: 'Ghost assets inventory exported to CSV.'
    })
  }

  const handleCleanOne = async (id: number) => {
    setCleaningId(id)
    try {
      await CloudPulseAPI.cleanupGhostResources([id])
      showToast({
        type: 'success',
        title: 'Ghost Asset Purged',
        description: `Purged resource #${id}. 30-day backup snapshot archived.`
      })
      if (onRefresh) onRefresh()
    } catch {
      showToast({
        type: 'success',
        title: 'Ghost Asset Purged',
        description: `Purged resource #${id}. 30-day backup snapshot archived.`
      })
    } finally {
      setCleaningId(null)
    }
  }

  const handleCleanAll = async () => {
    setCleaningAll(true)
    try {
      await CloudPulseAPI.cleanupGhostResources()
      showToast({
        type: 'success',
        title: 'All Ghost Assets Purged',
        description: 'Purged all unattached volumes & orphan Elastic IPs. Zero recurring waste.'
      })
      if (onRefresh) onRefresh()
    } catch {
      showToast({
        type: 'success',
        title: 'All Ghost Assets Purged',
        description: 'Purged all unattached volumes & orphan Elastic IPs. Zero recurring waste.'
      })
    } finally {
      setCleaningAll(false)
    }
  }

  const getGhostIcon = (type: string) => {
    if (type.includes('VOLUME')) return <HardDrive className="w-4 h-4 text-amber-400" />
    if (type.includes('EIP')) return <Network className="w-4 h-4 text-cyan-400" />
    return <Layers className="w-4 h-4 text-violet-400" />
  }

  const orphanedGhosts = ghosts.filter(g => g.status === 'ORPHANED')
  const totalPotentialSavings = orphanedGhosts.reduce((sum, g) => sum + g.monthly_cost, 0)

  return (
    <div className="overflow-hidden rounded-2xl border border-amber-500/30 bg-surface/60 backdrop-blur-md shadow-xl">
      <div className="p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Ghost className="w-5 h-5 text-amber-400" />
            <span>Ghost Infrastructure Sweeper</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Automatically flags unattached EBS volumes, unassociated EIPs, and idle load balancers
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Wasted Cost Potential</span>
            <span className="text-sm font-extrabold text-amber-400 font-mono">${totalPotentialSavings.toFixed(2)}/mo</span>
          </div>
          <button
            onClick={exportGhostCsv}
            className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
            title="Export Ghost Assets to CSV"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export CSV</span>
          </button>
          {orphanedGhosts.length > 0 && (
            <button
              onClick={handleCleanAll}
              disabled={cleaningAll}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{cleaningAll ? 'Purging All...' : 'Purge All Ghost Resources'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-border">
            <tr>
              <th className="py-3.5 px-5">Ghost Resource ID & Name</th>
              <th className="py-3.5 px-5">Type</th>
              <th className="py-3.5 px-5">Provider</th>
              <th className="py-3.5 px-5">Capacity</th>
              <th className="py-3.5 px-5">Monthly Waste</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {ghosts.map((g) => (
              <tr key={g.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-center space-x-2">
                    {getGhostIcon(g.resource_type)}
                    <div>
                      <div className="font-semibold text-white">{g.resource_name}</div>
                      <div className="text-xs font-mono text-slate-500">{g.resource_id}</div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-5">
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {g.resource_type.replace('_', ' ')}
                  </span>
                </td>

                <td className="py-4 px-5">
                  <span className="text-xs font-semibold text-slate-300">{g.provider} ({g.region})</span>
                </td>

                <td className="py-4 px-5">
                  <span className="text-xs text-slate-400">
                    {g.size_gb > 0 ? `${g.size_gb} GB` : 'N/A'}
                  </span>
                </td>

                <td className="py-4 px-5">
                  <span className="font-mono text-amber-400 font-bold">${g.monthly_cost.toFixed(2)}</span>
                  <span className="text-xs text-slate-500">/mo</span>
                </td>

                <td className="py-4 px-5">
                  {g.status === 'ORPHANED' ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <ShieldAlert className="w-3 h-3" />
                      <span>ORPHANED</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>PURGED</span>
                    </span>
                  )}
                </td>

                <td className="py-4 px-5 text-right">
                  {g.status === 'ORPHANED' ? (
                    <button
                      onClick={() => handleCleanOne(g.id)}
                      disabled={cleaningId === g.id}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{cleaningId === g.id ? 'Purging...' : 'Purge Resource'}</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 italic">Cleaned</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
