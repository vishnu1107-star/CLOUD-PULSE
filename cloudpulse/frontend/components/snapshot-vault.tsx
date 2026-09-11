'use client'

import React, { useState } from 'react'
import { VaultSnapshot, initialVaultSnapshots } from '@/lib/demo-store'
import { 
  ShieldCheck, 
  HardDrive, 
  RotateCcw, 
  Clock, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Lock,
  Trash2,
  Eye,
  Zap,
  Info
} from 'lucide-react'
import { useToast } from '@/components/toast'

export function SnapshotVault() {
  const [snapshots, setSnapshots] = useState<VaultSnapshot[]>(initialVaultSnapshots)
  const [restoringId, setRestoringId] = useState<string | null>(null)
  const [selectedSnapshot, setSelectedSnapshot] = useState<VaultSnapshot | null>(null)
  const { showToast } = useToast()

  const handleRestore = (snap: VaultSnapshot) => {
    setRestoringId(snap.id)
    setTimeout(() => {
      setRestoringId(null)
      setSnapshots(prev => prev.map(s => s.id === snap.id ? { ...s, status: 'RESTORED' } : s))
      showToast({
        type: 'success',
        title: 'Workload Restored From Snapshot',
        description: `Restored ${snap.workload_name} in ${snap.restore_time_benchmark} with zero data loss.`
      })
    }, 1200)
  }

  const handleDelete = (id: string, name: string) => {
    setSnapshots(prev => prev.filter(s => s.id !== id))
    showToast({
      type: 'info',
      title: 'Snapshot Purged',
      description: `Removed snapshot for ${name}.`
    })
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold text-gray-900">Snapshot Vault &amp; Recovery Trust Center</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  AES-256 Encrypted
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Automated 30-day point-in-time state recovery points created prior to every autonomous reclamation.
              </p>
            </div>
          </div>
        </div>

        {/* Prompt #11: Core Reversibility Message */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 font-bold flex items-center space-x-1.5 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Every reclamation action is reversible.</span>
          </span>
        </div>
      </div>

      {/* Snapshot Inventory Table (Prompt #11: Resource, Snapshot ID, Created time, Retention, Status, Restore button) */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-50/80 font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 text-[10px]">
            <tr>
              <th className="py-3 px-4">RESOURCE</th>
              <th className="py-3 px-4">SNAPSHOT ID</th>
              <th className="py-3 px-4">CREATED TIME</th>
              <th className="py-3 px-4">RETENTION</th>
              <th className="py-3 px-4">SIZE &amp; ENCRYPTION</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {snapshots.map((snap) => (
              <tr key={snap.id} className="hover:bg-gray-50/80 transition-colors">
                
                {/* 1. RESOURCE */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
                      <HardDrive className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block text-xs">{snap.workload_name}</span>
                      <span className="font-mono text-[10px] text-gray-400">{snap.provider} ({snap.region})</span>
                    </div>
                  </div>
                </td>

                {/* 2. SNAPSHOT ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                  {snap.snapshot_id}
                </td>

                {/* 3. CREATED TIME */}
                <td className="py-3.5 px-4 text-gray-600 font-medium whitespace-nowrap">
                  {snap.created_at}
                </td>

                {/* 4. RETENTION */}
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-bold text-[11px] border border-blue-200">
                    {snap.retention_days} Days (30-Day Policy)
                  </span>
                </td>

                {/* 5. SIZE & ENCRYPTION */}
                <td className="py-3.5 px-4">
                  <div className="font-mono font-bold text-gray-900">{snap.size_gb} GB</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">{snap.encryption}</div>
                </td>

                {/* 6. STATUS */}
                <td className="py-3.5 px-4">
                  {snap.status === 'VAULTED' ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>VAULTED / READY</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      <span>RESTORED</span>
                    </span>
                  )}
                </td>

                {/* 7. RESTORE ACTION BUTTON */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end space-x-1.5">
                    
                    {/* View Details */}
                    <button
                      onClick={() => setSelectedSnapshot(snap)}
                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* Restore Button */}
                    {snap.status === 'VAULTED' ? (
                      <button
                        onClick={() => handleRestore(snap)}
                        disabled={restoringId === snap.id}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all"
                      >
                        <Zap className={`w-3.5 h-3.5 fill-current ${restoringId === snap.id ? 'animate-spin' : ''}`} />
                        <span>{restoringId === snap.id ? 'Hydrating...' : 'Restore'}</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-emerald-700 text-xs font-bold px-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Restored</span>
                      </span>
                    )}

                    {/* Delete Snapshot */}
                    <button
                      onClick={() => handleDelete(snap.id, snap.workload_name)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Snapshot"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Snapshot Details Modal */}
      {selectedSnapshot && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-gray-200 shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-indigo-600" />
                <h4 className="text-base font-bold text-gray-900">Snapshot Vault Details</h4>
              </div>
              <button onClick={() => setSelectedSnapshot(null)} className="p-1 text-gray-400 hover:text-gray-700">
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Resource Workload:</span>
                <strong className="text-gray-900 font-mono">{selectedSnapshot.workload_name}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Snapshot ID:</span>
                <span className="font-mono text-indigo-600 font-bold">{selectedSnapshot.snapshot_id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Region &amp; Cloud:</span>
                <span className="text-gray-900">{selectedSnapshot.provider} ({selectedSnapshot.region})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Volume Size:</span>
                <span className="font-mono font-bold text-gray-900">{selectedSnapshot.size_gb} GB</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Retention Policy:</span>
                <span className="text-blue-700 font-bold">30 Days Automated Point-in-Time</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Encryption:</span>
                <span className="text-emerald-700 font-bold">{selectedSnapshot.encryption}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedSnapshot(null)}
              className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
