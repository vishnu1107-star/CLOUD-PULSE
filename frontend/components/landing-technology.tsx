'use client'

import React, { useState } from 'react'
import { 
  Layers, 
  Cpu, 
  Brain, 
  Cloud, 
  Check, 
  X, 
  AlertTriangle, 
  ShieldCheck, 
  Terminal, 
  Sparkles,
  ArrowRight,
  Zap,
  Server
} from 'lucide-react'

export function LandingTechnology() {
  const [selectedLayer, setSelectedLayer] = useState<'edge' | 'ai' | 'cloud'>('edge')

  const comparisonData = [
    {
      feature: 'Autonomous Action Execution',
      aws: 'Crude cron',
      cloudhealth: 'Advisory PDFs',
      kubecost: 'Advisory only',
      spot: 'Spot swaps',
      cloudpulse: '100% Autonomous',
      cloudpulseHighlight: true
    },
    {
      feature: 'ML Anomaly Detection',
      aws: 'Static schedules',
      cloudhealth: 'Static rules',
      kubecost: 'Static rules',
      spot: 'Bidding models',
      cloudpulse: 'Isolation Forest (5D)',
      cloudpulseHighlight: true
    },
    {
      feature: 'Zero-Outage Socket Guard',
      aws: 'Shuts busy jobs',
      cloudhealth: 'N/A',
      kubecost: 'N/A',
      spot: 'Spot disruptions',
      cloudpulse: '0 Outages [72k evals]',
      cloudpulseHighlight: true
    },
    {
      feature: 'Predictive Pre-Hydration',
      aws: 'None',
      cloudhealth: 'None',
      kubecost: 'None',
      spot: 'None',
      cloudpulse: 'Diurnal Forecaster',
      cloudpulseHighlight: true
    },
    {
      feature: 'Hydration Latency',
      aws: '30–60 min ops',
      cloudhealth: 'Manual ticket',
      kubecost: 'Manual action',
      spot: 'Variable boot',
      cloudpulse: '< 2.34s Warm Start',
      cloudpulseHighlight: true
    },
    {
      feature: 'Edge Hardware Pre-Filter',
      aws: 'None',
      cloudhealth: 'None',
      kubecost: 'None',
      spot: 'None',
      cloudpulse: 'RISC-V (THEJAS32)',
      cloudpulseHighlight: true
    },
    {
      feature: 'Multi-Cloud & K8s Coverage',
      aws: 'AWS only',
      cloudhealth: 'AWS/GCP/Azure',
      kubecost: 'K8s only',
      spot: 'Multi-cloud',
      cloudpulse: 'AWS + GCP + K8s',
      cloudpulseHighlight: true
    },
    {
      feature: 'Ghost Asset Reaper & Vault',
      aws: 'None',
      cloudhealth: 'Reports only',
      kubecost: 'None',
      spot: 'None',
      cloudpulse: 'Auto-Purge & 30d Vault',
      cloudpulseHighlight: true
    }
  ]

  return (
    <section id="technology-section" className="space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Competitive Edge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Unique Deep-Tech Stack & Industry Benchmarks
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          How our co-designed Edge, AI, and Cloud layers outperform legacy advisory FinOps suites.
        </p>
      </div>

      {/* 3-Tier Layered Architecture Visualizer (Edge -> AI -> Cloud) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Layered Architecture Diagram (Edge → AI → Cloud)</span>
          </h3>
          <div className="flex space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedLayer('edge')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedLayer === 'edge' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Edge Hardware
            </button>
            <button
              onClick={() => setSelectedLayer('ai')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedLayer === 'ai' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. AI Core
            </button>
            <button
              onClick={() => setSelectedLayer('cloud')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedLayer === 'cloud' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Cloud Control
            </button>
          </div>
        </div>

        {/* Layered Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Layer 1: Edge */}
          <div 
            onClick={() => setSelectedLayer('edge')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              selectedLayer === 'edge'
                ? 'bg-slate-850 border-amber-500/50 ring-1 ring-amber-500/30 shadow-lg shadow-amber-500/5'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">LAYER 01</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Edge Hardware Probe</h4>
              <p className="text-xs text-slate-400 mt-1">C-DAC VEGA Aries / THEJAS32 RISC-V</p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>100 MHz RISC-V SoC (&lt;256B SRAM)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>~350ns timing latency per eval</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>85–95% noise telemetry decimation</span>
              </li>
            </ul>
          </div>

          {/* Layer 2: AI */}
          <div 
            onClick={() => setSelectedLayer('ai')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              selectedLayer === 'ai'
                ? 'bg-slate-850 border-purple-500/50 ring-1 ring-purple-500/30 shadow-lg shadow-purple-500/5'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-purple-400">LAYER 02</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">AI Engine & Forecaster</h4>
              <p className="text-xs text-slate-400 mt-1">Isolation Forest + Time-Series AR</p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>5D feature vector anomaly isolation</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Diurnal morning pre-hydration (08:30 AM)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Active-quiet developer lock gating</span>
              </li>
            </ul>
          </div>

          {/* Layer 3: Cloud */}
          <div 
            onClick={() => setSelectedLayer('cloud')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              selectedLayer === 'cloud'
                ? 'bg-slate-850 border-emerald-500/50 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-500/5'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Cloud className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">LAYER 03</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Autonomous Cloud Control</h4>
              <p className="text-xs text-slate-400 mt-1">Multi-Cloud Orchestration & Reaper</p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>AWS Boto3, GCP Compute & K8s SDKs</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Sub-3s warm wake-up & Slack ChatOps</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Ghost Reaper + 30-day point-in-time vault</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Competitor Comparison Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-xl space-y-3 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Competitor Comparison Matrix</h3>
            <p className="text-xs text-slate-400">Detailed feature-by-feature benchmark across commercial FinOps tools</p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            CloudPulse Advantage
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                <th className="py-3 px-3.5 font-bold uppercase tracking-wider">Capability</th>
                <th className="py-3 px-3 font-semibold text-center">AWS Scheduler</th>
                <th className="py-3 px-3 font-semibold text-center">CloudHealth</th>
                <th className="py-3 px-3 font-semibold text-center">Kubecost</th>
                <th className="py-3 px-3 font-semibold text-center">Spot.io</th>
                <th className="py-3 px-3.5 font-extrabold text-emerald-300 text-center bg-emerald-950/30 border-l border-r border-emerald-500/30">
                  ⚡ CloudPulse (Ours)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3 px-3.5 font-semibold text-slate-200">{row.feature}</td>
                  <td className="py-3 px-3 text-slate-400 text-center">{row.aws}</td>
                  <td className="py-3 px-3 text-slate-400 text-center">{row.cloudhealth}</td>
                  <td className="py-3 px-3 text-slate-400 text-center">{row.kubecost}</td>
                  <td className="py-3 px-3 text-slate-400 text-center">{row.spot}</td>
                  <td className="py-3 px-3.5 text-center font-bold text-emerald-400 bg-emerald-950/30 border-l border-r border-emerald-500/30">
                    {row.cloudpulse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  )
}
