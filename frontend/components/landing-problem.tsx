'use client'

import React from 'react'
import { 
  AlertTriangle, 
  DollarSign, 
  CloudOff, 
  Ghost, 
  FileWarning, 
  Clock, 
  ArrowDownRight,
  TrendingUp,
  ServerCrash
} from 'lucide-react'

export function LandingProblem() {
  return (
    <section id="problem-section" className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20 mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>The Silent Cloud Crisis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The Multi-Billion Dollar Non-Production Drain
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Why engineering orgs hemorrhage cloud budgets despite having legacy FinOps tools.
        </p>
      </div>

      {/* Main Grid: $17B Hero Infographic + Enterprise Anchor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (5 cols): $17B Infographic & Money Drain Visual */}
        <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-red-950/40 via-slate-900/80 to-slate-950 border border-red-500/30 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          
          {/* Background watermark */}
          <div className="absolute -right-6 -bottom-6 text-red-500/5 select-none pointer-events-none">
            <CloudOff className="w-64 h-64" />
          </div>

          <div className="space-y-4 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
              Global Cloud Waste Figure
            </span>

            <div className="space-y-1">
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tight flex items-baseline">
                <span className="text-red-400 mr-1">$</span>17,000,000,000
              </div>
              <p className="text-sm font-semibold text-red-300">
                $17 Billion Lost Annually in Idle & Orphaned Cloud Compute
              </p>
            </div>

            {/* Cloud Icon + Money Drain Infographic */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-red-500/20 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                <span className="flex items-center space-x-1.5">
                  <CloudOff className="w-4 h-4 text-red-400" />
                  <span>24/7 Staging Cluster Leakage</span>
                </span>
                <span className="text-red-400 font-mono font-bold">-68% Utility</span>
              </div>

              {/* Visual Meter */}
              <div className="space-y-1.5">
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full w-[24%]" title="Active Dev Hours (40 hrs/wk)" />
                  <div className="bg-red-500 h-full w-[76%] animate-pulse" title="Idle Waste (128 hrs/wk)" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span className="text-emerald-400 font-semibold">40h Working Dev</span>
                  <span className="text-red-400 font-bold">128h Off-Hours Waste (Nights/Weekends)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Anchor Example */}
          <div className="mt-6 pt-4 border-t border-red-500/20 relative z-10">
            <div className="flex items-start space-x-3 bg-red-950/50 p-3.5 rounded-xl border border-red-500/25">
              <ServerCrash className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Enterprise Anchor Example</div>
                <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
                  <strong className="text-red-300">“Mid-size SaaS firms spend ~40% of non-prod budgets on idle staging clusters.”</strong>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col (7 cols): 3 Core Problem Pillars */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Card 1: 68%+ Weekly Hours Idle */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-red-400 font-bold">PAIN POINT 01</span>
                <h3 className="text-base font-bold text-white mt-0.5">Off-Hours Zombie Compute</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Staging, QA, and Dev VMs run 24/7. Teams only use them 40 hours per week — leaving 128 hours of pure budget drain every week.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
              <span className="text-slate-400">Waste Ratio:</span>
              <strong className="text-red-400 font-mono">76.2% of Hours</strong>
            </div>
          </div>

          {/* Card 2: Silent Ghost Assets */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Ghost className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-amber-400 font-bold">PAIN POINT 02</span>
                <h3 className="text-base font-bold text-white mt-0.5">Silent Ghost Storage & IPs</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Terminated instances leave unattached EBS storage, idle ALBs, and orphan Elastic IPs that silently bill credit cards month after month.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
              <span className="text-slate-400">Avg Monthly Leak:</span>
              <strong className="text-amber-400 font-mono">$1,200–$4,500</strong>
            </div>
          </div>

          {/* Card 3: Passive FinOps Alert Fatigue */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <FileWarning className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-bold">PAIN POINT 03</span>
                <h3 className="text-base font-bold text-white mt-0.5">Passive Advisory Bottleneck</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Legacy FinOps tools output static PDF reports and Jira tickets. Engineers ignore them out of fear that automated shutdowns cause downtime.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
              <span className="text-slate-400">Action Rate:</span>
              <strong className="text-cyan-400 font-mono">&lt; 8% Executed</strong>
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}
