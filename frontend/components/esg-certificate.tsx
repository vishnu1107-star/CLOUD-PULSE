'use client'

import React from 'react'
import { Leaf, Award, Download, CheckCircle2, Globe, ShieldCheck, Printer } from 'lucide-react'

export function EsgCertificate() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span>Corporate ESG & Green Computing Verification</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Verifiable greenhouse gas emission abatement certificate for corporate sustainability reporting.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF Certificate</span>
        </button>
      </div>

      {/* Certificate Framed Card */}
      <div className="relative rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 shadow-2xl overflow-hidden">
        
        {/* Ambient Corner Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center space-y-3 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Official Green Cloud Certificate</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certificate of Carbon Emissions Abatement
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Issued to <strong className="text-white">Enterprise Cloud Operations</strong> for verified reduction in non-production infrastructure idle power consumption.
          </p>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
          
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-center">
            <span className="text-xs text-slate-400 font-medium">Idle Energy Saved</span>
            <p className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">231.7 kWh</p>
            <span className="text-[11px] text-slate-500 mt-1 block">Sub-5W VEGA SoC Gateway</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-violet-500/30 text-center">
            <span className="text-xs text-slate-400 font-medium">CO₂e Abatement</span>
            <p className="text-3xl font-extrabold text-violet-400 font-mono mt-1">89.20 kg</p>
            <span className="text-[11px] text-slate-500 mt-1 block">0.385 kg CO₂/kWh Grid Factor</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 text-center">
            <span className="text-xs text-slate-400 font-medium">Tree Equivalency</span>
            <p className="text-3xl font-extrabold text-cyan-400 font-mono mt-1">4.2 Trees</p>
            <span className="text-[11px] text-slate-500 mt-1 block">Annualized Absorption Rate</span>
          </div>

        </div>

        {/* SDG Alignments */}
        <div className="space-y-4 border-t border-slate-800 pt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            United Nations Sustainable Development Goals (SDG) Alignment:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400 flex items-center space-x-1.5">
                <Globe className="w-4 h-4" />
                <span>SDG 9: Industry & Innovation</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Autonomous multi-cloud optimization and RISC-V edge hardware co-design.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>SDG 12: Responsible Consumption</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Elimination of 68%+ off-hours idle compute and orphaned ghost cloud storage.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>SDG 13: Climate Action</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Direct quantifiable reduction in enterprise carbon emissions and grid load.
              </p>
            </div>

          </div>
        </div>

        {/* Verification Footer */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="font-mono text-[11px]">
            <span>Verification Hash: </span>
            <span className="text-slate-400">0x7F9A...B381C92</span>
          </div>
          <div>
            <span>Certified by </span>
            <strong className="text-emerald-400 font-semibold">CloudPulse FinOps Engine v1.0</strong>
          </div>
        </div>

      </div>

    </div>
  )
}
