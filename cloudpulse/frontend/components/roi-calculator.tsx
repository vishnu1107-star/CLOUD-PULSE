'use client'

import React, { useState } from 'react'
import { 
  Calculator, 
  DollarSign, 
  Leaf, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Server, 
  Clock,
  CheckCircle2,
  Sliders,
  Info
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export function RoiCalculator() {
  // Inputs as requested in Prompt #9
  const [instanceCount, setInstanceCount] = useState<number>(60)
  const [hourlyCost, setHourlyCost] = useState<number>(0.192) // t3.xlarge avg
  const [idlePercent, setIdlePercent] = useState<number>(68) // 68% off-hours
  const [hoursIdlePerMonth, setHoursIdlePerMonth] = useState<number>(500) // 500 hrs idle out of 730 hrs/mo

  // Calculation formulas
  const totalMonthlyUnmanagedSpend = instanceCount * hourlyCost * 730
  const estimatedMonthlyWaste = instanceCount * hourlyCost * hoursIdlePerMonth * (idlePercent / 100)
  const estimatedReclaimableAmount = estimatedMonthlyWaste * 0.85 // 85% reclaimable via warm pause
  const estimatedMonthlySavings = estimatedReclaimableAmount
  const estimatedAnnualSavings = estimatedMonthlySavings * 12

  const applyPreset = (preset: 'startup' | 'midmarket' | 'enterprise') => {
    if (preset === 'startup') {
      setInstanceCount(20)
      setHourlyCost(0.096) // t3.medium
      setIdlePercent(65)
      setHoursIdlePerMonth(480)
    } else if (preset === 'midmarket') {
      setInstanceCount(60)
      setHourlyCost(0.192) // t3.xlarge
      setIdlePercent(68)
      setHoursIdlePerMonth(500)
    } else {
      setInstanceCount(250)
      setHourlyCost(0.384) // c5.2xlarge
      setIdlePercent(72)
      setHoursIdlePerMonth(520)
    }
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-8 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-sm">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Calculate Projected CloudPulse Savings
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Model non-production idle compute reclamation, monthly spend avoidance, and annual ROI.
              </p>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 font-semibold">Presets:</span>
          <button
            onClick={() => applyPreset('startup')}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Startup (20 VMs)
          </button>
          <button
            onClick={() => applyPreset('midmarket')}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
          >
            Mid-Market (60 VMs)
          </button>
          <button
            onClick={() => applyPreset('enterprise')}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
          >
            Enterprise (250 VMs)
          </button>
        </div>
      </div>

      {/* Mandatory Benchmark / Projection Notice (Prompt #9 & #19) */}
      <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-start space-x-2.5 text-xs text-blue-900">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Projected savings — benchmark estimate:</span> Calculations are modeled on simulated non-production fleet workloads and typical off-hours idle cycles. Illustrative estimate; actual savings depend on workload telemetry and validated idle behavior.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sliders Input Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* 1. Number of Instances */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-700">Number of Non-Production Instances / Workloads</span>
              <span className="font-mono text-sm font-black text-gray-900">{instanceCount} Nodes</span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={instanceCount}
              onChange={(e) => setInstanceCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>5 nodes</span>
              <span>60 nodes (Mid-Market)</span>
              <span>500 nodes</span>
            </div>
          </div>

          {/* 2. Average Hourly Cost */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-700">Average Hourly Compute Cost ($ / VM hr)</span>
              <span className="font-mono text-sm font-black text-blue-700">${hourlyCost.toFixed(3)} / hr</span>
            </div>
            <input
              type="range"
              min="0.04"
              max="1.50"
              step="0.01"
              value={hourlyCost}
              onChange={(e) => setHourlyCost(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>$0.04 (t3.small)</span>
              <span>$0.192 (t3.xlarge)</span>
              <span>$1.50 (GPU/Heavy)</span>
            </div>
          </div>

          {/* 3. Idle Percentage & Hours Idle Per Month */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700">Idle Confidence / Off-Hours Ratio</span>
                <span className="font-mono text-xs font-black text-amber-700">{idlePercent}% Idle</span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                step="2"
                value={idlePercent}
                onChange={(e) => setIdlePercent(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="text-[10px] text-gray-400">
                Industry avg: 68% off-hours
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700">Hours Idle Per Month</span>
                <span className="font-mono text-xs font-black text-emerald-700">{hoursIdlePerMonth} hrs / mo</span>
              </div>
              <input
                type="range"
                min="100"
                max="650"
                step="10"
                value={hoursIdlePerMonth}
                onChange={(e) => setHoursIdlePerMonth(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="text-[10px] text-gray-400">
                Out of 730 total hours / month
              </div>
            </div>

          </div>

        </div>

        {/* Real-Time Output Panel (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Projected Savings — Benchmark Estimate</span>
            </div>

            {/* Core Outputs */}
            <div className="space-y-3 pt-1">
              <div>
                <span className="text-xs text-slate-300">Estimated Monthly Savings:</span>
                <div className="text-4xl font-black font-mono text-emerald-300 tracking-tight mt-0.5">
                  +${Math.round(estimatedMonthlySavings).toLocaleString()}
                  <span className="text-sm font-semibold text-emerald-200"> / mo</span>
                </div>
              </div>

              <div className="pt-3 border-t border-indigo-700/50">
                <span className="text-xs text-slate-300">Estimated Annualized Savings:</span>
                <div className="text-2xl font-extrabold font-mono text-white mt-0.5">
                  +${Math.round(estimatedAnnualSavings).toLocaleString()}
                  <span className="text-xs font-normal text-slate-400"> / year</span>
                </div>
              </div>
            </div>

            {/* Detailed Financial Breakdown Table */}
            <div className="space-y-2 pt-2 text-xs text-slate-200">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-400">Total Unmanaged Fleet Spend:</span>
                <span className="font-mono font-bold text-slate-200">${Math.round(totalMonthlyUnmanagedSpend).toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-400">Estimated Monthly Waste:</span>
                <span className="font-mono font-bold text-amber-300">${Math.round(estimatedMonthlyWaste).toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-400">Estimated Reclaimable Amount:</span>
                <span className="font-mono font-bold text-emerald-300">${Math.round(estimatedReclaimableAmount).toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-emerald-300">
                <span>Fleet Waste Reduction:</span>
                <span className="font-mono text-sm">~{Math.round((estimatedMonthlySavings / totalMonthlyUnmanagedSpend) * 100)}% Reclaimed</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-3 border-t border-indigo-700/50 text-[11px] text-slate-300 italic">
            * Benchmark simulation based on automated 30-day point-in-time snapshots and sub-3s warm hydration.
          </div>

        </div>

      </div>
    </div>
  )
}
