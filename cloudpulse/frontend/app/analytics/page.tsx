'use client'

import React, { useEffect, useState } from 'react'
import { CloudPulseAPI, AnalyticsSummary } from '@/lib/api'
import { SavingsChart } from '@/components/savings-chart'
import { AiTelemetryChart } from '@/components/ai-telemetry-chart'
import { SlackSimulator } from '@/components/slack-simulator'
import { InteractiveTerminal } from '@/components/interactive-terminal'
import Link from 'next/link'
import { 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  Clock, 
  Terminal, 
  Brain, 
  ArrowRight, 
  ShieldCheck, 
  Server, 
  Layers,
  Sparkles,
  PieChart,
  BarChart3
} from 'lucide-react'
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
    <div className="space-y-8 text-gray-900">
      
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center space-x-2.5 mb-1">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Financial Savings &amp; Cloud Economics Analytics
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Every chart answers one question: How much money and carbon did CloudPulse save?
            </p>
          </div>
        </div>
      </div>

      {/* Top 4 Business KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Monthly Cost Avoidance */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
            Monthly Cost Avoidance
          </span>
          <div className="text-3xl font-black text-emerald-600 font-mono tracking-tight">
            $8,518<span className="text-sm font-semibold text-gray-500">/mo</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block pt-1">
            +$102,216 Annualized Opportunity
          </span>
        </div>

        {/* Reclaimed Fleet Size */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
            Reclaimed Fleet Compute
          </span>
          <div className="text-3xl font-black text-blue-600 font-mono tracking-tight">
            340<span className="text-sm font-semibold text-gray-500"> hrs/mo</span>
          </div>
          <span className="text-[11px] text-gray-500 block pt-1">
            Across 38 dormant instances
          </span>
        </div>

        {/* Hydration SLA Performance */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
            Hydration Mean Latency
          </span>
          <div className="text-3xl font-black text-blue-700 font-mono tracking-tight">
            2.34s
          </div>
          <span className="text-[11px] text-blue-700 font-mono block pt-1">
            P50: 1.8s • P95: 3.1s benchmark
          </span>
        </div>

        {/* Estimated Scope 2 Carbon Offset */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
            Estimated CO₂e Avoided
          </span>
          <div className="text-3xl font-black text-emerald-600 font-mono tracking-tight">
            3,903 kg
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block pt-1">
            186 trees monthly equivalency
          </span>
        </div>

      </div>

      {/* Savings Over Time Chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Daily &amp; Weekly Cost Reclamation Trajectory ($ USD)
        </h3>
        <SavingsChart analytics={analytics} />
      </div>

      {/* Multi-Cloud & Environment Savings Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Savings by Cloud Provider */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h4 className="text-sm font-bold text-gray-900">Savings by Cloud Provider</h4>
            <span className="text-xs text-gray-400 font-mono">AWS • GCP • K8s</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-gray-700">AWS (EC2 &amp; EBS Volumes)</span>
                <span className="font-mono font-bold text-gray-900">$5,840 (68.5%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[68.5%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-gray-700">GCP (Compute Engine)</span>
                <span className="font-mono font-bold text-gray-900">$1,820 (21.4%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[21.4%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-gray-700">Kubernetes (Pod Replicas to 0)</span>
                <span className="font-mono font-bold text-gray-900">$858 (10.1%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-cyan-600 h-full w-[10.1%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Savings by Environment */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h4 className="text-sm font-bold text-gray-900">Savings by Environment</h4>
            <span className="text-xs text-gray-400 font-mono">Dev • Staging • QA</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-gray-700">Staging Environments</span>
                <span className="font-mono font-bold text-gray-900">$4,420 (51.9%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[51.9%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-gray-700">Development Clusters</span>
                <span className="font-mono font-bold text-gray-900">$2,680 (31.5%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[31.5%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-gray-700">QA / Batch Test Pipelines</span>
                <span className="font-mono font-bold text-gray-900">$1,418 (16.6%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[16.6%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Hydration Benchmark Performance Distribution */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h4 className="text-sm font-bold text-gray-900">Hydration Latency Percentiles</h4>
            <span className="text-xs text-blue-700 font-mono font-bold">&lt; 3.0s SLA</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-600 font-medium">P50 (Median Re-Activation):</span>
              <span className="font-mono font-bold text-blue-600 text-sm">1.82s</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-600 font-medium">Mean (Average Hydration):</span>
              <span className="font-mono font-bold text-blue-700 text-sm">2.34s</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-600 font-medium">P95 (95th Percentile):</span>
              <span className="font-mono font-bold text-indigo-700 text-sm">3.10s</span>
            </div>
          </div>
        </div>

      </div>

      {/* AI Multi-Signal Telemetry Chart */}
      <AiTelemetryChart />

      {/* Developer ChatOps & Interactive Terminal */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-blue-600" />
            <span>Developer ChatOps &amp; Interactive FinOps CLI</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
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
