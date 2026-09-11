'use client'

import React, { useState } from 'react'
import { Sparkles, ShieldCheck, HelpCircle, Check, Info, Play } from 'lucide-react'

export function DemoBanner({ onOpenJudgeDemo }: { onOpenJudgeDemo?: () => void }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs border-b border-indigo-700/50 shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        
        {/* Left: Mode Badge & Message */}
        <div className="flex items-center space-x-2.5">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>HYBRID DEMO</span>
          </span>
          
          <div className="flex items-center space-x-1 text-slate-200 text-xs">
            <span className="font-semibold text-white">Live VEGA Aries Hardware + Real Cloud VM Trace Data:</span>
            <span className="hidden md:inline text-slate-300">
              Live CDAC RISC-V edge hardware telemetry combined with real Bitbrains &amp; Azure VM trace replay.
            </span>
          </div>

          <div className="relative inline-block">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-slate-400 hover:text-white p-0.5"
              aria-label="Demo Mode Info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>

            {showTooltip && (
              <div className="absolute left-0 top-6 w-80 bg-slate-900 text-slate-200 border border-slate-700 p-3 rounded-xl shadow-2xl z-50 text-[11px] leading-relaxed">
                <strong className="text-white block mb-1">Hybrid Hardware + Trace Pipeline:</strong>
                Primary endpoint staging-api accepts live UART frame ingestion from C-DAC VEGA Aries v2 RISC-V hardware over USB serial. Secondary instances stream real Bitbrains/Azure dataset traces.
              </div>
            )}
          </div>
        </div>

        {/* Right: Action Button */}
        <div className="flex items-center space-x-2.5 shrink-0">
          <button
            onClick={onOpenJudgeDemo}
            className="flex items-center space-x-1.5 px-3.5 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-md shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>▶ RUN CLOUDPULSE DEMO</span>
          </button>

          <div className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
            <span className="text-[11px] text-slate-400">VEGA Hardware Pipeline:</span>
            <span className="text-emerald-400 font-mono font-bold text-[11px]">CONNECTED ✓</span>
          </div>
        </div>

      </div>
    </div>
  )
}
