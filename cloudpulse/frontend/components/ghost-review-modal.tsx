'use client'

import React, { useState } from 'react'
import { GhostAsset } from '@/lib/demo-store'
import { 
  Ghost, 
  Trash2, 
  ShieldAlert, 
  ShieldCheck, 
  X, 
  HardDrive, 
  Network, 
  Layers, 
  CheckCircle2,
  Lock,
  AlertTriangle
} from 'lucide-react'

interface GhostReviewModalProps {
  ghosts: GhostAsset[]
  isOpen: boolean
  onClose: () => void
  onConfirmPurgeAll: () => void
}

export function GhostReviewModal({ ghosts, isOpen, onClose, onConfirmPurgeAll }: GhostReviewModalProps) {
  const [isPurging, setIsPurging] = useState(false)
  const [confirmedSafe, setConfirmedSafe] = useState(true)

  if (!isOpen) return null

  const orphanedGhosts = ghosts.filter(g => g.status === 'ORPHANED')
  const totalWasteMonth = orphanedGhosts.reduce((sum, g) => sum + g.monthly_cost, 0)
  const totalStorageGb = orphanedGhosts.reduce((sum, g) => sum + g.size_gb, 0)

  const handlePurge = () => {
    setIsPurging(true)
    setTimeout(() => {
      setIsPurging(false)
      onConfirmPurgeAll()
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-gray-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-gray-900 space-y-5 p-6 max-h-[90vh] flex flex-col justify-between">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shadow-sm">
                <Ghost className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">Review All Ghost Cloud Resources</h3>
                <p className="text-xs text-gray-500 mt-0.5">Automated 30-day snapshot vaulting prior to release</p>
              </div>
            </div>

            <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2.5 my-4 text-center">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="text-[10px] text-amber-800 font-bold uppercase block">Ghost Assets</span>
              <span className="text-lg font-extrabold text-amber-900 font-mono mt-0.5">{orphanedGhosts.length} Resources</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-[10px] text-emerald-800 font-bold uppercase block">Monthly Waste Reclaim</span>
              <span className="text-lg font-extrabold text-emerald-700 font-mono mt-0.5">+${totalWasteMonth.toFixed(2)}/mo</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
              <span className="text-[10px] text-blue-800 font-bold uppercase block">Storage Released</span>
              <span className="text-lg font-extrabold text-blue-700 font-mono mt-0.5">{totalStorageGb} GB</span>
            </div>
          </div>

          {/* Asset List Preview */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {orphanedGhosts.map((g) => (
              <div key={g.id} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="p-1 rounded-lg bg-white border border-gray-200 text-amber-600">
                    <Ghost className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 block">{g.name}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{g.resource_id} • {g.provider} ({g.region}) • Age: {g.age_days}d</span>
                  </div>
                </div>

                <span className="font-mono font-bold text-amber-700">${g.monthly_cost.toFixed(2)}/mo</span>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Note & Action Buttons */}
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center space-x-2">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Safety Protected:</strong> Point-in-time snapshots of all unattached storage volumes will be archived in the 30-Day Snapshot Vault before purge.
            </span>
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handlePurge}
              disabled={isPurging || orphanedGhosts.length === 0}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-700/20 transition-all hover:scale-105 active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isPurging ? 'Vaulting & Purging...' : `Vault & Purge ${orphanedGhosts.length} Ghost Assets`}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
