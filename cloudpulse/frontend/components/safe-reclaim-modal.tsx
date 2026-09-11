'use client'

import React, { useState } from 'react'
import { WorkloadItem } from '@/lib/demo-store'
import { 
  ShieldCheck, 
  Lock, 
  DollarSign, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  Server, 
  ArrowRight,
  RotateCcw
} from 'lucide-react'

interface SafeReclaimModalProps {
  workload: WorkloadItem | null
  isOpen: boolean
  onClose: () => void
  onConfirmReclaim: (workload: WorkloadItem) => void
}

export function SafeReclaimModal({ workload, isOpen, onClose, onConfirmReclaim }: SafeReclaimModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  if (!isOpen || !workload) return null

  const handleConfirm = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      onConfirmReclaim(workload)
      onClose()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-gray-900 space-y-5 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold text-gray-900">Safe Workload Reclamation</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Zero-Loss Safety
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Automated recovery snapshot prior to compute pause</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workload Specs Box */}
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Target Workload</span>
            <span className="font-mono text-sm font-bold text-gray-900">{workload.name}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-gray-200">
              <span className="text-[10px] text-gray-400 block">Idle Confidence</span>
              <span className="font-bold text-emerald-600 font-mono text-sm">{workload.idle_confidence}%</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-gray-200">
              <span className="text-[10px] text-gray-400 block">Estimated Savings</span>
              <span className="font-bold text-emerald-600 font-mono text-sm">${workload.potential_savings_day.toFixed(2)}/day</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-gray-200">
              <span className="text-[10px] text-gray-400 block">Environment</span>
              <span className="font-bold text-gray-800">{workload.environment}</span>
            </div>
          </div>
        </div>

        {/* Pre-Reclamation Safety Checklist */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
            Pre-Reclamation Safety Checks:
          </span>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Snapshot Vault:</span>
              </div>
              <span className="font-bold text-emerald-700">30-day point-in-time enabled</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold">Production Workload:</span>
              </div>
              <span className="font-bold text-blue-700">No (Non-Prod Staging)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-900">
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="font-semibold">Rollback Capability:</span>
              </div>
              <span className="font-bold text-indigo-700">1-Click Instant Available</span>
            </div>
          </div>
        </div>

        {/* Non-Destructive Trust Note */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-[11px] text-emerald-900 leading-relaxed font-medium">
          <strong>Trust Invariant:</strong> CloudPulse never blindly deletes infrastructure. The compute instance is safely paused ($0.00/hr compute), while root storage, IP allocations, and state are preserved in the 30-day snapshot vault.
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all hover:scale-105 active:scale-95"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isProcessing ? 'Vaulting & Reclaiming...' : 'Create Snapshot & Reclaim'}</span>
          </button>
        </div>

      </div>
    </div>
  )
}
