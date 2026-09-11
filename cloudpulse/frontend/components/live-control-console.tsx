'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { CloudPulseAPI, AnalyticsSummary } from '@/lib/api'
import { WorkloadItem, initialWorkloads } from '@/lib/demo-store'
import { KpiMoneySavedSection } from '@/components/kpi-money-saved'
import { ResourceTable } from '@/components/resource-table'
import { SavingsChart } from '@/components/savings-chart'
import { CaseStudyWidget } from '@/components/case-study-modal'
import { JudgeDemoModal } from '@/components/judge-demo-modal'
import { SafeReclaimModal } from '@/components/safe-reclaim-modal'
import { HydrationModal } from '@/components/hydration-modal'
import { WorkloadInspectModal } from '@/components/workload-inspect-modal'
import { useToast } from '@/components/toast'
import { 
  DollarSign, 
  Leaf, 
  Server, 
  Ghost, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  Calculator,
  ShieldCheck,
  Zap,
  Lock,
  RotateCcw,
  CheckCircle2
} from 'lucide-react'

export function LiveControlConsole() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [workloads, setWorkloads] = useState<WorkloadItem[]>(initialWorkloads)
  const [loading, setLoading] = useState(true)

  // Interactive Modal States
  const [judgeDemoOpen, setJudgeDemoOpen] = useState(false)
  const [inspectWorkload, setInspectWorkload] = useState<WorkloadItem | null>(null)
  const [reclaimWorkload, setReclaimWorkload] = useState<WorkloadItem | null>(null)
  const [hydrateWorkload, setHydrateWorkload] = useState<WorkloadItem | null>(null)

  const { showToast } = useToast()

  const loadDashboardData = async () => {
    try {
      const aData = await CloudPulseAPI.getAnalyticsSummary()
      setAnalytics(aData)
    } catch (err) {
      console.error("Dashboard data load error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

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

  if (loading || !analytics) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-gray-500 space-y-3 bg-white rounded-3xl border border-gray-200 shadow-sm">
        <Activity className="w-6 h-6 animate-spin text-blue-600" />
        <span className="text-sm font-medium">Analyzing non-production fleet telemetry...</span>
      </div>
    )
  }

  return (
    <div id="live-prototype-console" className="space-y-10 pt-6 border-t border-gray-200">
      
      {/* Interactive Prototype Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-sm">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Live Autonomous Control Console
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Closed-Loop Engine Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Multi-signal telemetry evaluation, 1-click snapshot vaulting, and sub-2.34s warm hydration.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setJudgeDemoOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            <span>60-Sec Judge Demo</span>
          </button>

          <Link
            href="/roi"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold border border-gray-300 shadow-sm transition-all"
          >
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>ROI Calculator</span>
          </Link>
        </div>
      </div>

      {/* 2 & 3. 7 Prominent KPI Cards + Money Saved Flowchart */}
      <KpiMoneySavedSection onOpenJudgeDemo={() => setJudgeDemoOpen(true)} />

      {/* Analytics Chart & Case Study Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SavingsChart />
        </div>
        <div className="lg:col-span-1">
          <CaseStudyWidget />
        </div>
      </div>

      {/* Workload Fleet Inventory Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-gray-900">
                Multi-Cloud Fleet Telemetry &amp; Workload States
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                AWS • GCP • K8s
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Continuously evaluated with 5-dimensional anomaly isolation scoring. Production resources protected by default.
            </p>
          </div>
          
          <Link
            href="/resources"
            className="inline-flex items-center space-x-1.5 text-xs text-blue-600 font-bold hover:text-blue-700"
          >
            <span>Full Inventory &amp; Filtering</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Fleet Table with Interactive Modals */}
        <ResourceTable 
          workloads={workloads}
          onInspect={(w) => setInspectWorkload(w)}
          onSafeReclaim={(w) => setReclaimWorkload(w)}
          onHydrate={(w) => setHydrateWorkload(w)}
        />
      </div>

      {/* Interactive Modals */}
      <JudgeDemoModal
        isOpen={judgeDemoOpen}
        onClose={() => setJudgeDemoOpen(false)}
      />

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
