'use client'

import React, { useState } from 'react'
import { GhostAsset, initialGhostAssets } from '@/lib/demo-store'
import { GhostReviewModal } from '@/components/ghost-review-modal'
import { 
  Ghost, 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  HardDrive, 
  Network, 
  Layers, 
  Download,
  AlertTriangle,
  Lock,
  Sparkles,
  ShieldCheck,
  Info
} from 'lucide-react'
import { useToast } from '@/components/toast'

interface GhostTableProps {
  ghosts?: GhostAsset[]
  onRefresh?: () => void
}

export function GhostTable({ ghosts: initialList = initialGhostAssets, onRefresh }: GhostTableProps) {
  const [ghosts, setGhosts] = useState<GhostAsset[]>(initialList)
  const [cleaningId, setCleaningId] = useState<string | null>(null)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const { showToast } = useToast()

  const exportGhostCsv = () => {
    const headers = 'Resource Name,Resource ID,Type,Provider,Region,Age (Days),Capacity (GB),Estimated Monthly Waste ($),Risk,Recommended Action,Status\n'
    const rows = ghosts.map(g => 
      `"${g.name}","${g.resource_id}","${g.type}","${g.provider}","${g.region}",${g.age_days},${g.size_gb},${g.monthly_cost},"${g.risk}","${g.recommended_action}","${g.status}"`
    ).join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `CloudPulse_Ghost_Assets_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    showToast({
      type: 'info',
      title: 'Ghost Ledger Exported',
      description: 'Ghost asset inventory exported to CSV.'
    })
  }

  const handleCleanOne = (id: string, name: string) => {
    setCleaningId(id)
    setTimeout(() => {
      setGhosts(prev => prev.map(g => g.id === id ? { ...g, status: 'PURGED' } : g))
      setCleaningId(null)
      showToast({
        type: 'success',
        title: 'Ghost Asset Safely Purged',
        description: `Vaulted 30-day snapshot and released ${name}. Saved recurring waste.`
      })
      if (onRefresh) onRefresh()
    }, 800)
  }

  const handleConfirmPurgeAll = () => {
    setGhosts(prev => prev.map(g => ({ ...g, status: 'PURGED' })))
    showToast({
      type: 'success',
      title: 'All Ghost Assets Reclaimed',
      description: 'Vaulted snapshots for all unattached storage and released orphan IPs.'
    })
    if (onRefresh) onRefresh()
  }

  const getGhostIcon = (type: string) => {
    if (type.includes('VOLUME') || type.includes('DISK')) return <HardDrive className="w-4 h-4 text-amber-600" />
    if (type.includes('EIP')) return <Network className="w-4 h-4 text-blue-600" />
    if (type.includes('SNAPSHOT')) return <Lock className="w-4 h-4 text-indigo-600" />
    return <Layers className="w-4 h-4 text-violet-600" />
  }

  const orphanedGhosts = ghosts.filter(g => g.status === 'ORPHANED')
  const totalPotentialSavings = orphanedGhosts.reduce((sum, g) => sum + g.monthly_cost, 0)

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm space-y-0 text-gray-900">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Ghost className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-gray-900">Ghost Infrastructure Sweeper</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                  {orphanedGhosts.length} Detected
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Automatically identifies unattached storage, idle load balancers, orphaned resources, and unused Elastic IPs.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-gray-400 block">Estimated Monthly Waste</span>
            <span className="text-sm font-black text-amber-700 font-mono">+${totalPotentialSavings.toFixed(2)}/mo</span>
          </div>

          <button
            onClick={exportGhostCsv}
            className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 text-xs font-semibold shadow-xs transition-all"
            title="Export Ghost Assets to CSV"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          {orphanedGhosts.length > 0 && (
            <button
              onClick={() => setReviewModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>Review All Ghost Resources</span>
            </button>
          )}
        </div>
      </div>

      {/* Safety Message (Prompt #10) */}
      <div className="px-6 py-3 bg-amber-50/60 border-b border-amber-100 flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span className="font-semibold">Reclaim only after safety validation.</span>
          <span className="text-gray-500 hidden sm:inline">— All storage assets are backed up to the 30-day Snapshot Vault before purge.</span>
        </div>
        <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-amber-200 font-bold">
          Zero-Data-Loss Safety
        </span>
      </div>

      {/* Table (Prompt #10: RESOURCE, STATUS, ESTIMATED MONTHLY WASTE, RECOMMENDED ACTION) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-50/80 font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 text-[10px]">
            <tr>
              <th className="py-3 px-4">RESOURCE</th>
              <th className="py-3 px-4">ASSET TYPE</th>
              <th className="py-3 px-4">AGE &amp; CAPACITY</th>
              <th className="py-3 px-4">ESTIMATED MONTHLY WASTE</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4">RECOMMENDED ACTION</th>
              <th className="py-3 px-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ghosts.map((g) => (
              <tr key={g.id} className="hover:bg-gray-50/80 transition-colors">
                
                {/* 1. RESOURCE */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 rounded-lg bg-gray-100 border border-gray-200">
                      {getGhostIcon(g.type)}
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block text-xs">{g.name}</span>
                      <span className="text-[10px] font-mono text-gray-400">{g.resource_id} • {g.provider} ({g.region})</span>
                    </div>
                  </div>
                </td>

                {/* 2. TYPE */}
                <td className="py-3.5 px-4">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 border border-gray-200">
                    {g.type.replace(/_/g, ' ')}
                  </span>
                </td>

                {/* 3. AGE & CAPACITY */}
                <td className="py-3.5 px-4 text-gray-600 font-medium">
                  {g.age_days}d old {g.size_gb > 0 ? `• ${g.size_gb} GB` : ''}
                </td>

                {/* 4. ESTIMATED MONTHLY WASTE */}
                <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                  ${g.monthly_cost.toFixed(2)}/mo
                </td>

                {/* 5. STATUS */}
                <td className="py-3.5 px-4">
                  {g.status === 'ORPHANED' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      UNATTACHED / ORPHAN
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>PURGED / VAULTED</span>
                    </span>
                  )}
                </td>

                {/* 6. RECOMMENDED ACTION */}
                <td className="py-3.5 px-4">
                  <span className="text-gray-800 font-medium text-[11px]">
                    {g.recommended_action}
                  </span>
                </td>

                {/* 7. ACTION */}
                <td className="py-3.5 px-4 text-right">
                  {g.status === 'ORPHANED' ? (
                    <button
                      onClick={() => handleCleanOne(g.id, g.name)}
                      disabled={cleaningId === g.id}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{cleaningId === g.id ? 'Purging...' : 'Reclaim'}</span>
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 italic">Protected</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ghost Review Confirmation Modal */}
      <GhostReviewModal
        ghosts={ghosts}
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onConfirmPurgeAll={handleConfirmPurgeAll}
      />

    </div>
  )
}
