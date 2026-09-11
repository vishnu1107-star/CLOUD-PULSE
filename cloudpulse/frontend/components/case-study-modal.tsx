'use client'

import React, { useState } from 'react'
import { Award, CheckCircle2, TrendingDown, DollarSign, Leaf, Zap, ShieldCheck, X, FileText, ArrowUpRight } from 'lucide-react'

export function CaseStudyWidget() {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      {/* Dashboard Highlight Card */}
      <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Benchmark Validation
            </span>
            <span className="text-xs text-slate-400">7-Day Simulated Fleet Study</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Simulation Benchmark: 47.6% Cloud Spend Reduction on 12-Node Staging Fleet
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl">
            Repository benchmark conducted across modeled AWS us-east-1 EC2 instances and Kubernetes worker pools.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>View Benchmark Report</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Case Study Deep-Dive Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2.5 text-emerald-400">
                <Award className="w-6 h-6" />
                <div>
                  <h3 className="text-xl font-bold text-white">7-Day Simulated Fleet Benchmark Study</h3>
                  <p className="text-xs text-slate-400">Repository Simulation Data &amp; Telemetry Benchmarks</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Trial Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Total Spend Reclaimed</div>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">$49.34</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Across 7 simulation days</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Off-Hours Waste Cut</div>
                <div className="text-2xl font-black text-cyan-400 font-mono mt-1">47.6%</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Non-prod compute pause</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Mean Hydration Speed</div>
                <div className="text-2xl font-black text-indigo-400 font-mono mt-1">2.18s</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Repository benchmark</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Estimated CO₂e Abated</div>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">19.78 kg</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Scope 2 energy estimate</div>
              </div>
            </div>

            {/* Trial Methodology & Findings */}
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Simulation Setup &amp; Infrastructure Scope</span>
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  The benchmark simulation was modeled on a cluster of 12 AWS EC2 <code className="text-emerald-400">t3.xlarge</code> instances (4 vCPU, 16 GB RAM, $0.192/hr) utilized for staging APIs and QA testing. Workloads were managed under standard off-hours developer schedules (active Mon–Fri 9am–7pm; dormant nights and weekends).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-white text-xs block">Key Quantitative Findings:</span>
                  <ul className="space-y-1 text-slate-400">
                    <li>• Total Dormant Hours Identified: <strong>257 instance-hours</strong></li>
                    <li>• Average Time-to-Reactivation: <strong>2.18 seconds (benchmark)</strong></li>
                    <li>• Estimated Carbon Emissions Avoided: <strong>19.78 kg CO₂e</strong></li>
                    <li>• Orphan Ghost Volumes Purged: <strong>2 unattached disks (500 GB)</strong></li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-white text-xs block">Multi-Signal Session Safeguard:</span>
                  <p className="text-slate-400 leading-relaxed">
                    During active developer database migrations on Tuesday evening (CPU &lt; 1.5% but active PostgreSQL connection count &gt; 0), the multi-signal evaluator correctly rejected auto-pause, preserving active developer sessions.
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
              >
                Close Report
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
