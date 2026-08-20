'use client'

import React, { useEffect, useState } from 'react'
import { CloudPulseAPI, Policy } from '@/lib/api'
import { PolicyEditor } from '@/components/policy-editor'
import { Sliders } from 'lucide-react'

export default function PoliciesPage() {
  const [policy, setPolicy] = useState<Policy | null>(null)
  const [loading, setLoading] = useState(true)

  const loadPolicy = async () => {
    try {
      const data = await CloudPulseAPI.getPolicy()
      setPolicy(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPolicy()
  }, [])

  return (
    <div className="space-y-6">
      <div className="border-b border-border/80 pb-5">
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Sliders className="w-6 h-6 text-cyan-400" />
          <span>FinOps Policy Threshold Configuration</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Define multi-variable logical AND criteria for CPU utilization, Network bandwidth, active connections, and dry-run execution settings.
        </p>
      </div>

      {policy && <PolicyEditor initialPolicy={policy} onSaved={loadPolicy} />}
    </div>
  )
}
