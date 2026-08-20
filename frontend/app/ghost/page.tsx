'use client'

import React, { useEffect, useState } from 'react'
import { CloudPulseAPI, GhostResource } from '@/lib/api'
import { GhostTable } from '@/components/ghost-table'
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
    <div className="space-y-6">
      <div className="border-b border-border/80 pb-5">
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Ghost className="w-6 h-6 text-amber-400" />
          <span>Ghost Infrastructure Sweeper Engine</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Eliminate silent recurring billing from unattached EBS disks (state: available), unassociated Elastic IPs, and idle Load Balancers.
        </p>
      </div>

      <GhostTable ghosts={ghosts} onRefresh={loadGhosts} />
    </div>
  )
}
