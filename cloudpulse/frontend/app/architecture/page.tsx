'use client'

import React from 'react'
import { ArchitectureFlow } from '@/components/architecture-flow'
import { HardwareVisualizer } from '@/components/hardware-visualizer'
import { PipelineVisualizer } from '@/components/pipeline-visualizer'
import { Cpu, Layers, ShieldCheck, Zap, ExternalLink, Github, Terminal } from 'lucide-react'

export default function ArchitecturePage() {
  return (
    <div className="space-y-8 text-gray-900 max-w-7xl mx-auto">
      
      {/* Architecture Overview Banner */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 mb-1">
              <Layers className="w-4 h-4" />
              <span>EMBRIX&apos;26 VEGATHON — EDGE AI &amp; TINYML TRACK</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Edge Hardware &amp; Architecture
            </h1>
          </div>

          <a
            href="https://github.com/vishnu1107-star/CLOUD-PULSE-2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all shrink-0"
          >
            <Github className="w-4 h-4 text-white" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3 h-3 text-white/80" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          CloudPulse pairs low-power C-DAC VEGA Aries RISC-V edge hardware with an autonomous 5-stage cloud reclamation pipeline. Raw telemetry is processed on-chip to reduce noise before triggering anomaly detection and reversible snapshot vaulting.
        </p>

        {/* USB Serial Bridge Workflow Card */}
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">VEGA Hardware Serial Ingestion Pipeline</span>
            </div>
            <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded">
              USB SERIAL → FLASK INGESTION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
              <span className="text-emerald-400 font-bold font-mono">Step 1: VEGA Aries Board</span>
              <p className="text-slate-300 text-[11px]">
                ET1031 32-bit RISC-V core packs 16-byte binary frames containing CPU %, network, sockets, and IOPS over UART (115200 baud).
              </p>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
              <span className="text-blue-400 font-bold font-mono">Step 2: serial_bridge.py</span>
              <p className="text-slate-300 text-[11px]">
                Serial bridge reads COM port, unpacks binary payload, and POSTs JSON frames to <code className="text-blue-300">/api/v1/edge/telemetry</code>.
              </p>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
              <span className="text-indigo-400 font-bold font-mono">Step 3: Flask Control Loop</span>
              <p className="text-slate-300 text-[11px]">
                Flask backend evaluates anomaly score, updates decision tracker, fires Slack updates, and updates Next.js live UI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Stage Control Loop Visualizer */}
      <PipelineVisualizer
        activeStage="reclaim"
        completedStages={['vega', 'telemetry', 'tinyml', 'isolation_forest', 'safety_gate', 'vault', 'reclaim', 'slack', 'hydrate']}
        liveHydrationSeconds={2.37}
      />

      <ArchitectureFlow />
      <HardwareVisualizer />
    </div>
  )
}
