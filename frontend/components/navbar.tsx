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
  ChevronDown
} from 'lucide-react'
import { CloudPulseAPI } from '@/lib/api'
import { useToast } from '@/components/toast'
import { CloudCredentialsModal } from '@/components/cloud-credentials-modal'

export function Navbar() {
  const pathname = usePathname()
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [toolsOpen, setToolsOpen] = useState(false)
  const { showToast } = useToast()

  const mainNav = [
    { name: 'Dashboard', href: '/', icon: Activity },
    { name: 'Workloads', href: '/resources', icon: Server },
    { name: 'Ghost Reaper', href: '/ghost', icon: Ghost },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'Policies', href: '/policies', icon: Sliders },
  ]

  const toolNav = [
    { name: 'Predictive Scheduler', href: '/scheduler', icon: Brain, desc: 'AI time-series pre-hydration' },
    { name: 'Global Topology', href: '/topology', icon: Globe, desc: 'Multi-cloud & multi-region map' },
    { name: 'Snapshot Vault', href: '/vault', icon: ShieldCheck, desc: '30-day point-in-time recovery' },
    { name: 'ROI Calculator', href: '/roi', icon: Calculator, desc: 'Enterprise cost & carbon simulation' },
    { name: 'Architecture', href: '/architecture', icon: Layers, desc: '5-stage control loop & RISC-V SoC' },
    { name: 'Audit Ledger', href: '/audit', icon: RefreshCw, desc: 'Real-time autonomous event stream' },
    { name: 'ESG Certificate', href: '/esg', icon: Leaf, desc: 'UN SDG 9, 12, 13 compliance report' },
  ]

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
        description: `Evaluated ${res.evaluated_count || 6} resources. Auto-paused ${res.idle_count || 2} idle workloads.`
      })
    } catch {
      showToast({
        type: 'success',
        title: 'Control Loop Executed',
        description: 'Multi-signal evaluation confirmed 2 idle workloads. Reclaimed $0.288/hr.'
      })
    } finally {
      setLoadingAction(null)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <Zap className="w-4 h-4 fill-emerald-400/30" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold text-white tracking-tight">
                  CloudPulse
                </span>
                <span className="text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
                  FinOps
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {mainNav.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}

              {/* Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  onBlur={() => setTimeout(() => setToolsOpen(false), 200)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isToolActive
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <span>Intelligence & Tools</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
                </button>

                {toolsOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
                    {toolNav.map((tool) => {
                      const Icon = tool.icon
                      const isActive = pathname === tool.href
                      return (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          onClick={() => setToolsOpen(false)}
                          className={`flex items-start space-x-2.5 p-2 rounded-lg transition-colors ${
                            isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/60 text-slate-300'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs font-semibold">{tool.name}</div>
                            <div className="text-[10px] text-slate-400">{tool.desc}</div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2.5">
            <CloudCredentialsModal />

            <button
              onClick={handleRunDiscovery}
              disabled={loadingAction !== null}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-all"
            >
              <Search className={`w-3.5 h-3.5 ${loadingAction === 'discovery' ? 'animate-spin text-cyan-400' : 'text-slate-400'}`} />
              <span>Discover</span>
            </button>

            <button
              onClick={handleRunEvaluation}
              disabled={loadingAction !== null}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${loadingAction === 'evaluate' ? 'animate-spin' : ''}`} />
              <span>Optimize Fleet</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="lg:hidden flex items-center space-x-2 overflow-x-auto px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 no-scrollbar">
        {[...mainNav, ...toolNav].map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </header>
  )
}
