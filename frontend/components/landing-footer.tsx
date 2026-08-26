'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Zap, 
  Github, 
  Play, 
  Mail, 
  ExternalLink, 
  Heart, 
  ShieldCheck, 
  Leaf, 
  Layers, 
  Calculator, 
  FlaskConical,
  Activity
} from 'lucide-react'

export function LandingFooter() {
  return (
    <footer id="contact-footer" className="mt-16 border-t border-slate-800/80 bg-slate-950/90 pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Tier: Brand, Tagline & Primary Action Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand & Repeated Tagline (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Zap className="w-4 h-4 fill-emerald-400/30" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">CloudPulse</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                FinOps Engine
              </span>
            </div>

            {/* Repeated Tagline */}
            <p className="text-sm font-semibold text-slate-200 leading-relaxed italic">
              “Make cloud waste reversible. Make FinOps autonomous.”
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Autonomous multi-cloud non-prod cost reclamation and sub-3s instant warm hydration engine co-designed with C-DAC VEGA RISC-V edge hardware.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com/vishnu1107-star/CLOUD-PULSE-2"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://youtu.be/YOUR_VIDEO_LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 transition-colors"
                title="Watch Demo Video"
              >
                <Play className="w-4 h-4" />
              </a>
              <a
                href="mailto:vishnupriya@cloudpulse.tech"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="Contact Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            
            {/* Col 1: Platform & Engines */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Engine & Modules</div>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/resources" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                    <span>Workloads Fleet</span>
                  </Link>
                </li>
                <li>
                  <Link href="/ghost" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                    <span>Ghost Resource Reaper</span>
                  </Link>
                </li>
                <li>
                  <Link href="/vault" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                    <span>Snapshot Vault</span>
                  </Link>
                </li>
                <li>
                  <Link href="/scheduler" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                    <span>Predictive Scheduler</span>
                  </Link>
                </li>
                <li>
                  <Link href="/policies" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                    <span>Policy Configuration</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: Evidence & Deep-Tech */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Evidence & Docs</div>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/pilot" className="text-emerald-400 font-semibold hover:underline flex items-center space-x-1">
                    <FlaskConical className="w-3 h-3" />
                    <span>Real Pilot Week 1</span>
                  </Link>
                </li>
                <li>
                  <Link href="/ml-insights" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                    <span>ML Model Insights</span>
                  </Link>
                </li>
                <li>
                  <Link href="/architecture" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                    <span>RISC-V SoC Architecture</span>
                  </Link>
                </li>
                <li>
                  <Link href="/roi" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                    <span>ROI Simulator</span>
                  </Link>
                </li>
                <li>
                  <Link href="/audit" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
                    <span>Autonomous Audit Ledger</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Community & Contact */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Connect & Links</div>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="https://github.com/vishnu1107-star/CLOUD-PULSE-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors flex items-center space-x-1"
                  >
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtu.be/YOUR_VIDEO_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-400 transition-colors flex items-center space-x-1"
                  >
                    <span>Demo Video</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:vishnupriya@cloudpulse.tech"
                    className="hover:text-emerald-400 transition-colors flex items-center space-x-1"
                  >
                    <span>vishnupriya@cloudpulse.tech</span>
                  </a>
                </li>
                <li>
                  <Link href="/esg" className="hover:text-emerald-400 transition-colors flex items-center space-x-1">
                    <Leaf className="w-3 h-3 text-emerald-400" />
                    <span>UN SDG 9, 12, 13 Report</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Tier: Copyright & Team Credits */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © 2026 CloudPulse • Developed by <strong className="text-slate-300">Team ARGUS Innovators</strong> for <strong className="text-purple-400">TECHNOVA 2026</strong> (AI Innovation Track).
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <span>FastAPI + Next.js 14</span>
            <span>•</span>
            <span>Isolation Forest ML</span>
            <span>•</span>
            <span>C-DAC VEGA RISC-V SoC</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">MIT License</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
