'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { CloudPulseAPI, AnalyticsSummary, Resource, GhostResource } from '@/lib/api'
import { MetricCard } from '@/components/metric-card'
import { SavingsChart } from '@/components/savings-chart'
import { ResourceTable } from '@/components/resource-table'
import { LiveSavingsCounter } from '@/components/live-counter'
import { CaseStudyWidget } from '@/components/case-study-modal'
import { formatCurrency, formatCarbon } from '@/lib/utils'
import { 
  DollarSign, 
  Leaf, 
  Server, 
  Ghost, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Calculator,
  ShieldCheck,
  Terminal
} from 'lucide-react'

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
      <div className="flex flex-col items-center justify-center h-80 text-slate-400 space-y-3">
        <Activity className="w-6 h-6 animate-spin text-emerald-400" />
        <span className="text-sm font-medium">Initializing CloudPulse Control Engine...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      
      {/* Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Cloud Infrastructure & FinOps Overview
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Control Loop Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Autonomous metric idle detection, tag governance, sub-3s warm hydration, and ghost asset sweeping.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/roi"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 transition-all"
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>ROI Calculator</span>
          </Link>

          <Link
            href="/audit"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 transition-all"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit Ledger</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          subtitle="Greenhouse gas avoided"
          icon={Leaf}
          colorScheme="violet"
          trend="+22.1%"
        />
        <MetricCard
          title="Active vs. Paused Workloads"
          value={`${analytics.stopped_resources_count} / ${analytics.active_resources_count + analytics.stopped_resources_count}`}
          subtitle={`${analytics.stopped_resources_count} environments auto-paused`}
          icon={Server}
          colorScheme="cyan"
        />
        <MetricCard
          title="Ghost Waste Potential"
          value={formatCurrency(analytics.ghost_potential_monthly_savings) + '/mo'}
          subtitle={`${analytics.ghost_resources_count} unattached disks & IPs`}
          icon={Ghost}
          colorScheme="amber"
        />
      </div>

      {/* Main Grid: Savings Trend Chart (Left 2 cols) + Live Continuous Meter (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <SavingsChart analytics={analytics} />
        </div>
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <LiveSavingsCounter />
          
          {/* Quick Engine Governance Summary Box */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-3 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Governance Rules</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li className="flex items-center justify-between">
                  <span>Production Isolation:</span>
                  <strong className="text-emerald-400 font-medium">100% Protected</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span>Idle Rolling Window:</span>
                  <strong className="text-slate-200 font-mono">30 Minutes</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span>CPU Threshold:</span>
                  <strong className="text-slate-200 font-mono">&lt; 2.0%</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span>Warm Hydration Latency:</span>
                  <strong className="text-cyan-400 font-mono">&lt; 2.4s</strong>
                </li>
              </ul>
            </div>

            <Link
              href="/policies"
              className="mt-4 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-all text-center"
            >
              <span>Manage FinOps Policies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Empirical Case Study Banner */}
      <CaseStudyWidget />

      {/* Infrastructure Workloads Inventory with 1-Click Hydration */}
      <ResourceTable resources={resources} onRefresh={loadDashboardData} />

      {/* Enterprise Capabilities Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: ROI Simulator */}
        <Link
          href="/roi"
          className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-emerald-500/40 transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
            Enterprise ROI Simulator
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Customize instance counts, hourly rates, and non-prod ratios to model exact monthly dollar and ESG carbon savings.
          </p>
        </Link>

        {/* Card 2: System Architecture */}
        <Link
          href="/architecture"
          className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-cyan-500/40 transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
            Architecture & Hardware SoC
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Explore the 5-stage control loop, multi-signal evaluator logic, and C-DAC VEGA RISC-V edge hardware co-design.
          </p>
        </Link>

        {/* Card 3: ESG Sustainability */}
        <Link
          href="/esg"
          className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-violet-500/40 transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Leaf className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-violet-400 transition-colors">
            ESG & Carbon Compliance
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Access official Certificate of Carbon Abatement aligned with UN Sustainable Development Goals (SDG 9, 12, 13).
          </p>
        </Link>

      </div>

    </div>
  )
}
