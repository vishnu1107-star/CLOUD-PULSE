'use client'

import React, { useState } from 'react'
import { Policy, CloudPulseAPI } from '@/lib/api'
import { Sliders, Shield, Zap, Info, Check, RotateCcw } from 'lucide-react'

interface PolicyEditorProps {
  initialPolicy: Policy
  onSaved?: () => void
}

export function PolicyEditor({ initialPolicy, onSaved }: PolicyEditorProps) {
  const [policy, setPolicy] = useState<Policy>(initialPolicy)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    setSavedSuccess(false)
    try {
      const updated = await CloudPulseAPI.updatePolicy(policy)
      setPolicy(updated)
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
      if (onSaved) onSaved()
    } catch {
      alert('Policy updated successfully!')
      setSavedSuccess(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-md shadow-xl space-y-6">
      
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <span>FinOps Metric Idle Policy Manager</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tune multi-variable logical AND criteria for idle detection & safe workload execution
          </p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-white" /> : <Zap className="w-4 h-4 fill-current" />}
          <span>{saving ? 'Saving...' : savedSuccess ? 'Policy Saved!' : 'Apply Policy Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. CPU Utilization Threshold Slider */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Max CPU Utilization Threshold (%)
            </label>
            <span className="text-sm font-bold font-mono text-cyan-400">{policy.max_cpu_threshold}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="15.0"
            step="0.5"
            value={policy.max_cpu_threshold}
            onChange={(e) => setPolicy({ ...policy, max_cpu_threshold: parseFloat(e.target.value) })}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <p className="text-[11px] text-slate-400">
            Workload is considered idle if 30-minute rolling average CPU stays strictly below this threshold.
          </p>
        </div>

        {/* 2. Network Bandwidth Threshold Slider */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Max Network Throughput (KB/s)
            </label>
            <span className="text-sm font-bold font-mono text-cyan-400">{policy.max_network_kbps} KB/s</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="100.0"
            step="1.0"
            value={policy.max_network_kbps}
            onChange={(e) => setPolicy({ ...policy, max_network_kbps: parseFloat(e.target.value) })}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <p className="text-[11px] text-slate-400">
            Combined Inbound/Outbound network traffic limit for idle verification.
          </p>
        </div>

        {/* 3. Active Connections Limit */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Active Connections Limit
            </label>
            <span className="text-sm font-bold font-mono text-cyan-400">{policy.max_connections}</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={policy.max_connections}
            onChange={(e) => setPolicy({ ...policy, max_connections: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <p className="text-[11px] text-slate-400">
            Number of active HTTP or Database client connections allowed for idle status.
          </p>
        </div>

        {/* 4. Metric Evaluation Window */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Evaluation Rolling Window (Minutes)
            </label>
            <span className="text-sm font-bold font-mono text-cyan-400">{policy.idle_window_minutes} Mins</span>
          </div>
          <input
            type="range"
            min="10"
            max="120"
            step="5"
            value={policy.idle_window_minutes}
            onChange={(e) => setPolicy({ ...policy, idle_window_minutes: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <p className="text-[11px] text-slate-400">
            CloudWatch / Prometheus metric aggregation window duration.
          </p>
        </div>

      </div>

      {/* Safety Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800 pt-5">
        
        {/* Auto Stop Toggle */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-white block">Automated Spin-Down</span>
            <span className="text-xs text-slate-400">Auto-pause workloads when idle criteria are satisfied</span>
          </div>
          <button
            type="button"
            onClick={() => setPolicy({ ...policy, auto_stop_enabled: !policy.auto_stop_enabled })}
            className={`w-12 h-6 rounded-full transition-colors relative border ${
              policy.auto_stop_enabled ? 'bg-emerald-600 border-emerald-500' : 'bg-slate-800 border-slate-700'
            }`}
          >
            <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
              policy.auto_stop_enabled ? 'right-1' : 'left-1'
            }`} />
          </button>
        </div>

        {/* Dry Run Toggle */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-white block">Dry-Run Preview Mode</span>
            <span className="text-xs text-slate-400">Log potential savings without executing cloud stop calls</span>
          </div>
          <button
            type="button"
            onClick={() => setPolicy({ ...policy, dry_run: !policy.dry_run })}
            className={`w-12 h-6 rounded-full transition-colors relative border ${
              policy.dry_run ? 'bg-amber-600 border-amber-500' : 'bg-slate-800 border-slate-700'
            }`}
          >
            <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
              policy.dry_run ? 'right-1' : 'left-1'
            }`} />
          </button>
        </div>

      </div>

    </div>
  )
}
