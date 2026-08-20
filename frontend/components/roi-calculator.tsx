'use client'

import React, { useState } from 'react'
import { Calculator, DollarSign, Leaf, Sparkles, TrendingUp, ShieldCheck, ArrowRight, Server, Trees } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export function RoiCalculator() {
  const [instanceCount, setInstanceCount] = useState<number>(40)
  const [hourlyRate, setHourlyRate] = useState<number>(0.192) // t3.xlarge avg
  const [nonProdPercent, setNonProdPercent] = useState<number>(65)
  const [dormantHoursPerWeek, setDormantHoursPerWeek] = useState<number>(108) // 168 - 60 = 108 idle hrs
  const [ghostVolumes, setGhostVolumes] = useState<number>(12)
  const [avgDiskGb, setAvgDiskGb] = useState<number>(150)

  // Calculations
  const nonProdInstances = Math.round(instanceCount * (nonProdPercent / 100))
  const monthlyComputeSaved = nonProdInstances * hourlyRate * dormantHoursPerWeek * 4.33
  const monthlyGhostStorageSaved = ghostVolumes * avgDiskGb * 0.10 // $0.10/GB EBS standard
  const totalMonthlySavings = monthlyComputeSaved + monthlyGhostStorageSaved
  const totalAnnualSavings = totalMonthlySavings * 12

  // Carbon Math: 0.20 kW avg server power * 0.385 kg CO2/kWh
  const annualIdleHours = nonProdInstances * dormantHoursPerWeek * 52
  const annualCarbonSavedKg = annualIdleHours * 0.20 * 0.385
  const treeEquivalents = Math.round(annualCarbonSavedKg / 21) // 1 tree absorbs ~21 kg CO2/year

  const applyPreset = (preset: 'startup' | 'growth' | 'enterprise') => {
    if (preset === 'startup') {
      setInstanceCount(15)
      setHourlyRate(0.096)
      setNonProdPercent(70)
      setDormantHoursPerWeek(110)
      setGhostVolumes(4)
      setAvgDiskGb(80)
    } else if (preset === 'growth') {
      setInstanceCount(60)
      setHourlyRate(0.192)
      setNonProdPercent(65)
      setDormantHoursPerWeek(108)
      setGhostVolumes(18)
      setAvgDiskGb(150)
    } else {
      setInstanceCount(250)
      setHourlyRate(0.384)
      setNonProdPercent(60)
      setDormantHoursPerWeek(115)
      setGhostVolumes(85)
      setAvgDiskGb(300)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur-md p-6 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Enterprise FinOps ROI & Carbon Savings Simulator</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate exact financial savings and ESG carbon offset potential across your cloud footprint (AWS, GCP, Kubernetes).
          </p>
        </div>

        {/* Preset Selectors */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Presets:</span>
          <button
            onClick={() => applyPreset('startup')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
          >
            Startup
          </button>
          <button
            onClick={() => applyPreset('growth')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all"
          >
            Mid-Market
          </button>
          <button
            onClick={() => applyPreset('enterprise')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all"
          >
            Enterprise
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Total Instances */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Total Cloud Instances / Nodes (AWS / GCP)</span>
              <span className="font-mono text-sm font-bold text-emerald-400">{instanceCount} Nodes</span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={instanceCount}
              onChange={(e) => setInstanceCount(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>5 nodes</span>
              <span>{nonProdInstances} Non-Prod (Dev/Staging)</span>
              <span>500 nodes</span>
            </div>
          </div>

          {/* Average Hourly Cost */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Average On-Demand Instance Rate ($/hr)</span>
              <span className="font-mono text-sm font-bold text-emerald-400">${hourlyRate.toFixed(3)}/hr</span>
            </div>
            <input
              type="range"
              min="0.04"
              max="1.50"
              step="0.01"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>$0.04 (t3.micro)</span>
              <span>$0.192 (t3.xlarge / 4 vCPU)</span>
              <span>$1.50 (c5.4xlarge)</span>
            </div>
          </div>

          {/* Non-Prod Ratio & Off-Hours Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Non-Prod Ratio (%)</span>
                <span className="font-mono text-xs font-bold text-cyan-400">{nonProdPercent}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                step="5"
                value={nonProdPercent}
                onChange={(e) => setNonProdPercent(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Off-Hours Idle / Week</span>
                <span className="font-mono text-xs font-bold text-violet-400">{dormantHoursPerWeek} hrs</span>
              </div>
              <input
                type="range"
                min="40"
                max="128"
                step="2"
                value={dormantHoursPerWeek}
                onChange={(e) => setDormantHoursPerWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-400"
              />
            </div>

          </div>

          {/* Ghost Disks & Size */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Unattached EBS Volumes / Orphan Static IPs</span>
              <span className="font-mono text-xs font-bold text-amber-400">{ghostVolumes} disks ({avgDiskGb} GB avg)</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="range"
                min="0"
                max="100"
                step="2"
                value={ghostVolumes}
                onChange={(e) => setGhostVolumes(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={avgDiskGb}
                onChange={(e) => setAvgDiskGb(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

        </div>

        {/* Real-time ROI Output Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 space-y-6">
          
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Projected FinOps Savings</span>
            </div>
            
            <div className="mt-2">
              <span className="text-xs text-slate-400">Estimated Monthly Savings</span>
              <div className="text-4xl font-extrabold text-white tracking-tight mt-0.5">
                {formatCurrency(totalMonthlySavings)}
                <span className="text-sm font-normal text-emerald-400 ml-1.5">/mo</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">Projected Annual Capital Reclamation</span>
              <div className="text-2xl font-bold text-emerald-300 mt-0.5 font-mono">
                {formatCurrency(totalAnnualSavings)}
                <span className="text-xs font-normal text-slate-400 ml-1">/yr</span>
              </div>
            </div>
          </div>

          {/* ESG Environmental Impact Breakdown */}
          <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 space-y-2">
            <div className="flex items-center space-x-2 text-violet-400 text-xs font-bold">
              <Leaf className="w-4 h-4" />
              <span>Verified ESG Carbon Offset</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-slate-400 text-[11px]">CO₂ Avoided / Year</p>
                <p className="text-base font-bold text-white font-mono">{(annualCarbonSavedKg / 1000).toFixed(2)} MT CO₂e</p>
              </div>
              <div>
                <p className="text-slate-400 text-[11px]">Trees Equivalent</p>
                <p className="text-base font-bold text-emerald-400 font-mono flex items-center space-x-1">
                  <span>🌲 {treeEquivalents.toLocaleString()} trees</span>
                </p>
              </div>
            </div>
          </div>

          {/* Efficiency Summary Callout */}
          <div className="text-xs text-slate-400 space-y-1">
            <div className="flex items-center justify-between">
              <span>Payback Velocity:</span>
              <span className="text-emerald-400 font-bold">&lt; 24 Hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Developer Friction:</span>
              <span className="text-cyan-400 font-bold">0.0% (Sub-3s Re-Activation)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>False Positive Outages:</span>
              <span className="text-violet-400 font-bold">0.0% (Multi-Signal Fusion)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
