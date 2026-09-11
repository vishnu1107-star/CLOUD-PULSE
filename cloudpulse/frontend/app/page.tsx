'use client'

import React from 'react'

import { LandingHero } from '@/components/landing-hero'
import { LandingSolution } from '@/components/landing-solution'
import { LiveControlConsole } from '@/components/live-control-console'
import { HardwareVisualizer } from '@/components/hardware-visualizer'
import { LandingValidation } from '@/components/landing-validation'

export default function OverviewDashboard() {
  return (
    <div className="space-y-16">
      
      {/* a. Hero Section: Problem statement + "RUN CLOUDPULSE DEMO" button */}
      <LandingHero />

      {/* b. The 5-stage loop: Telemetry -> Detect -> Vault -> Reclaim -> Hydrate */}
      <LandingSolution />

      {/* c. Live Decision Console: Embedded directly on the homepage for immediate judge view */}
      <LiveControlConsole />

      {/* d. Edge Hardware Section: VEGA Aries board details, USB connection & live hardware badge */}
      <HardwareVisualizer />

      {/* e. Detection Model Validation: Empirical proof of Isolation Forest on real VM trace data */}
      <LandingValidation />

    </div>
  )
}
