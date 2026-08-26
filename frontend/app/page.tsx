'use client'

import React from 'react'

// 8 Sections Components
import { LandingHero } from '@/components/landing-hero'
import { LandingProblem } from '@/components/landing-problem'
import { LandingSolution } from '@/components/landing-solution'
import { LandingTechnology } from '@/components/landing-technology'
import { LandingValidation } from '@/components/landing-validation'
import { LandingImpact } from '@/components/landing-impact'
import { LandingBusiness } from '@/components/landing-business'
import { LiveControlConsole } from '@/components/live-control-console'

export default function OverviewDashboard() {
  return (
    <div className="space-y-16">
      
      {/* 1. Hero Section (Landing Page) */}
      <LandingHero />

      {/* 2. Problem Section ($17B Waste Infographic) */}
      <LandingProblem />

      {/* 3. Solution Section (5-Stage Loop & Safety Principle) */}
      <LandingSolution />

      {/* 4. Technology Section (Stack & Competitor Comparison) */}
      <LandingTechnology />

      {/* 5. Validation Section (ROI Metrics & Empirical Simulator) */}
      <LandingValidation />

      {/* 6. Impact Section (UN SDG Badges & CO2 Infographic) */}
      <LandingImpact />

      {/* 7. Business & Scale Section (TAM/SAM/SOM & 90-Day Roadmap) */}
      <LandingBusiness />

      {/* Live Interactive Control Engine & Workloads Console */}
      <LiveControlConsole />

    </div>
  )
}
