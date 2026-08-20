'use client'

import React, { useEffect, useState } from 'react'
import { CloudPulseAPI, AnalyticsSummary } from '@/lib/api'
import { SavingsChart } from '@/components/savings-chart'
import { AiTelemetryChart } from '@/components/ai-telemetry-chart'
import { SlackSimulator } from '@/components/slack-simulator'
import { InteractiveTerminal } from '@/components/interactive-terminal'
import { TrendingUp, DollarSign, Leaf, Award, Terminal } from 'lucide-react'
import { formatCurrency, formatCarbon } from '@/lib/utils'

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)

  const loadAnalytics = async () => {
    try {
      const data = await CloudPulseAPI.getAnalyticsSummary()
      setAnalytics(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAnalytics()
  }, [])

  if (!analytics) return null

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center space-x-2.5">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <span>Financial Savings & Carbon Intelligence</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Detailed time-series telemetry analysis, mathematical cost models, and continuous emissions reduction tracking.
        </p>
      </div>

      {/* Summary Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accumulated Financial Savings</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white mt-2">{formatCurrency(analytics.total_money_saved_usd)}</p>
          <p className="text-xs text-emerald-400 mt-1">Calculated via AWS Price List & On-Demand rates</p>
        </div>

        <div className="p-6 rounded-2xl border border-violet-500/30 bg-violet-500/5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Carbon Footprint Avoided</span>
            <Leaf className="w-5 h-5 text-violet-400" />
          </div>
          <p className="text-3xl font-extrabold text-white mt-2">{formatCarbon(analytics.total_carbon_saved_kg)}</p>
          <p className="text-xs text-violet-400 mt-1">Based on 0.2 kW server power & grid carbon factor</p>
        </div>

        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Engine Efficiency Score</span>
            <Award className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-white mt-2">94.8%</p>
          <p className="text-xs text-cyan-400 mt-1">Idle Detection Precision & Zero False Stops</p>
        </div>
      </div>

      {/* Savings Trend Chart */}
      <SavingsChart analytics={analytics} />

      {/* AI Multi-Signal Telemetry Chart */}
      <AiTelemetryChart />

      {/* Developer Re-Activation & ChatOps Tools Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>Developer ChatOps & Interactive FinOps CLI</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Test sub-3s warm hydration webhook dispatching and run autonomous cloud control commands.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SlackSimulator />
          <InteractiveTerminal />
        </div>
      </div>

    </div>
  )
}
