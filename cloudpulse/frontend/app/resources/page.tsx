'use client'

import React, { useState } from 'react'
import { WorkloadItem, initialWorkloads } from '@/lib/demo-store'
import { ResourceTable } from '@/components/resource-table'
import { SafeReclaimModal } from '@/components/safe-reclaim-modal'
import { HydrationModal } from '@/components/hydration-modal'
import { WorkloadInspectModal } from '@/components/workload-inspect-modal'
import { Server, Filter, Sparkles, ShieldCheck, Zap } from 'lucide-react'
import { useToast } from '@/components/toast'

export default function ResourcesPage() {
  const [workloads, setWorkloads] = useState<WorkloadItem[]>(initialWorkloads)
  const [inspectWorkload, setInspectWorkload] = useState<WorkloadItem | null>(null)
  const [reclaimWorkload, setReclaimWorkload] = useState<WorkloadItem | null>(null)
  const [hydrateWorkload, setHydrateWorkload] = useState<WorkloadItem | null>(null)
  const { showToast } = useToast()

  const handleConfirmReclaim = (w: WorkloadItem) => {
    setWorkloads(prev => prev.map(item => {
      if (item.id === w.id) {
        return {
          ...item,
          state: 'PAUSED',
          recommended_action: 'Safe to reclaim',
          snapshot_id: 'vault-snap-' + Math.floor(1000 + Math.random() * 9000)
        }
      }
      return item
    }))
    showToast({
      type: 'success',
      title: 'Safe Reclamation Executed',
      description: `Paused ${w.name}. Created 30-day recovery snapshot. Reclaiming $${w.potential_savings_day.toFixed(2)}/day.`
    })
  }

  const handleConfirmHydrate = (w: WorkloadItem) => {
    setWorkloads(prev => prev.map(item => {
      if (item.id === w.id) {
        return {
          ...item,
          state: 'RUNNING'
        }
      }
      return item
    }))
    showToast({
      type: 'success',
      title: 'Warm Hydration Complete (2.34s benchmark)',
      description: `${w.name} is healthy and live in production routing. Snapshot-protected rollback available.`
    })
  }

  return (
    <div className="space-y-6 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Workloads &amp; Autonomous Reclamation Fleet
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Multi-cloud inventory (AWS EC2, GCP Compute, K8s). Production workloads protected by default.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Production Protected</span>
          </span>
        </div>
      </div>

      {/* Resource Table with Interactive Modals */}
      <ResourceTable 
        workloads={workloads}
        onInspect={(w) => setInspectWorkload(w)}
        onSafeReclaim={(w) => setReclaimWorkload(w)}
        onHydrate={(w) => setHydrateWorkload(w)}
      />

      {/* Interactive Modals */}
      <WorkloadInspectModal
        workload={inspectWorkload}
        isOpen={inspectWorkload !== null}
        onClose={() => setInspectWorkload(null)}
        onReclaim={(w) => setReclaimWorkload(w)}
        onHydrate={(w) => setHydrateWorkload(w)}
      />

      <SafeReclaimModal
        workload={reclaimWorkload}
        isOpen={reclaimWorkload !== null}
        onClose={() => setReclaimWorkload(null)}
        onConfirmReclaim={handleConfirmReclaim}
      />

      <HydrationModal
        workload={hydrateWorkload}
        isOpen={hydrateWorkload !== null}
        onClose={() => setHydrateWorkload(null)}
        onCompleteHydrate={handleConfirmHydrate}
      />

    </div>
  )
}
