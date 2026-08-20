'use client'

import React, { useState } from 'react'
import { Globe, Server, Cloud, ShieldCheck, Activity, DollarSign, Leaf, CheckCircle2, ChevronRight } from 'lucide-react'

interface CloudRegion {
  id: string
  name: string
  provider: 'AWS' | 'GCP' | 'K8S'
  code: string
  country: string
  runningCount: number
  pausedCount: number
  ghostCount: number
  monthlySaved: number
  carbonSavedKg: number
  status: 'OPTIMAL' | 'RECLAIMING' | 'PROTECTED'
}

const regionsData: CloudRegion[] = [
  {
    id: 'us-east-1',
    name: 'US East (N. Virginia)',
    provider: 'AWS',
    code: 'us-east-1',
    country: '🇺🇸 United States',
    runningCount: 2,
    pausedCount: 3,
    ghostCount: 2,
    monthlySaved: 148.20,
    carbonSavedKg: 52.4,
    status: 'OPTIMAL'
  },
  {
    id: 'us-west-2',
    name: 'US West (Oregon)',
    provider: 'AWS',
    code: 'us-west-2',
    country: '🇺🇸 United States',
    runningCount: 1,
    pausedCount: 1,
    ghostCount: 1,
    monthlySaved: 64.80,
    carbonSavedKg: 22.8,
    status: 'OPTIMAL'
  },
  {
    id: 'ap-south-1',
    name: 'Asia Pacific (Mumbai)',
    provider: 'AWS',
    code: 'ap-south-1',
    country: '🇮🇳 India',
    runningCount: 1,
    pausedCount: 2,
    ghostCount: 0,
    monthlySaved: 78.50,
    carbonSavedKg: 28.1,
    status: 'RECLAIMING'
  },
  {
    id: 'us-central1',
    name: 'GCP Central (Iowa)',
    provider: 'GCP',
    code: 'us-central1',
    country: '🇺🇸 United States',
    runningCount: 0,
    pausedCount: 1,
    ghostCount: 1,
    monthlySaved: 45.00,
    carbonSavedKg: 16.2,
    status: 'OPTIMAL'
  }
]

export function CloudTopologyMap() {
  const [selectedRegion, setSelectedRegion] = useState<string>('us-east-1')
  const active = regionsData.find(r => r.id === selectedRegion) || regionsData[0]

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Global Multi-Cloud Topology Map</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-region deployment map across AWS, GCP, and Kubernetes orchestrators.
          </p>
        </div>

        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>4 Regions Monitored</span>
        </span>
      </div>

      {/* Regions Interactive Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {regionsData.map((reg) => {
          const isSelected = reg.id === selectedRegion
          return (
            <button
              key={reg.id}
              onClick={() => setSelectedRegion(reg.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-slate-800 border-cyan-500/60 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                  : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono text-slate-400">{reg.code}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  {reg.provider}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white truncate">{reg.name}</h4>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800/60">
                <span>Monthly Saved:</span>
                <strong className="text-emerald-400 font-mono font-bold">${reg.monthlySaved.toFixed(0)}</strong>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Region Deep-Dive Panel */}
      <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 font-bold">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">{active.name}</h3>
                <span className="text-xs text-slate-400">({active.country})</span>
              </div>
              <p className="text-xs font-mono text-cyan-400">Provider: {active.provider} • Node Health: {active.status}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Regional Reclamation Yield</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">${active.monthlySaved.toFixed(2)}/mo</span>
          </div>
        </div>

        {/* Regional Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Active Workloads</span>
            <p className="text-xl font-bold text-white mt-0.5">{active.runningCount} Online</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Safely Paused</span>
            <p className="text-xl font-bold text-cyan-400 mt-0.5">{active.pausedCount} Paused</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Ghost Assets Purged</span>
            <p className="text-xl font-bold text-amber-400 mt-0.5">{active.ghostCount} Disks</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">CO₂ Avoided</span>
            <p className="text-xl font-bold text-violet-400 mt-0.5">{active.carbonSavedKg.toFixed(1)} kg</p>
          </div>
        </div>

      </div>

    </div>
  )
}
