'use client'

import React from 'react'
import { GhostTable } from '@/components/ghost-table'
import { SnapshotVault } from '@/components/snapshot-vault'
import { Ghost, ShieldCheck } from 'lucide-react'

export default function GhostPage() {
  return (
    <div className="space-y-8 text-gray-900">
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center space-x-2.5 mb-1">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <Ghost className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Ghost Infrastructure Reaper Engine
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Eliminate silent recurring waste from unattached EBS disks, unassociated Elastic IPs, orphaned snapshots, and idle ALBs.
            </p>
          </div>
        </div>
      </div>

      <GhostTable />

      <SnapshotVault />
    </div>
  )
}
