'use client'

import React from 'react'
import { Cpu, ShieldCheck, Zap, Server, Activity, CheckCircle2, Lock, Radio } from 'lucide-react'

export function HardwareVisualizer() {
  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-surface/60 backdrop-blur-md p-6 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">
              C-DAC VEGA RISC-V Edge Hardware Co-Design
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Physical Edge IoT Gateway architecture providing tamper-proof credential isolation & continuous sub-5W telemetry polling.
          </p>
        </div>

        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>VEGA ARIES Core Active</span>
        </span>
      </div>

      {/* Hardware Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Core 1: RISC-V Processing Unit */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">01. Edge Compute Core</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <h4 className="text-base font-extrabold text-white">THEJAS32 / ARIES SoC</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Runs CloudPulse telemetry daemon compiled natively on 32-bit RISC-V (RV32IM) architecture. Executes local rolling mathematical averages with zero cloud overhead.
          </p>
          <div className="text-[11px] font-mono text-cyan-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            • Clock: 100 MHz<br />
            • ISA: RV32IM RISC-V<br />
            • RAM: 256 MB On-Board
          </div>
        </div>

        {/* Core 2: Tamper-Proof Key Isolation */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">02. Hardware Security</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <h4 className="text-base font-extrabold text-white">Physical Key Isolation Vault</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            AWS IAM access secrets and GCP Service Account keys reside exclusively within on-chip secure storage, preventing exposure over external networks.
          </p>
          <div className="text-[11px] font-mono text-emerald-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            • AES-256 Key Vault<br />
            • Isolated Memory Region<br />
            • Zero Cloud Credential Leak
          </div>
        </div>

        {/* Core 3: Ultra Low Power Draw */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">03. Green Hardware</span>
            <Zap className="w-4 h-4 text-violet-400" />
          </div>
          <h4 className="text-base font-extrabold text-white">Sub-5W Continuous Draw</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Consumes under 3.5 Watts while operating 24/7 continuous cloud discovery and policy execution, replacing bulky 200W x86 monitoring servers.
          </p>
          <div className="text-[11px] font-mono text-violet-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            • Power: 3.2W Active<br />
            • Energy: 0.076 kWh / day<br />
            • 98.4% Hardware Energy Saved
          </div>
        </div>

      </div>

      {/* Real-time Hardware Pinout & Control Loop Stream */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2 text-slate-300">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>VEGA Gateway Hardware Status: <strong className="text-emerald-400">ONLINE (GPIO 14 Heartbeat OK)</strong></span>
        </div>
        <div className="flex items-center space-x-3 text-slate-500 font-mono text-[11px]">
          <span>UART0: 115200 baud</span>
          <span>•</span>
          <span>Firmware: v1.0.4-riscv</span>
        </div>
      </div>

    </div>
  )
}
