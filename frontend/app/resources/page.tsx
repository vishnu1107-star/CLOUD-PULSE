'use client'

import React, { useEffect, useState } from 'react'
import { CloudPulseAPI, Resource } from '@/lib/api'
import { ResourceTable } from '@/components/resource-table'
import { Server, Filter } from 'lucide-react'

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [filterEnv, setFilterEnv] = useState<string>('ALL')
  const [loading, setLoading] = useState(true)

  const loadResources = async () => {
    try {
      const data = await CloudPulseAPI.getResources()
      setResources(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadResources()
  }, [])

  const filteredResources = filterEnv === 'ALL'
    ? resources
    : resources.filter(r => r.environment.toLowerCase() === filterEnv.toLowerCase())

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Server className="w-6 h-6 text-emerald-400" />
            <span>Infrastructure Workloads & Re-Activation Portal</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            View discovered multi-cloud resources (AWS EC2, GCP GCE, K8s Deployments) and trigger zero-downtime 1-click re-activation.
          </p>
        </div>

        {/* Environment Filter Tabs */}
        <div className="flex items-center space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
          {['ALL', 'Staging', 'Dev', 'QA', 'Production'].map((env) => (
            <button
              key={env}
              onClick={() => setFilterEnv(env)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterEnv === env
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {env}
            </button>
          ))}
        </div>
      </div>

      <ResourceTable resources={filteredResources} onRefresh={loadResources} />
    </div>
  )
}
