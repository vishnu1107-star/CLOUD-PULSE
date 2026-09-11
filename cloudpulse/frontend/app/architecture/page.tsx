'use client'

import React from 'react'
import { ArchitectureFlow } from '@/components/architecture-flow'
import { HardwareVisualizer } from '@/components/hardware-visualizer'
import { PipelineVisualizer } from '@/components/pipeline-visualizer'
import { Cpu, Layers, ShieldCheck, Zap } from 'lucide-react'

export default function ArchitecturePage() {
  return (
    <div className="space-y-8 text-gray-900">
      
      {/* Architecture Overview Banner */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-blue-600">
          <Layers className="w-4 h-4" />
          <span>TECHNICAL ARCHITECTURE • EMBRIX&apos;26 VEGATHON</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          CloudPulse Edge-AI &amp; Reversible Recovery Architecture
        </h1>
        <blockquote className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 font-medium leading-relaxed">
          &ldquo;Edge inference reduces unnecessary raw telemetry transmission and provides a low-latency safety layer before autonomous cloud action.&rdquo;
        </blockquote>
      </div>

      {/* Hero Pipeline Flow Component */}
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
