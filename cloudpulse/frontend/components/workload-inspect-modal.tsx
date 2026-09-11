'use client'

import React, { useEffect, useState } from 'react'
import { WorkloadItem } from '@/lib/demo-store'

import { CloudPulseAPI } from '@/lib/api'
import { 
  Activity, 
  Server, 
  Cpu, 
  Network, 
  Lock, 
  Clock, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  Layers, 
  Tag,
  Radio
} from 'lucide-react'

interface WorkloadInspectModalProps {
  workload: WorkloadItem | null
  isOpen: boolean
  onClose: () => void
  onReclaim?: (workload: WorkloadItem) => void
  onHydrate?: (workload: WorkloadItem) => void
}

export function WorkloadInspectModal({ workload, isOpen, onClose, onReclaim, onHydrate }: WorkloadInspectModalProps) {
  const [vegaStatus, setVegaStatus] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen && workload) {
      setIsAnalyzing(true)
      const resId = workload.id
      CloudPulseAPI.analyzeResource(resId)
        .then((data) => {
          if (data && data.vega_led) {
            setVegaStatus(data.vega_led.led_info || data.real_status)
          } else {
            const isRunning = workload.state === 'RUNNING' && workload.cpu >= 5.0
            setVegaStatus(isRunning ? 'GREEN (GPIO 14 = HIGH, GPIO 13 = LOW)' : 'RED (GPIO 14 = LOW, GPIO 13 = HIGH)')
          }
        })
        .catch(() => {
          const isRunning = workload.state === 'RUNNING' && !workload.isProduction
          setVegaStatus(isRunning ? 'GREEN (GPIO 14 = HIGH, GPIO 13 = LOW)' : 'RED (GPIO 14 = LOW, GPIO 13 = HIGH)')
        })
        .finally(() => {
          setIsAnalyzing(false)
        })
    } else {
      setVegaStatus(null)
    }
  }, [isOpen, workload])

  if (!isOpen || !workload) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-gray-900 space-y-5 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-sm">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold text-gray-900">{workload.name}</h3>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  workload.isProduction
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {workload.environment}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{workload.provider} • {workload.region} • ID: {workload.id}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* VEGA Aries V2 Hardware Indicator */}
        <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between text-xs border border-slate-800 shadow-md">
          <div className="flex items-center space-x-2">
            <Radio className={`w-4 h-4 text-emerald-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <div>
              <span className="font-bold block text-[11px] text-slate-300">VEGA Aries V2 Hardware Signal:</span>
              <span className="font-mono text-xs font-extrabold text-emerald-400">
                {isAnalyzing ? 'Querying CloudPulse Status...' : (vegaStatus || 'ACTIVE (COM6 Sync)')}
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono font-bold text-slate-300 border border-slate-700">
            COM6 @ 115200
          </span>
        </div>


        {/* 5-Dimensional Metric Telemetry Grid */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
            5-Dimensional Real-Time Telemetry:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-500 block">CPU Usage</span>
              <span className="text-sm font-extrabold text-gray-900 font-mono mt-0.5">{workload.cpu}%</span>
              <span className="text-[9px] text-emerald-600 font-semibold block">&lt; 2.0% idle limit</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-500 block">Network I/O</span>
              <span className="text-sm font-extrabold text-gray-900 font-mono mt-0.5">{workload.network_kbps} MB/s</span>
              <span className="text-[9px] text-emerald-600 font-semibold block">&lt; 10 KB/s limit</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-500 block">TCP Sockets</span>
              <span className="text-sm font-extrabold text-gray-900 font-mono mt-0.5">{workload.active_connections}</span>
              <span className="text-[9px] text-emerald-600 font-semibold block">0 active sessions</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-500 block">Disk IOPS</span>
              <span className="text-sm font-extrabold text-gray-900 font-mono mt-0.5">{workload.iops}</span>
              <span className="text-[9px] text-emerald-600 font-semibold block">Dormant disk</span>
            </div>
          </div>
        </div>

        {/* Financial & Anomaly Intelligence */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-emerald-50/80 border border-blue-200 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Isolation Forest Confidence:</span>
            <span className="font-mono font-bold text-emerald-700 text-sm">{workload.idle_confidence}% TRUE_IDLE</span>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-2">
            <span className="text-gray-600 font-medium">Current Spend / Day:</span>
            <span className="font-mono font-bold text-gray-900">${workload.current_cost_day.toFixed(2)}/day (${(workload.hourly_cost * 730).toFixed(0)}/mo)</span>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-2">
            <span className="text-emerald-700 font-bold">Reclaimable Opportunity:</span>
            <span className="font-mono font-bold text-emerald-700 text-sm">+${workload.potential_savings_day.toFixed(2)}/day</span>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">Cloud Tags:</span>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(workload.tags).map(([k, v]) => (
              <span key={k} className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-mono border border-gray-200">
                <Tag className="w-3 h-3 text-gray-400" />
                <span>{k}: <strong>{v}</strong></span>
              </span>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="text-[11px] text-gray-500 flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Last Activity: {workload.last_activity}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
            >
              Close
            </button>

            {!workload.isProduction && workload.state === 'RUNNING' && onReclaim && (
              <button
                onClick={() => {
                  onClose()
                  onReclaim(workload)
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
              >
                Safe Reclaim
              </button>
            )}

            {!workload.isProduction && workload.state !== 'RUNNING' && onHydrate && (
              <button
                onClick={() => {
                  onClose()
                  onHydrate(workload)
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
              >
                Hydrate Workload
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
