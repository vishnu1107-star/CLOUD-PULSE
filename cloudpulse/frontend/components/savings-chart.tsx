'use client'

import React from 'react'
import { AnalyticsSummary } from '@/lib/api'
import { TrendingUp, Leaf, DollarSign, Cloud, BarChart3, Layers } from 'lucide-react'

interface SavingsChartProps {
  analytics?: AnalyticsSummary | null
}

export function SavingsChart({ analytics }: SavingsChartProps) {
  const trend = analytics?.daily_savings_trend || [
    { date: '2026-08-16', money_saved_usd: 284.50, carbon_saved_kg: 13.0 },
    { date: '2026-08-17', money_saved_usd: 312.20, carbon_saved_kg: 14.3 },
    { date: '2026-08-18', money_saved_usd: 298.00, carbon_saved_kg: 13.6 },
    { date: '2026-08-19', money_saved_usd: 345.80, carbon_saved_kg: 15.8 },
    { date: '2026-08-20', money_saved_usd: 390.40, carbon_saved_kg: 17.9 },
    { date: '2026-08-21', money_saved_usd: 420.10, carbon_saved_kg: 19.2 },
    { date: '2026-08-22', money_saved_usd: 485.60, carbon_saved_kg: 22.2 },
  ]

  // Max money for normalized trend height
  const maxMoney = Math.max(...trend.map(t => t.money_saved_usd), 50.0)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Real-Time Cost Savings &amp; Carbon Trend</span>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Accumulated daily financial savings ($) &amp; estimated carbon emissions offset (kg CO₂)
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          7-Day Window
        </span>
      </div>

      {/* Custom Trend Visualization */}
      <div className="h-60 flex items-end justify-between gap-3 pt-6 border-b border-gray-100 pb-4">
        {trend.map((point, idx) => {
          const heightPercent = Math.min(100, Math.max(15, (point.money_saved_usd / maxMoney) * 100))
          const dayLabel = point.date ? point.date.split('-').slice(1).join('/') : `Day ${idx + 1}`

          return (
            <div key={point.date || idx} className="flex-1 flex flex-col items-center group relative">
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 bg-gray-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-lg pointer-events-none">
                <div>${point.money_saved_usd.toFixed(2)} saved</div>
                <div className="text-emerald-400">{point.carbon_saved_kg.toFixed(1)} kg CO₂</div>
              </div>

              {/* Bars */}
              <div className="w-full max-w-[40px] flex items-end justify-center h-44 bg-gray-50 rounded-xl p-1 border border-gray-100">
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full bg-gradient-to-t from-blue-600 to-emerald-500 rounded-lg shadow-sm transition-all duration-300 group-hover:from-blue-500 group-hover:to-emerald-400"
                />
              </div>

              <span className="text-xs font-medium text-gray-500 mt-2">{dayLabel}</span>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-sm bg-blue-600" />
          <span>Financial Savings ($ USD)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-sm bg-emerald-500" />
          <span>Carbon Offset (kg CO₂)</span>
        </div>
      </div>
    </div>
  )
}
