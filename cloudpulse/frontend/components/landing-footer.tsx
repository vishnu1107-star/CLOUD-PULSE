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
              “Edge AI &amp; TinyML-powered autonomous cloud waste reclamation with reversible recovery.”
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/vishnu1107-star/CLOUD-PULSE-2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Github className="w-4 h-4 text-white" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>
          </div>

        </div>

        {/* Middle Navigation Columns: Featured Proof Pages */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
          
          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">Proof &amp; Control</div>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Live Decision Console
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Workloads Inventory
                </Link>
              </li>
              <li>
                <Link href="/vault" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Snapshot Vault
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">Edge &amp; Detection</div>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/architecture" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Edge Hardware &amp; Architecture
                </Link>
              </li>
              <li>
                <Link href="/ml-insights" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Detection Model Validation
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">Hardware Target</div>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="text-gray-700 font-medium">C-DAC VEGA Aries v2 RISC-V SoC</span>
              </li>
              <li>
                <span className="text-gray-500">RV32IM Core • 100MHz</span>
              </li>
              <li>
                <span className="text-gray-500">USB Serial Gateway Ingestion</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">Source Code &amp; Data</div>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a
                  href="https://github.com/vishnu1107-star/CLOUD-PULSE-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline flex items-center space-x-1"
                >
                  <span>Open Source Repository</span>
                  <ExternalLink className="w-2.5 h-2.5 text-blue-400" />
                </a>
              </li>
              <li>
                <span className="text-gray-500">Bitbrains GWA-T-12 Dataset</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Attribution Line */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-[11px]">
          <div>
            © 2026 CloudPulse • <strong className="text-gray-800 font-semibold">EMBRIX&apos;26 VEGATHON — Edge AI &amp; TinyML Track (Bannari Amman Institute of Technology)</strong>.
          </div>

          <div className="flex items-center space-x-3 text-gray-500">
            <span>Flask + Next.js 14</span>
            <span>•</span>
            <span>VEGA Aries RISC-V</span>
            <span>•</span>
            <span>Isolation Forest ML</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">MIT License</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
