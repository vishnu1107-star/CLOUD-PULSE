'use client'

import React, { useEffect, useState } from 'react'
import { CloudPulseAPI, AnalyticsSummary, Resource, GhostResource } from '@/lib/api'
import { MetricCard } from '@/components/metric-card'
import { SavingsChart } from '@/components/savings-chart'
import { ResourceTable } from '@/components/resource-table'
import { SlackSimulator } from '@/components/slack-simulator'
import { formatCurrency, formatCarbon } from '@/lib/utils'
import { DollarSign, Leaf, Clock, Server, Ghost, Activity } from 'lucide-react'

export default function OverviewDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [resources, setResources] = useState<Resource[]>([])
  const [ghosts, setGhosts] = useState<GhostResource[]>([])
  const [loading, setLoading] = useState(true)

  const loadDashboardData = async () => {
    try {
      const [aData, rData, gData] = await Promise.all([
        CloudPulseAPI.getAnalyticsSummary(),
        CloudPulseAPI.getResources(),
        CloudPulseAPI.getGhostResources()
      ])
      setAnalytics(aData)
      setResources(rData)
      setGhosts(gData)
    } catch (err) {
      console.error("Dashboard data load error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 space-x-2">
        <Activity className="w-5 h-5 animate-spin text-emerald-400" />
        <span>Loading CloudPulse FinOps Engine...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Cloud Cost Optimization & Infrastructure Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time metric idle evaluation, tag-aware policy execution, zero-downtime developer re-activation, and ghost resource sweeper.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Control Loop Operational</span>
          </span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Total Financial Savings"
          value={formatCurrency(analytics.total_money_saved_usd)}
          subtitle={`${analytics.total_hours_saved} idle hours saved`}
          icon={DollarSign}
          colorScheme="emerald"
          trend="+18.4%"
        />
        <MetricCard
          title="Carbon Footprint Offset"
          value={formatCarbon(analytics.total_carbon_saved_kg)}
          subtitle="Estimated greenhouse gas avoided"
          icon={Leaf}
          colorScheme="violet"
          trend="+22.1%"
        />
        <MetricCard
          title="Active vs. Stopped Workloads"
          value={`${analytics.stopped_resources_count} / ${analytics.active_resources_count + analytics.stopped_resources_count}`}
          subtitle={`${analytics.stopped_resources_count} environments auto-paused`}
          icon={Server}
          colorScheme="cyan"
        />
        <MetricCard
          title="Ghost Waste Potential"
          value={formatCurrency(analytics.ghost_potential_monthly_savings) + '/mo'}
          subtitle={`${analytics.ghost_resources_count} unattached disks & orphaned EIPs`}
          icon={Ghost}
          colorScheme="amber"
        />
      </div>

      {/* Financial & Carbon Analytics Trend Chart */}
      <SavingsChart analytics={analytics} />

      {/* Interactive Slack Webhook Simulator */}
      <SlackSimulator />

      {/* Infrastructure Inventory Overview */}
      <ResourceTable resources={resources} onRefresh={loadDashboardData} />

    </div>
  )
}
