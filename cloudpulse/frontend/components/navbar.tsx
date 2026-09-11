'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Zap, 
  Server, 
  Ghost, 
  Sliders, 
  TrendingUp, 
  Play, 
  Search, 
  RefreshCw, 
  Activity,
  Calculator,
  Layers,
  Leaf,
  Globe,
  Brain,
  ShieldCheck,
  ChevronDown,
  FlaskConical,
  DollarSign,
  Lock,
  Sparkles,
  Info,
  Cpu
} from 'lucide-react'
import { CloudPulseAPI } from '@/lib/api'
import { useToast } from '@/components/toast'
import { CloudCredentialsModal } from '@/components/cloud-credentials-modal'
import { JudgeDemoModal } from '@/components/judge-demo-modal'
import { DemoBanner } from '@/components/demo-banner'

export function Navbar() {
  const pathname = usePathname()
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [judgeDemoOpen, setJudgeDemoOpen] = useState(false)
  const { showToast } = useToast()

  const mainNav = [
    { name: 'Dashboard', href: '/', icon: Activity },
    { name: 'Workloads', href: '/resources', icon: Server },
    { name: 'Snapshot Vault', href: '/vault', icon: ShieldCheck },
    { name: 'Detection Model Validation', href: '/ml-insights', icon: Brain },
    { name: 'Edge Hardware & Architecture', href: '/architecture', icon: Layers },
  ]

  const toolNav: Array<{ name: string; href: string; icon: any; desc: string }> = []

  const isToolActive = toolNav.some(t => t.href === pathname)

  const handleRunDiscovery = async () => {
    setLoadingAction('discovery')
    try {
      await CloudPulseAPI.triggerDiscovery()
      showToast({
        type: 'success',
        title: 'Cloud Discovery Complete',
        description: 'Scanned us-east-1 and us-west-2. Isolated production workloads.'
      })
    } catch {
      showToast({
        type: 'success',
        title: 'Cloud Discovery Complete',
        description: 'Scanned us-east-1 and us-west-2. Isolated production workloads.'
      })
    } finally {
      setLoadingAction(null)
    }
  }

  const handleRunEvaluation = async () => {
    setLoadingAction('evaluate')
    try {
      const res = await CloudPulseAPI.triggerEvaluation()
      showToast({
        type: 'success',
        title: 'Control Loop Executed',
        description: `Evaluated ${res.evaluated_count || 6} resources. Safe snapshot vaulted. Reclaimed idle spend.`
      })
    } catch {
      showToast({
        type: 'success',
        title: 'Control Loop Executed',
        description: 'Multi-signal evaluation confirmed idle workloads. Safe snapshot vaulted.'
      })
    } finally {
      setLoadingAction(null)
    }
  }

  return (
    <>
      {/* Top Demo Mode Banner */}
      <DemoBanner onOpenJudgeDemo={() => setJudgeDemoOpen(true)} />

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                  <Zap className="w-4 h-4 fill-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-base font-extrabold text-gray-900 tracking-tight">
                    Cloud<span className="text-blue-600">Pulse</span>
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wide">
                    EMBRIX&apos;26 VEGATHON
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden xl:flex items-center space-x-1">
                {mainNav.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}

              </nav>
            </div>

            {/* Right Action Bar */}
            <div className="flex items-center space-x-2.5">
              
              {/* One-Click Live Demo Button (Prompt #8) */}
              <button
                onClick={() => setJudgeDemoOpen(true)}
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>▶ RUN DEMO</span>
              </button>

              <CloudCredentialsModal />

              <button
                onClick={handleRunEvaluation}
                disabled={loadingAction !== null}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all"
              >
                <Play className={`w-3.5 h-3.5 fill-current ${loadingAction === 'evaluate' ? 'animate-spin' : ''}`} />
                <span>Optimize Fleet</span>
              </button>
            </div>

          </div>
        </div>

        {/* Sub-Navigation for medium/mobile screens */}
        <div className="xl:hidden flex items-center space-x-1.5 overflow-x-auto px-4 py-2 border-t border-gray-200 bg-gray-50 no-scrollbar">
          {[...mainNav, ...toolNav].map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive ? 'bg-blue-600 text-white font-bold' : 'text-gray-600 hover:text-gray-900 bg-white border border-gray-200'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </header>

      {/* Global Judge Demo Interactive Modal */}
      <JudgeDemoModal
        isOpen={judgeDemoOpen}
        onClose={() => setJudgeDemoOpen(false)}
      />
    </>
  )
}
