'use client'

import React, { useState } from 'react'
import { 
  Calculator, 
  TrendingDown, 
  Clock, 
  Leaf, 
  DollarSign, 
  Sliders, 
  ArrowRight, 
  Sparkles, 
  BarChart3, 
  CheckCircle2,
  ShieldCheck,
  FlaskConical,
  Info,
  Layers,
  Check
} from 'lucide-react'

export function LandingValidation() {
  return (
    <section id="validation-section" className="space-y-8 pt-6 border-t border-gray-200 text-gray-900">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
            <span>Empirical Validation &amp; Metrics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Repository Benchmarks &amp; Pilot Validation Targets
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md">
          Transparent separation between repository benchmark simulations and live enterprise pilot validation targets.
        </p>
      </div>

      {/* Prompt #18: What is Real vs What is Target Card Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Validation Transparency: What is Built vs. What is Target
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Box 1: CURRENT PROTOTYPE */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase">
                CURRENT PROTOTYPE
              </span>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                Live Interactive
              </span>
            </div>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Working web interface &amp; FinOps console</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>CloudPulse workflow demonstration</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>ROI calculator &amp; spend simulator</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Snapshot &amp; reclamation workflow</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>ML anomaly detection evidence</span>
              </div>
            </div>
          </div>

          {/* Box 2: BENCHMARK / VALIDATION */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="text-xs font-mono font-bold text-indigo-700 uppercase">
                BENCHMARK / VALIDATION
              </span>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                Repository Backed
              </span>
            </div>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>Repository-backed evaluation results</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>Simulated 100-instance fleet validation</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>45–70% benchmark cost savings</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>2.34s mean warm hydration latency</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>0 false outages in 72k benchmark windows</span>
              </div>
            </div>
          </div>

          {/* Box 3: NEXT VALIDATION */}
          <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-3 bg-gradient-to-b from-white to-emerald-50/30">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase">
                NEXT VALIDATION
              </span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Pilot Targets
              </span>
            </div>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-start space-x-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Real enterprise read-only telemetry</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>30-day staging cluster pilot program</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Production AWS/GCP telemetry validation</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Real dollar invoice reduction audit</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Live developer ChatOps feedback loop</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Spend Comparison Bar Graphic */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
              Simulated Fleet Spend Comparison
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-0.5">
              Unmanaged Cloud vs. CloudPulse Autonomous Fleet Spend (100 Nodes Benchmark)
            </h3>
          </div>
          <div className="flex items-center space-x-4 text-xs font-medium">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-sm bg-rose-400" />
              <span className="text-gray-600">Unmanaged Waste</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-sm bg-blue-600" />
              <span className="text-gray-600">Active Spend</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span className="text-gray-600">Reclaimed Capital</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Bar 1: Before CloudPulse */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-700">Without CloudPulse (Unmanaged Fleet)</span>
              <span className="font-mono text-gray-900 font-bold">$14,016 / month</span>
            </div>
            <div className="w-full h-8 bg-gray-100 rounded-xl overflow-hidden flex border border-gray-200">
              <div className="bg-blue-600 h-full w-[39%]" title="Active Compute ($5,498)" />
              <div className="bg-rose-400 h-full w-[61%]" title="Idle Waste ($8,518)" />
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 font-medium">
              <span>$5,498 Active Dev (39%)</span>
              <span className="text-red-600 font-bold">$8,518 Idle Leakage (61%)</span>
            </div>
          </div>

          {/* Bar 2: With CloudPulse */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-emerald-700 font-bold">With CloudPulse Closed-Loop Engine</span>
              <span className="font-mono text-emerald-700 font-bold">$5,498 / month (-60.8%)</span>
            </div>
            <div className="w-full h-8 bg-gray-100 rounded-xl overflow-hidden flex border border-gray-200">
              <div className="bg-blue-600 h-full w-[39%]" title="Active Compute ($5,498)" />
              <div className="bg-emerald-500 h-full w-[61%]" title="Reclaimed Spend ($8,518)" />
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 font-medium">
              <span>$5,498 Maintained Spend</span>
              <span className="text-emerald-700 font-bold">+$8,518 / mo Benchmark Savings</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
