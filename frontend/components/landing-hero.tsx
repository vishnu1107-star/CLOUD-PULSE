'use client'

import React from 'react'
import { 
  Zap, 
  Play, 
  Github, 
  ShieldCheck, 
  TrendingDown, 
  Clock, 
  Leaf,
  Sparkles,
  ChevronRight
} from 'lucide-react'

export function LandingHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden pt-4 pb-12">
      {/* Background Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-600/20 via-cyan-500/15 to-violet-600/20 blur-[110px] pointer-events-none -z-10 rounded-full" />

      <div className="space-y-8 text-center max-w-4xl mx-auto">
        
        {/* Track Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-inner shadow-emerald-500/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>TECHNOVA 2026 • AI Innovation Track</span>
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          <span className="text-slate-300">Autonomous FinOps Engine</span>
        </div>

        {/* Main Tagline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            CloudPulse:{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
              Reclaim idle cloud spend
            </span>{' '}
            with zero downtime.
          </h1>

          {/* 1-Line Value Proposition */}
          <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Save up to <strong className="text-emerald-400 font-bold">70%</strong> of non-prod cloud costs, restore in <strong className="text-cyan-300 font-mono font-bold">2.3s</strong>, offset CO₂.
          </p>
        </div>

        {/* 3 CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          
          {/* CTA 1: Watch Demo */}
          <button
            onClick={() => scrollToSection('demo-video-section')}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Watch Demo</span>
          </button>

          {/* CTA 2: Try Prototype */}
          <button
            onClick={() => scrollToSection('live-prototype-console')}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Zap className="w-4 h-4" />
            <span>Try Prototype</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* CTA 3: View GitHub */}
          <a
            href="https://github.com/vishnu1107-star/CLOUD-PULSE-2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <Github className="w-4 h-4" />
            <span>View GitHub</span>
          </a>
        </div>

        {/* Headline KPI Snapshot Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-left">
          
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-md space-y-1 shadow-sm">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cost Reclaimed</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono tracking-tight">45–70%</div>
            <div className="text-[11px] text-slate-400">$8,518/mo per 100 nodes</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-md space-y-1 shadow-sm">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Warm Hydration</span>
            </div>
            <div className="text-2xl font-extrabold text-cyan-300 font-mono tracking-tight">2.34s</div>
            <div className="text-[11px] text-slate-400">Mean re-activation speed</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-md space-y-1 shadow-sm">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
              <span>False Outages</span>
            </div>
            <div className="text-2xl font-extrabold text-violet-300 font-mono tracking-tight">0 / 72k</div>
            <div className="text-[11px] text-slate-400">Benchmarked socket guard</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-md space-y-1 shadow-sm">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Carbon Offset</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono tracking-tight">3,903 kg</div>
            <div className="text-[11px] text-slate-400">CO₂e avoided monthly / 100 VMs</div>
          </div>

        </div>

      </div>
    </section>
  )
}
