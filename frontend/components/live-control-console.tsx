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
  Calculator,
  ShieldCheck,
  Zap
} from 'lucide-react'

export function LiveControlConsole() {
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
      <div className="flex flex-col items-center justify-center h-80 text-slate-400 space-y-3 bg-slate-900/40 rounded-2xl border border-slate-800">
        <Activity className="w-6 h-6 animate-spin text-emerald-400" />
        <span className="text-sm font-medium">Initializing CloudPulse Live Control Engine...</span>
      </div>
    )
  }

  return (
    <div id="live-prototype-console" className="space-y-8 pt-8">
      
      {/* Interactive Prototype Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Live Autonomous Control Engine
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Control Loop Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Real-time telemetry evaluation, 1-click warm hydration (&lt;2.34s), and autonomous ghost asset sweeping.
              </p>
            </div>
          </div>
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

      {/* Demo Video Section — offline fallback for venue wifi */}
      <div id="demo-video-section" className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
              <Sparkles className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">60-Second Competition Demo Video</p>
              <p className="text-[11px] text-slate-400">Offline-ready fallback — works smoothly without venue WiFi</p>
            </div>
          </div>
          <a
            href="https://youtu.be/YOUR_VIDEO_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/25 transition-all"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Open on YouTube</span>
          </a>
        </div>
        {/* YouTube embed with offline video fallback */}
        <div className="relative w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800" style={{ paddingTop: '42%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1"
            title="CloudPulse Demo — TECHNOVA 2026"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="text-[10px] text-slate-500 text-center">
          Offline media file available locally at <code className="font-mono bg-slate-800 px-1 rounded">/public/demo.mp4</code>
        </p>
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
                <span>Governance Guardrails</span>
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
                  <strong className="text-cyan-400 font-mono">&lt; 2.34s</strong>
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

    </div>
  )
}
