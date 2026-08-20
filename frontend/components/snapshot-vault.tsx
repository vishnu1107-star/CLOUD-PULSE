'use client'

import React, { useState } from 'react'
import { ShieldCheck, HardDrive, RotateCcw, Clock, Download, CheckCircle2, AlertCircle } from 'lucide-react'
import { useToast } from '@/components/toast'

interface SnapshotItem {
  id: string
  snapshotId: string
  sourceVolume: string
  sizeGb: number
  region: string
  createdAt: string
  retentionDays: number
  status: 'SAFE_VAULT' | 'RESTORED'
}

const initialSnapshots: SnapshotItem[] = [
  {
    id: '1',
    snapshotId: 'snap-0a9912bc34df',
    sourceVolume: 'vol-0a1b2c3d4e5f6g7h8 (unattached-staging-backup)',
    sizeGb: 250,
    region: 'us-east-1',
    createdAt: 'Today, 10:15 AM',
    retentionDays: 30,
    status: 'SAFE_VAULT'
  },
  {
    id: '2',
    snapshotId: 'snap-088711ef90ab',
    sourceVolume: 'vol-088a99b88c77d66e2 (dev-legacy-test-disk)',
    sizeGb: 100,
    region: 'us-west-2',
    createdAt: 'Yesterday, 04:30 PM',
    retentionDays: 29,
    status: 'SAFE_VAULT'
  },
  {
    id: '3',
    snapshotId: 'snap-077610cd56ba',
    sourceVolume: 'vol-077a88b77c66d55e1 (qa-dataset-archive)',
    sizeGb: 500,
    region: 'us-east-1',
    createdAt: '3 days ago',
    retentionDays: 27,
    status: 'SAFE_VAULT'
  }
]

export function SnapshotVault() {
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>(initialSnapshots)
  const [restoringId, setRestoringId] = useState<string | null>(null)
  const { showToast } = useToast()

  const handleRestore = (id: string, snapshotId: string) => {
    setRestoringId(id)
    setTimeout(() => {
      setRestoringId(null)
      setSnapshots(prev => prev.map(s => s.id === id ? { ...s, status: 'RESTORED' } : s))
      showToast({
        type: 'success',
        title: 'Volume Restored Successfully',
        description: `Restored snapshot ${snapshotId} to a new active EBS volume.`
      })
    }, 1200)
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Disaster Recovery & Snapshot Vault</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated 30-day point-in-time snapshots created prior to any ghost disk purge with 1-click recovery.
          </p>
        </div>

        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold">
          100% Zero Data Loss Guarantee
        </span>
      </div>

      {/* Snapshot Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/90 font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Snapshot ID & Source</th>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Region</th>
              <th className="py-3 px-4">Created Date</th>
              <th className="py-3 px-4">Retention</th>
              <th className="py-3 px-4 text-right">Recovery Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {snapshots.map((snap) => (
              <tr key={snap.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="font-mono font-bold text-white block">{snap.snapshotId}</span>
                      <span className="text-[11px] text-slate-400">{snap.sourceVolume}</span>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 font-mono font-bold text-slate-200">{snap.sizeGb} GB</td>
                <td className="py-3.5 px-4 font-mono text-slate-400">{snap.region}</td>
                <td className="py-3.5 px-4 text-slate-400">{snap.createdAt}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                    {snap.retentionDays} Days Remaining
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right">
                  {snap.status === 'SAFE_VAULT' ? (
                    <button
                      onClick={() => handleRestore(snap.id, snap.snapshotId)}
                      disabled={restoringId === snap.id}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${restoringId === snap.id ? 'animate-spin' : ''}`} />
                      <span>{restoringId === snap.id ? 'Restoring...' : 'Restore to Volume'}</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Volume Restored</span>
                    </span>
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
