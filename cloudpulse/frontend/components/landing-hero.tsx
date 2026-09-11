'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Zap, 
  Play, 
  Github, 
  ShieldCheck, 
  TrendingDown, 
  Clock, 
  Leaf, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  Lock,
  RotateCcw,
  DollarSign,
  Activity
} from 'lucide-react'
import { JudgeDemoModal } from '@/components/judge-demo-modal'

export function LandingHero() {
  const [judgeDemoOpen, setJudgeDemoOpen] = useState(false)

  return (
    <section className="relative overflow-hidden pt-4 pb-8 space-y-8">
      {/* Soft Ambient Background Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-100/60 via-emerald-100/50 to-indigo-100/40 blur-[100px] pointer-events-none -z-10 rounded-full" />

      <div className="space-y-6 text-center max-w-4xl mx-auto">
        
        {/* Core Category Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Autonomous Multi-Cloud Cost Reclamation &amp; Instant Hydration Engine</span>
        </div>

        {/* 1. Core Product Positioning Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.12]">
            Make Cloud Waste{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              Reversible.
            </span>
          </h1>

          {/* Core Product Subheadline */}
          <p className="text-lg sm:text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
            CloudPulse automatically turns idle cloud infrastructure into savings without permanently deleting workloads.
          </p>

          {/* Short Explanation Box */}
          <div className="p-3.5 rounded-2xl bg-white/90 border border-gray-200 max-w-2xl mx-auto text-xs text-gray-600 leading-relaxed shadow-sm">
            «CloudPulse detects idle non-production workloads using multiple signals, protects their state with snapshots, safely reclaims unused infrastructure, and rapidly restores workloads when they are needed again.»
          </div>
        </div>

        {/* 4-Stage Supporting Loop Badge */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-xs font-bold text-gray-800">
          <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">1. Detect</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">2. Protect</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">3. Reclaim</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="px-3 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">4. Hydrate</span>
        </div>

        {/* Primary & Secondary Action Buttons (Prompt #8) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          
          {/* Primary CTA: ▶ RUN CLOUDPULSE DEMO */}
          <button
            onClick={() => setJudgeDemoOpen(true)}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>▶ RUN CLOUDPULSE DEMO</span>
          </button>

          {/* Secondary CTA: Calculate Savings */}
          <Link
            href="/roi"
            className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5"
          >
            <DollarSign className="w-4 h-4" />
            <span>Calculate Savings</span>
          </Link>

          {/* Tertiary CTA: Start 30-Day Pilot */}
          <Link
            href="/pilot"
            className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm border border-gray-300 shadow-sm hover:shadow transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Start 30-Day Pilot</span>
          </Link>
        </div>

        {/* Supported Multi-Cloud Banner */}
        <div className="flex items-center justify-center space-x-3 text-xs text-gray-500 pt-1">
          <span className="font-semibold text-gray-700">Supported Clouds:</span>
          <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">AWS</span>
          <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">GCP</span>
          <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">Kubernetes</span>
          <span className="text-[11px] text-gray-400 font-mono italic">Azure (Coming next)</span>
        </div>

        {/* Headline KPI Benchmark Snapshot Cards (Prompt #1, #6) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 text-left">
          
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-medium">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cost Reclaimed</span>
            </div>
            <div className="text-2xl font-black text-emerald-600 font-mono tracking-tight">45–70%</div>
            <div className="text-[11px] text-gray-500">Benchmark result / 100 VMs</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Warm Hydration</span>
            </div>
            <div className="text-2xl font-black text-blue-600 font-mono tracking-tight">2.34s</div>
            <div className="text-[11px] text-gray-500">Repository-backed benchmark</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>False Outages</span>
            </div>
            <div className="text-2xl font-black text-indigo-600 font-mono tracking-tight">0 / 72k</div>
            <div className="text-[10px] text-gray-500">Repository benchmark evaluation</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-medium">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Estimated CO₂e</span>
            </div>
            <div className="text-2xl font-black text-emerald-600 font-mono tracking-tight">3,903 kg</div>
            <div className="text-[11px] text-gray-500">Scope 2 impact estimate / mo</div>
          </div>

        </div>

      </div>

      {/* Global Judge Demo Modal */}
      <JudgeDemoModal
        isOpen={judgeDemoOpen}
        onClose={() => setJudgeDemoOpen(false)}
      />
    </section>
  )
}
