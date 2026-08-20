'use client'

import React from 'react'
import { AnalyticsSummary } from '@/lib/api'
import { TrendingUp, Leaf, DollarSign, Cloud, BarChart3, Layers } from 'lucide-react'

interface SavingsChartProps {
  analytics: AnalyticsSummary
}

export function SavingsChart({ analytics }: SavingsChartProps) {
  const trend = analytics.daily_savings_trend || []

  // Max money for normalized trend height
  const maxMoney = Math.max(...trend.map(t => t.money_saved_usd), 50.0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 7-Day Financial Savings & Carbon Offset Trend Chart */}
      <div className="lg:col-span-2 rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Real-Time Cost Savings & Carbon Trend</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Accumulated daily financial savings ($) & estimated carbon emissions offset (kg CO₂)
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            7-Day Window
          </span>
        </div>

        {/* Custom SVG Trend Visualization */}
        <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-border/80 pb-4">
          {trend.map((point, idx) => {
            const heightPercent = Math.min(100, Math.max(15, (point.money_saved_usd / maxMoney) * 100))
            const dayLabel = point.date ? point.date.split('-').slice(1).join('/') : `Day ${idx + 1}`

            return (
              <div key={point.date || idx} className="flex-1 flex flex-col items-center group relative">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 bg-slate-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg border border-slate-700 whitespace-nowrap shadow-xl pointer-events-none">
                  <div>${point.money_saved_usd.toFixed(2)} saved</div>
                  <div className="text-violet-400">{point.carbon_saved_kg.toFixed(1)} kg CO₂</div>
                </div>

                {/* Bars */}
                <div className="w-full max-w-[40px] flex items-end justify-center h-48 bg-slate-900/60 rounded-xl p-1">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-gradient-to-t from-emerald-600 to-cyan-400 rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-500 group-hover:from-emerald-500 group-hover:to-cyan-300"
                  />
                </div>

                <span className="text-xs font-medium text-slate-400 mt-2">{dayLabel}</span>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-emerald-500 to-cyan-400" />
            <span>Financial Savings ($ USD)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-sm bg-violet-500" />
            <span>Carbon Offset (kg CO₂)</span>
          </div>
        </div>
      </div>

      {/* Savings Breakdown by Environment */}
      <div className="rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2 mb-1">
            <Layers className="w-5 h-5 text-violet-400" />
            <span>Environmental Distribution</span>
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Savings distribution across tag-managed environments
          </p>

          <div className="space-y-4">
            {Object.entries(analytics.savings_by_environment || {}).map(([env, amount]) => {
              const percentage = analytics.total_money_saved_usd > 0
                ? Math.min(100, Math.round((amount / analytics.total_money_saved_usd) * 100))
                : 33
              return (
                <div key={env} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-200">{env} Environment</span>
                    <span className="font-mono text-emerald-400">${amount.toFixed(2)} ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${percentage}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 via-emerald-400 to-cyan-400"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border/80 p-4 rounded-xl bg-violet-500/5 border-violet-500/20">
          <div className="flex items-center space-x-2 text-xs font-bold text-violet-400">
            <Leaf className="w-4 h-4" />
            <span>Carbon Footprint Reduction Formula</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            CO₂ Saved = Idle Hours × 0.2 kW (Avg Server Output) × 0.385 kg CO₂/kWh (Grid Intensity Factor).
          </p>
        </div>

      </div>

    </div>
  )
}
