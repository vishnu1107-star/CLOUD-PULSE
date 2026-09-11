'use client'

import React from 'react'
import { Cpu, ShieldCheck, Zap, Server, Activity, CheckCircle2, Lock, Radio } from 'lucide-react'

export function HardwareVisualizer() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              C-DAC VEGA RISC-V Edge Hardware Co-Design
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Physical Edge IoT Gateway architecture providing tamper-proof credential isolation &amp; continuous sub-5W telemetry polling.
          </p>
        </div>

        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>VEGA ARIES Architecture Target</span>
        </span>
      </div>

      {/* Hardware Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Core 1: RISC-V Processing Unit */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">01. Edge Compute Core</span>
            <Cpu className="w-4 h-4 text-blue-600" />
          </div>
          <h4 className="text-base font-extrabold text-gray-900">THEJAS32 / ARIES v3.0 SoC</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Runs CloudPulse lightweight telemetry pre-filter compiled natively on 32-bit RISC-V (ET1031 core). Decimates 85-95% of active noise.
          </p>
          <div className="text-[11px] font-mono text-blue-700 bg-white p-2.5 rounded-xl border border-gray-200">
            • Clock: 100 MHz (ET1031 Core)<br />
            • ISA: RV32IM RISC-V<br />
            • TARGET EDGE PROCESSING LATENCY: &lt;350ns
          </div>
        </div>

        {/* Core 2: Tamper-Proof Key Isolation */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">02. Hardware Security</span>
            <Lock className="w-4 h-4 text-emerald-600" />
          </div>
          <h4 className="text-base font-extrabold text-gray-900">Physical Key Isolation Vault</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            AWS IAM access secrets and GCP Service Account keys reside exclusively within on-chip secure storage, preventing exposure over external networks.
          </p>
          <div className="text-[11px] font-mono text-emerald-700 bg-white p-2.5 rounded-xl border border-gray-200">
            • Hardware Root of Trust<br />
            • Encrypted Bus Interface<br />
            • Zero-Cloud-Credential Exposure
          </div>
        </div>

        {/* Core 3: Ultra-Low Power Draw */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">03. Green Hardware</span>
            <Zap className="w-4 h-4 text-indigo-600" />
          </div>
          <h4 className="text-base font-extrabold text-gray-900">Sub-5W Ultra-Low Power Draw</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Replaces bloated, power-hungry cloud monitoring daemon containers with a dedicated edge probe consuming less power than a single LED lightbulb.
          </p>
          <div className="text-[11px] font-mono text-indigo-700 bg-white p-2.5 rounded-xl border border-gray-200">
            • Power Draw: &lt; 4.2 Watts<br />
            • PoE / USB-C Powered<br />
            • Zero Host VM Overhead
          </div>
        </div>

      </div>

    </div>
  )
}
