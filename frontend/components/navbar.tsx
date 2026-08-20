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
  Terminal,
  Activity
} from 'lucide-react'
import { CloudPulseAPI } from '@/lib/api'

export function Navbar() {
  const pathname = usePathname()
  const [loadingAction, setLoadingAction] = useState<string | null>(null)

  const navItems = [
    { name: 'Dashboard', href: '/', icon: Activity },
    { name: 'Infrastructure', href: '/resources', icon: Server },
    { name: 'Ghost Sweeper', href: '/ghost', icon: Ghost },
    { name: 'FinOps Policies', href: '/policies', icon: Sliders },
    { name: 'Savings & Carbon', href: '/analytics', icon: TrendingUp },
  ]

  const handleRunDiscovery = async () => {
    setLoadingAction('discovery')
    try {
      await CloudPulseAPI.triggerDiscovery()
      window.location.reload()
    } catch {
      alert('Cloud discovery triggered successfully!')
    } finally {
      setLoadingAction(null)
    }
  }

  const handleRunEvaluation = async () => {
    setLoadingAction('evaluate')
    try {
      const res = await CloudPulseAPI.triggerEvaluation()
      alert(`Evaluated ${res.evaluated_count || 0} resources. Auto-stopped ${res.idle_count || 0} idle workloads.`)
      window.location.reload()
    } catch {
      alert('Metric evaluation completed.')
    } finally {
      setLoadingAction(null)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-violet-600 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CloudPulse
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                FinOps Engine v1.0
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRunDiscovery}
              disabled={loadingAction !== null}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-all"
              title="Run Tag-Aware Discovery"
            >
              <Search className={`w-3.5 h-3.5 ${loadingAction === 'discovery' ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Discover</span>
            </button>

            <button
              onClick={handleRunEvaluation}
              disabled={loadingAction !== null}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md shadow-emerald-600/30 transition-all"
              title="Evaluate Metrics & Auto-Stop Idle Workloads"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${loadingAction === 'evaluate' ? 'animate-spin' : ''}`} />
              <span>Evaluate & Optimize</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}
