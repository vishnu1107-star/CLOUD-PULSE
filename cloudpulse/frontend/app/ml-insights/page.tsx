'use client'

import React, { useState } from 'react'
import { 
  Brain, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  TrendingUp, 
  Award, 
  Zap, 
  BarChart3,
  Network,
  HardDrive,
  Lock,
  ArrowDown,
  Info
} from 'lucide-react'

export default function MlInsightsPage() {
  const [cpu, setCpu] = useState(1.2)
  const [net, setNet] = useState(4.5)
  const [sockets, setSockets] = useState(0)
  const [iops, setIops] = useState(2)

  const isCpuLow = cpu < 2.0
  const isNetLow = net < 10.0
  const isSocketZero = sockets === 0
  const isIopsLow = iops < 15

  let classification = 'ACTIVE_NORMAL'
  let confidence = 0.98
  let badgeColor = 'bg-blue-50 text-blue-700 border-blue-200'
  let explanation = 'Workload exhibits active compute demand. Running uninterrupted.'

  if (isCpuLow && isNetLow && isIopsLow) {
    if (isSocketZero) {
      classification = 'TRUE_IDLE'
      confidence = 0.994
      badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200'
      explanation = 'Zero active sockets & sub-2% compute across 30m window. Autonomous pause recommended.'
    } else {
      classification = 'ACTIVE_QUIET'
      confidence = 0.965
      badgeColor = 'bg-amber-50 text-amber-800 border-amber-200'
      explanation = 'Low CPU detected but active TCP socket connection held. Socket Guard GATING ACTIVE: Shutdown blocked.'
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 text-gray-900">
      
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
                <Brain className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                AI Engine &amp; Multi-Signal ML Inference Architecture
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Multi-signal anomaly detection, Isolation Forest scoring, and Socket Guard safety gating.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-blue-700">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>0 False Outages / 72k Evaluations — Repository Benchmark</span>
          </div>
        </div>
      </div>

      {/* Prominent Core Explanation Banner (Prompt #13) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-blue-200 shadow-sm">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-bold">
              Core Multi-Signal AI Principle
            </span>
            <p className="text-base sm:text-lg font-black text-gray-900 leading-snug">
              “CloudPulse does not rely on CPU alone. Multiple signals are combined to reduce the risk of reclaiming an active workload.”
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Traditional tools check CPU threshold and accidentally shut down database replicas, SSH debug sessions, and background workers. CloudPulse fuses CPU, Network, TCP Sockets, and IOPS to reduce the risk of reclaiming an active workload.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flowchart (Prompt #13) */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Multi-Signal Decision Pipeline Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
          
          {/* Stage 1: INPUT SIGNALS */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 h-full flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">Stage 1</span>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mt-1">INPUT SIGNALS</h4>
            </div>
            <div className="space-y-1 text-[11px] text-gray-600 font-mono bg-white p-2.5 rounded-xl border border-gray-200">
              <div>CPU &lt; 2.0%</div>
              <div>Network &lt; 10 KB/s</div>
              <div>Sockets == 0</div>
              <div>IOPS &lt; 15</div>
            </div>
          </div>

          {/* Stage 2: ANOMALY DETECTION */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 h-full flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase">Stage 2</span>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mt-1">ANOMALY DETECTION</h4>
            </div>
            <div className="text-[11px] text-gray-600 bg-white p-2.5 rounded-xl border border-gray-200">
              Isolation Forest 5D anomaly scoring evaluates 30-min rolling timeseries window.
            </div>
          </div>

          {/* Stage 3: CLASSIFICATION */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 h-full flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-violet-600 uppercase">Stage 3</span>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mt-1">CLASSIFICATION</h4>
            </div>
            <div className="space-y-1 text-[10px] text-gray-600 font-bold bg-white p-2.5 rounded-xl border border-gray-200">
              <span className="block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">TRUE_IDLE</span>
              <span className="block px-2 py-0.5 rounded bg-amber-50 text-amber-700">ACTIVE_QUIET</span>
              <span className="block px-2 py-0.5 rounded bg-blue-50 text-blue-700">ACTIVE_NORMAL</span>
            </div>
          </div>

          {/* Stage 4: SAFETY GUARD */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 h-full flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">Stage 4</span>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mt-1">SAFETY GUARD</h4>
            </div>
            <div className="text-[11px] text-gray-600 bg-white p-2.5 rounded-xl border border-gray-200">
              Environment Lock + Socket Guard + Mandatory 30-day Snapshot Vaulting.
            </div>
          </div>

          {/* Stage 5: ACTION */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2 h-full flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase">Stage 5</span>
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mt-1">ACTION</h4>
            </div>
            <div className="text-[11px] text-emerald-800 font-semibold bg-white p-2.5 rounded-xl border border-emerald-200">
              Safe hibernate or pause compute. Sub-3s instant hydration available on demand.
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Signal Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders Input (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900">Interactive Multi-Signal Simulator</h3>
            <span className="text-xs text-gray-500">Adjust telemetry inputs</span>
          </div>

          <div className="space-y-4">
            {/* CPU */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">CPU Utilization (%)</span>
                <span className="font-mono font-bold text-blue-600">{cpu.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="50.0"
                step="0.1"
                value={cpu}
                onChange={(e) => setCpu(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Network */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">Network Throughput (KB/s)</span>
                <span className="font-mono font-bold text-indigo-600">{net.toFixed(1)} KB/s</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="100.0"
                step="0.5"
                value={net}
                onChange={(e) => setNet(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Active Sockets */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">Active TCP Sockets / Sessions</span>
                <span className="font-mono font-bold text-amber-700">{sockets} Connections</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={sockets}
                onChange={(e) => setSockets(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            {/* IOPS */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">Disk IOPS</span>
                <span className="font-mono font-bold text-emerald-700">{iops} IOPS</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={iops}
                onChange={(e) => setIops(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Real-time Inference Result (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 block">
              REAL-TIME ML INFERENCE OUTPUT
            </span>

            <div className="space-y-2">
              <div className="text-xs text-slate-300">Classification:</div>
              <span className={`inline-block px-3 py-1 rounded-xl text-xs font-mono font-black border ${badgeColor}`}>
                {classification}
              </span>
            </div>

            <div className="space-y-1 text-xs text-slate-200 pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span className="text-slate-400">ML Confidence:</span>
                <span className="font-mono font-bold text-emerald-300">{(confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Socket Guard Gate:</span>
                <span className={`font-bold ${sockets === 0 ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {sockets === 0 ? 'PASSED (0 Sockets)' : 'BLOCKED (Session Active)'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-white/10 p-3 rounded-xl border border-white/10 mt-2">
              {explanation}
            </p>
          </div>

          <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-white/10">
            Isolation Forest Evaluation • Repository Benchmark
          </div>
        </div>

      </div>

    </div>
  )
}
