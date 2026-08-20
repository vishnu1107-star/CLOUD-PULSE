'use client'

import React, { useEffect, useState } from 'react'
import { CloudPulseAPI, GhostResource } from '@/lib/api'
import { GhostTable } from '@/components/ghost-table'
import { SnapshotVault } from '@/components/snapshot-vault'
import { Ghost } from 'lucide-react'

export default function GhostPage() {
  const [ghosts, setGhosts] = useState<GhostResource[]>([])
  const [loading, setLoading] = useState(true)

  const loadGhosts = async () => {
    try {
      const data = await CloudPulseAPI.getGhostResources()
      setGhosts(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGhosts()
  }, [])

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800/80 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center space-x-2.5">
          <Ghost className="w-6 h-6 text-amber-400" />
          <span>Ghost Infrastructure Sweeper Engine</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Eliminate silent recurring billing from unattached EBS disks (state: available), unassociated Elastic IPs, and idle Load Balancers.
        </p>
      </div>

      <GhostTable ghosts={ghosts} onRefresh={loadGhosts} />

      <SnapshotVault />
    </div>
  )
}
