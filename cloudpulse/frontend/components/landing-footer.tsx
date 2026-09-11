'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Zap, 
  Github, 
  Play, 
  ExternalLink, 
  ShieldCheck, 
  Leaf, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  FlaskConical,
  Lock,
  DollarSign
} from 'lucide-react'

export function LandingFooter() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Top Section: Tagline & Main CTAs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-8">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Cloud<span className="text-blue-600">Pulse</span>
              </span>
            </div>
            
            <p className="text-sm font-semibold text-gray-800 max-w-md">
              “Make cloud waste reversible. Make FinOps autonomous.”
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/vishnu1107-star/CLOUD-PULSE-2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 text-xs font-semibold border border-gray-300 shadow-sm transition-all"
            >
              <Github className="w-4 h-4 text-gray-800" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>

            <Link
              href="/pilot"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Start 30-Day Pilot</span>
            </Link>
          </div>

        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
          
          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">Product &amp; Engine</div>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/resources" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Workloads Inventory
                </Link>
              </li>
              <li>
                <Link href="/vault" className="text-blue-600 hover:text-blue-700 hover:underline">
                  30-Day Snapshot Vault
                </Link>
              </li>
              <li>
                <Link href="/ghost" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Ghost Resource Reaper
                </Link>
              </li>
              <li>
                <Link href="/scheduler" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Predictive Pre-Hydration
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">Governance &amp; ROI</div>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/policies" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Safety Policies &amp; Thresholds
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-indigo-600" />
                  <span>Security &amp; Governance</span>
                </Link>
              </li>
              <li>
                <Link href="/audit" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Live Audit Ledger
                </Link>
              </li>
              <li>
                <Link href="/roi" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center space-x-1">
                  <DollarSign className="w-3 h-3 text-emerald-600" />
                  <span>ROI Simulator</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">Commercial &amp; Pilot</div>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/pricing" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Pricing &amp; Business Model
                </Link>
              </li>
              <li>
                <Link href="/pilot" className="text-emerald-700 font-semibold hover:underline flex items-center space-x-1">
                  <FlaskConical className="w-3 h-3 text-emerald-600" />
                  <span>30-Day Pilot Program</span>
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Financial Analytics
                </Link>
              </li>
              <li>
                <Link href="/esg" className="text-emerald-700 font-semibold hover:underline flex items-center space-x-1">
                  <Leaf className="w-3 h-3 text-emerald-600" />
                  <span>Environmental Impact Estimate</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">Technology &amp; Proof</div>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/ml-insights" className="text-blue-600 hover:text-blue-700 hover:underline">
                  ML Model Evidence
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="text-blue-600 hover:text-blue-700 hover:underline">
                  RISC-V SoC Architecture
                </Link>
              </li>
              <li>
                <Link href="/topology" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Global Multi-Cloud Map
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/vishnu1107-star/CLOUD-PULSE-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 hover:underline flex items-center space-x-1"
                >
                  <span>Open Source GitHub</span>
                  <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Attribution Line */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-[11px]">
          <div>
            © 2026 CloudPulse • Autonomous Multi-Cloud FinOps Engine • <strong className="text-gray-800 font-semibold">EMBRIX&apos;26 VEGATHON (Bannari Amman Institute of Technology)</strong>.
          </div>

          <div className="flex items-center space-x-3 text-gray-500">
            <span>FastAPI + Next.js 14</span>
            <span>•</span>
            <span>Isolation Forest ML</span>
            <span>•</span>
            <span>30-Day Snapshot Vault</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">MIT License</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
