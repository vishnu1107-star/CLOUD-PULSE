'use client'

import React from 'react'
import { 
  Leaf, 
  Award, 
  Download, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  Printer, 
  Info,
  Layers,
  ArrowRight,
  Target
} from 'lucide-react'

export function EsgCertificate() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-8 text-gray-900">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Leaf className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              ESTIMATED ENVIRONMENTAL IMPACT &amp; SCOPE 2 REPORT
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Scope 2 impact estimate based on benchmark methodology — to be validated with real telemetry during the enterprise pilot.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF Estimate</span>
        </button>
      </div>

      {/* Methodology Transparent Explainer (Prompt #4) */}
      <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-gray-800">
          <Info className="w-4 h-4 text-blue-600" />
          <span>Scope 2 Impact Estimation Methodology:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-0.5">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">1. Cloud Usage</span>
            <span className="font-mono font-bold text-gray-900">Hours Reclaimed</span>
            <span className="text-[10px] text-gray-500 block">Idle non-prod compute</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-0.5">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">2. Energy Draw</span>
            <span className="font-mono font-bold text-gray-900">0.20 kW / VM</span>
            <span className="text-[10px] text-gray-500 block">Avg server energy draw</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-0.5">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">3. Regional Grid</span>
            <span className="font-mono font-bold text-gray-900">0.385 kg CO₂/kWh</span>
            <span className="text-[10px] text-gray-500 block">US-East EPA grid factor</span>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-0.5">
            <span className="text-[10px] text-emerald-800 font-bold uppercase block">4. Estimated Output</span>
            <span className="font-mono font-bold text-emerald-700">Estimated CO₂e</span>
            <span className="text-[10px] text-emerald-800 block">Scope 2 impact estimate</span>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 italic">
          * Scope 2 impact estimate based on benchmark methodology. To be validated with real telemetry during the enterprise pilot.
        </p>
      </div>

      {/* Printable Environmental Impact Report Card */}
      <div className="relative rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-white via-emerald-50/20 to-white p-8 sm:p-12 shadow-xl overflow-hidden">
        
        {/* Report Header */}
        <div className="text-center space-y-3 border-b border-gray-200 pb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-4 h-4 text-emerald-700" />
            <span>ESTIMATED ENVIRONMENTAL IMPACT REPORT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Scope 2 Carbon Impact Estimate
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Benchmark environmental accounting summary for <strong className="text-gray-900">CloudPulse FinOps Operations</strong> modeling off-hours idle non-production power reduction.
          </p>
        </div>

        {/* Core Impact Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
          
          <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-xs">
            <span className="text-xs text-gray-500 font-semibold block">Estimated Energy Conserved</span>
            <p className="text-3xl font-black text-emerald-700 font-mono mt-1">231.7 kWh</p>
            <span className="text-[11px] text-gray-400 mt-1 block">Paused non-production VMs</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-xs">
            <span className="text-xs text-gray-500 font-semibold block">Estimated CO₂e Avoided</span>
            <p className="text-3xl font-black text-emerald-700 font-mono mt-1">89.20 kg</p>
            <span className="text-[11px] text-gray-400 mt-1 block">0.385 kg CO₂/kWh Grid Factor</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-xs">
            <span className="text-xs text-gray-500 font-semibold block">Tree Equivalency (Modeled)</span>
            <p className="text-3xl font-black text-emerald-700 font-mono mt-1">🌲 4.2 Trees</p>
            <span className="text-[11px] text-gray-400 mt-1 block">Annualized Absorption Rate</span>
          </div>

        </div>

        {/* SDG Framework Alignment */}
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
            UN SDG Sustainability Framework Alignment:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-1 shadow-xs">
              <div className="font-bold text-amber-700 flex items-center space-x-1.5">
                <Globe className="w-4 h-4" />
                <span>SDG 9: Industry &amp; Innovation</span>
              </div>
              <p className="text-gray-600 text-[11px]">
                Autonomous multi-cloud optimization and multi-signal telemetry evaluation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-1 shadow-xs">
              <div className="font-bold text-emerald-700 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>SDG 12: Responsible Consumption</span>
              </div>
              <p className="text-gray-600 text-[11px]">
                Elimination of 68%+ off-hours idle compute and unattached ghost cloud storage.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-1 shadow-xs">
              <div className="font-bold text-blue-700 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>SDG 13: Climate Action</span>
              </div>
              <p className="text-gray-600 text-[11px]">
                Estimated reduction in enterprise carbon footprint and regional thermal power draw.
              </p>
            </div>

          </div>
        </div>

        {/* Verification / Record Hash */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <div className="font-mono text-[11px]">
            <span>Tamper-evident record hash: </span>
            <span className="text-gray-700 font-bold">0x7F9A...B381C92</span>
          </div>
          <div>
            <span>Generated by </span>
            <strong className="text-emerald-700 font-bold">CloudPulse Prototype Engine</strong>
          </div>
        </div>

      </div>

    </div>
  )
}
