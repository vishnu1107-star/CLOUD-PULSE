'use client'

import React from 'react'
import { ArchitectureFlow } from '@/components/architecture-flow'
import { HardwareVisualizer } from '@/components/hardware-visualizer'

export default function ArchitecturePage() {
  return (
    <div className="space-y-8">
      <ArchitectureFlow />
      <HardwareVisualizer />
    </div>
  )
}
