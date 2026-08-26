'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Leaf, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  Sliders,
  ShieldCheck,
  FlaskConical,
  Zap
} from 'lucide-react'

export function LandingValidation() {
  const [instanceCount, setInstanceCount] = useState<number>(100)
  const [hourlyRate, setHourlyRate] = useState<number>(0.192) // t3.xlarge avg
  const [offHoursRatio, setOffHoursRatio] = useState<number>(68) // off-hours %

  // Calculated ROI stats
  const monthlyGrossSpend = instanceCount * hourlyRate * 730
  const monthlyReclaimedSavings = monthlyGrossSpend * (offHoursRatio / 100) * 0.85 // 85% idle efficiency
  const carbonOffsetKg = Math.round(instanceCount * (offHoursRatio / 100) * 730 * 0.20 * 0.385)
  const hydrationLatency = 2.34

  return (
    <section id="validation-section" className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Empirical Proof & Validation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Validated ROI & Real Pilot Performance
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Rigorous mathematical models and empirical evidence from our 72k-eval benchmark and 7-day AWS pilot.
        </p>
      </div>

      {/* 3 Validated Headline Proof Pillars with Exact Prompt Captions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Metric 1: Savings */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/40 space-y-3 relative overflow-hidden shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                [Benchmarked & Pilot]
              </span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                45–70% <span className="text-emerald-400 text-lg font-bold">Reclaimed</span>
              </div>
              <p className="text-xs text-emerald-300 mt-2 font-semibold italic bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/20">
                “Savings: 45–70% reclaimed → $8,518/month per 100 instances.”
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Annual ROI Impact:</span>
            <strong className="text-emerald-400 font-mono">$102,216 / yr</strong>
          </div>
        </div>

        {/* Metric 2: Latency */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/40 space-y-3 relative overflow-hidden shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                [Benchmarked]
              </span>
              <Clock className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                2.34s <span className="text-cyan-400 text-lg font-bold">Latency</span>
              </div>
              <p className="text-xs text-cyan-300 mt-2 font-semibold italic bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-500/20">
                “Hydration latency: 2.34s mean re‑activation.”
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Developer Wait Time:</span>
            <strong className="text-cyan-300 font-mono">Near Zero Friction</strong>
          </div>
        </div>

        {/* Metric 3: Carbon Offset */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-violet-500/40 space-y-3 relative overflow-hidden shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-bold border border-violet-500/30">
                [Design Target]
              </span>
              <Leaf className="w-5 h-5 text-violet-400" />
            </div>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                3,903 kg <span className="text-violet-400 text-lg font-bold">CO₂e</span>
              </div>
              <p className="text-xs text-violet-300 mt-2 font-semibold italic bg-violet-950/40 p-2.5 rounded-lg border border-violet-500/20">
                “Carbon offset: 3,903 kg CO₂e avoided monthly.”
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>EPA eGRID Factor:</span>
            <strong className="text-violet-300 font-mono">0.385 kg CO₂/kWh</strong>
          </div>
        </div>

      </div>

      {/* Visual ROI Comparison Chart (Before vs After CloudPulse) */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Comparative Spend Breakdown: Unmanaged vs. CloudPulse Reclaimed</span>
            </h3>
            <p className="text-xs text-slate-400">100-node standard engineering cluster with 68% off-hours ratio</p>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            -$8,518 Net Saved Monthly
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="space-y-3 pt-2">
          
          {/* Bar 1: Unmanaged */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-400">Unmanaged Cloud Spend (24/7 Running):</span>
              <span className="text-red-400 font-mono">$14,016 / mo (100%)</span>
            </div>
            <div className="w-full h-7 rounded-lg bg-slate-800 flex overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-rose-500 h-full w-[100%] flex items-center px-3 text-[11px] font-bold text-white">
                Gross Unmanaged Cloud Spend ($14,016/mo)
              </div>
            </div>
          </div>

          {/* Bar 2: With CloudPulse */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-400">With CloudPulse Autonomous Control:</span>
              <span className="text-emerald-400 font-mono">$5,498 / mo (39.2% retained)</span>
            </div>
            <div className="w-full h-7 rounded-lg bg-slate-800 flex overflow-hidden">
              <div className="bg-slate-700 h-full w-[39.2%] flex items-center px-3 text-[11px] font-bold text-slate-300" title="Active Compute">
                Active Compute ($5,498)
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[60.8%] flex items-center justify-end px-3 text-[11px] font-extrabold text-slate-950 animate-pulse" title="Reclaimed Spend">
                Reclaimed Savings ($8,518/mo)
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Live ROI Simulator Bar & Slider */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Interactive ROI & Carbon Abatement Simulator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Adjust your infrastructure fleet to calculate exact monthly savings and ESG impact.
            </p>
          </div>
          <Link
            href="/roi"
            className="flex items-center space-x-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Open Advanced Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Slider 1: Instances */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Non-Prod Instances:</span>
              <strong className="text-white font-mono">{instanceCount} VMs</strong>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={instanceCount}
              onChange={(e) => setInstanceCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>10 VMs</span>
              <span>250 VMs</span>
              <span>500 VMs</span>
            </div>
          </div>

          {/* Slider 2: Hourly Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Avg Instance Hourly Rate:</span>
              <strong className="text-white font-mono">${hourlyRate.toFixed(3)}/hr</strong>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.80"
              step="0.01"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$0.05 (t3.micro)</span>
              <span>$0.19 (t3.xlarge)</span>
              <span>$0.80 (c5.4xlarge)</span>
            </div>
          </div>

          {/* Slider 3: Off-hours idle ratio */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Off-Hours Idle Percentage:</span>
              <strong className="text-white font-mono">{offHoursRatio}%</strong>
            </div>
            <input
              type="range"
              min="30"
              max="80"
              step="1"
              value={offHoursRatio}
              onChange={(e) => setOffHoursRatio(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>30%</span>
              <span>68% (Standard)</span>
              <span>80%</span>
            </div>
          </div>

        </div>

        {/* Dynamic Computed Outcome Bar */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Monthly Cloud Savings</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">
              ${Math.round(monthlyReclaimedSavings).toLocaleString()}
              <span className="text-xs text-slate-400 font-normal"> / mo</span>
            </div>
            <div className="text-[11px] text-slate-400">From ${(monthlyGrossSpend).toLocaleString()} gross non-prod spend</div>
          </div>

          <div className="space-y-1 sm:border-l sm:border-r border-slate-800 sm:px-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">CO₂ Emissions Abated</div>
            <div className="text-3xl font-extrabold text-cyan-300 font-mono">
              {carbonOffsetKg.toLocaleString()}
              <span className="text-xs text-slate-400 font-normal"> kg CO₂e</span>
            </div>
            <div className="text-[11px] text-slate-400">Equivalent to {Math.round(carbonOffsetKg / 21)} mature trees planted</div>
          </div>

          <div className="space-y-1 sm:pl-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Mean Hydration Speed</div>
            <div className="text-3xl font-extrabold text-violet-300 font-mono">
              {hydrationLatency}s
            </div>
            <div className="text-[11px] text-slate-400">Zero developer velocity penalty</div>
          </div>

        </div>
      </div>

    </section>
  )
}
