'use client'

import React, { useState } from 'react'
import { Policy, CloudPulseAPI } from '@/lib/api'
import { defaultPolicyState, FinOpsPolicyState } from '@/lib/demo-store'
import { 
  Sliders, 
  Shield, 
  Zap, 
  Info, 
  Check, 
  RotateCcw, 
  Lock, 
  ShieldCheck, 
  Plus, 
  Trash2,
  AlertTriangle,
  Tag,
  CheckCircle2
} from 'lucide-react'
import { useToast } from '@/components/toast'

interface PolicyEditorProps {
  initialPolicy?: Policy
  onSaved?: () => void
}

export function PolicyEditor({ initialPolicy, onSaved }: PolicyEditorProps) {
  const [policyState, setPolicyState] = useState<FinOpsPolicyState>(defaultPolicyState)
  const [newTag, setNewTag] = useState('')
  const [newNamespace, setNewNamespace] = useState('')
  const [saving, setSaving] = useState(false)
  const { showToast } = useToast()

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      showToast({
        type: 'success',
        title: 'FinOps Safety Policy Saved',
        description: 'Production locked. Multi-signal confidence threshold enforced. Snapshot-before-action active.'
      })
      if (onSaved) onSaved()
    }, 600)
  }

  const addTag = () => {
    if (newTag.trim() && !policyState.protected_tags.includes(newTag.trim())) {
      setPolicyState({
        ...policyState,
        protected_tags: [...policyState.protected_tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const removeTag = (t: string) => {
    setPolicyState({
      ...policyState,
      protected_tags: policyState.protected_tags.filter(item => item !== t)
    })
  }

  const addNamespace = () => {
    if (newNamespace.trim() && !policyState.protected_namespaces.includes(newNamespace.trim())) {
      setPolicyState({
        ...policyState,
        protected_namespaces: [...policyState.protected_namespaces, newNamespace.trim()]
      })
      setNewNamespace('')
    }
  }

  const removeNamespace = (ns: string) => {
    setPolicyState({
      ...policyState,
      protected_namespaces: policyState.protected_namespaces.filter(item => item !== ns)
    })
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-8 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 shadow-sm">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">Enterprise Safety Controls &amp; Policies</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Multi-signal thresholds, production isolation guards, and snapshot requirements.
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>{saving ? 'Applying...' : 'Apply Policy Changes'}</span>
        </button>
      </div>

      {/* Production Protection Status Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-emerald-600 text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-emerald-950 block text-sm">Production Resources Protected by Default</strong>
            <span className="text-emerald-800">
              Zero automated power adjustments permitted on Production workloads.
            </span>
          </div>
        </div>
        <span className="font-mono text-emerald-800 bg-white px-3 py-1 rounded-xl border border-emerald-200 font-bold shadow-xs">
          LOCKED ✓
        </span>
      </div>

      {/* 1. Environment Protection Controls */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          1. Environment Protection Matrix
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          
          {/* Production (LOCKED) */}
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-rose-900 block">Production</span>
              <span className="text-[11px] text-rose-700">Strictly Protected</span>
            </div>
            <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-rose-200 text-rose-900 text-[10px] font-bold">
              <Lock className="w-3 h-3" />
              <span>LOCKED</span>
            </span>
          </div>

          {/* Staging */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-900 block">Staging</span>
              <span className="text-[11px] text-gray-500">Autonomous Reclaim</span>
            </div>
            <button
              onClick={() => setPolicyState({ ...policyState, staging_allowed: !policyState.staging_allowed })}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                policyState.staging_allowed ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {policyState.staging_allowed ? 'ALLOWED ✓' : 'PAUSED'}
            </button>
          </div>

          {/* Development */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-900 block">Development</span>
              <span className="text-[11px] text-gray-500">Autonomous Reclaim</span>
            </div>
            <button
              onClick={() => setPolicyState({ ...policyState, dev_allowed: !policyState.dev_allowed })}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                policyState.dev_allowed ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {policyState.dev_allowed ? 'ALLOWED ✓' : 'PAUSED'}
            </button>
          </div>

          {/* QA */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-900 block">QA / Testing</span>
              <span className="text-[11px] text-gray-500">Autonomous Reclaim</span>
            </div>
            <button
              onClick={() => setPolicyState({ ...policyState, qa_allowed: !policyState.qa_allowed })}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                policyState.qa_allowed ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {policyState.qa_allowed ? 'ALLOWED ✓' : 'PAUSED'}
            </button>
          </div>

        </div>
      </div>

      {/* 2. Reclamation Rules Configuration */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          2. Reclamation Rules &amp; Thresholds
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Minimum Idle Window */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
            <label className="text-xs font-bold text-gray-700 block">
              Minimum Idle Duration Window:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['30m', '1h', '4h'] as const).map((dur) => (
                <button
                  key={dur}
                  onClick={() => setPolicyState({ ...policyState, min_idle_time: dur })}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    policyState.min_idle_time === dur
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-500">
              Workload must remain continuously dormant for this duration.
            </p>
          </div>

          {/* Minimum Idle Confidence */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
            <label className="text-xs font-bold text-gray-700 block">
              Minimum ML Idle Confidence:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {([90, 95, 98] as const).map((conf) => (
                <button
                  key={conf}
                  onClick={() => setPolicyState({ ...policyState, min_idle_confidence: conf })}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    policyState.min_idle_confidence === conf
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {conf}%
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-500">
              Isolation Forest 5D anomaly confidence floor.
            </p>
          </div>

          {/* Snapshot Before Reclaim Toggle */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-900 block">Snapshot Before Action</span>
              <span className="text-[11px] text-gray-500">Take 30-day point-in-time state backup</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mandatory Enabled (ON)</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Protected Workloads Filter List */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            3. Protected Workload Namespaces &amp; Tags
          </h3>
          <span className="text-xs text-gray-500 font-medium">Immune from automated actions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Protected Tags Box */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <span className="text-xs font-bold text-gray-700 block">Protected Cloud Tags:</span>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="e.g. DoNotReclaim=True"
                className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={addTag}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {policyState.protected_tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs text-gray-800 font-mono shadow-xs"
                >
                  <Tag className="w-3 h-3 text-blue-600" />
                  <span>{t}</span>
                  <button onClick={() => removeTag(t)} className="text-gray-400 hover:text-red-600 ml-1">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Protected Kubernetes Namespaces */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <span className="text-xs font-bold text-gray-700 block">Protected Kubernetes Namespaces:</span>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newNamespace}
                onChange={(e) => setNewNamespace(e.target.value)}
                placeholder="e.g. payments-api"
                className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={addNamespace}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {policyState.protected_namespaces.map((ns) => (
                <span
                  key={ns}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs text-gray-800 font-mono shadow-xs"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{ns}</span>
                  <button onClick={() => removeNamespace(ns)} className="text-gray-400 hover:text-red-600 ml-1">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
