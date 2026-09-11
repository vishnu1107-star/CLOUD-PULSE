'use client'

import React, { useState } from 'react'
import { 
  ShieldCheck, 
  Lock, 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Key, 
  Eye, 
  Check, 
  Sliders,
  Sparkles,
  RefreshCw
} from 'lucide-react'
import { useToast } from '@/components/toast'

export default function SecurityPage() {
  const [approvalMode, setApprovalMode] = useState<'AUTO' | 'REQUIRE_APPROVAL'>('AUTO')
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'FinOps' | 'DevOps' | 'Viewer'>('FinOps')
  const { showToast } = useToast()

  const handleApprovalModeToggle = (mode: 'AUTO' | 'REQUIRE_APPROVAL') => {
    setApprovalMode(mode)
    showToast({
      type: 'info',
      title: mode === 'AUTO' ? 'Autonomous Execution Active' : 'Approval Required Mode Active',
      description: mode === 'AUTO' 
        ? 'Engine will autonomously execute policy-compliant non-prod reclaims.' 
        : 'All reclamation actions now require human DevOps click approval.'
    })
  }

  const rbacRoles = [
    {
      name: 'Admin',
      desc: 'Full administrative governance, policy configuration, IAM credential binding, and global overrides.',
      permissions: ['Manage IAM Credentials', 'Configure FinOps Policies', 'Execute Autonomous Reclaims', 'Override Production Lock', 'Manage Users & SSO']
    },
    {
      name: 'FinOps Lead',
      desc: 'Financial oversight, ROI simulation, spend analysis, approval mode toggling, and ESG reporting.',
      permissions: ['View Financial Analytics', 'Approve Reclamation Requests', 'Export Audit Ledger & ESG', 'Simulate ROI & Budgets']
    },
    {
      name: 'DevOps / Platform',
      desc: 'Workload management, 1-click warm hydration, Slack ChatOps command execution, and snapshot recovery.',
      permissions: ['1-Click Warm Hydrate', 'Trigger Safe Reclaim', 'Restore from Snapshot Vault', 'Execute Slack ChatOps']
    },
    {
      name: 'Viewer',
      desc: 'Read-only visibility for executive stakeholders, finance teams, and sustainability officers.',
      permissions: ['View Dashboard & KPIs', 'Read-Only Inventory', 'Download PDF Reports', 'View Public Architecture']
    }
  ]

  return (
    <div className="space-y-8 text-gray-900">
      
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center space-x-2.5 mb-1">
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Enterprise Security &amp; Governance
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Least-privilege cloud IAM, production isolation safeguards, RBAC controls, and automated compliance.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Pillar 1 */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Least-Privilege Access</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            CloudPulse requests only the read-only CloudWatch/Prometheus metric permissions required to monitor telemetry and scoped Stop/StartInstance permissions on non-prod tags.
          </p>
          <div className="pt-2 border-t border-gray-100 flex items-center space-x-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Scoped IAM Role Architecture</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Production Protection</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Production workloads are strictly LOCKED by default. The engine enforces tag and namespace-based isolation guards that reject any automated power adjustment on critical systems.
          </p>
          <div className="pt-2 border-t border-gray-100 flex items-center space-x-1 text-[11px] font-semibold text-rose-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Locked by Default Invariant</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Snapshot Before Action</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every automated reclamation creates an instantaneous 30-day point-in-time recovery snapshot before issuing compute stop calls, preserving workload state for rapid rollback.
          </p>
          <div className="pt-2 border-t border-gray-100 flex items-center space-x-1 text-[11px] font-semibold text-indigo-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Reversible Snapshot Rollback</span>
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Full Auditability</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every action, evaluation score, and operator approval is recorded in an immutable, tamper-proof audit stream with timestamp, actor identity, dollar delta, and recovery snapshot ID.
          </p>
          <div className="pt-2 border-t border-gray-100 flex items-center space-x-1 text-[11px] font-semibold text-blue-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SOC 2 & ISO-27001 Ready</span>
          </div>
        </div>

      </div>

      {/* Execution Approval Mode Toggle Box */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Autonomous Execution Mode & Approval Gates</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Choose how CloudPulse executes cost reclamation across your non-production estate.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
            Current: {approvalMode === 'AUTO' ? 'Auto Execute' : 'Require Human Approval'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Mode 1: Auto Execute */}
          <button
            onClick={() => handleApprovalModeToggle('AUTO')}
            className={`p-5 rounded-2xl text-left border transition-all ${
              approvalMode === 'AUTO'
                ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-500/20 shadow-sm'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-900">Auto Execute (Closed Loop)</span>
              {approvalMode === 'AUTO' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              When 5D multi-signal criteria confirm genuine idle (&gt;95% confidence) on allowed staging/dev environments, the engine snapshots and pauses compute automatically.
            </p>
          </button>

          {/* Mode 2: Require Approval */}
          <button
            onClick={() => handleApprovalModeToggle('REQUIRE_APPROVAL')}
            className={`p-5 rounded-2xl text-left border transition-all ${
              approvalMode === 'REQUIRE_APPROVAL'
                ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-500/20 shadow-sm'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-900">Require DevOps Approval (Advisory Gate)</span>
              {approvalMode === 'REQUIRE_APPROVAL' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Engine identifies idle waste, prepares the 30-day snapshot, and sends an interactive Slack or Web UI approval request before executing any infrastructure change.
            </p>
          </button>

        </div>
      </div>

      {/* Role-Based Access Control (RBAC) */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Enterprise Role-Based Access Control (RBAC)</h3>
          </div>
          <span className="text-xs text-gray-500">4 Pre-Configured Enterprise Roles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {rbacRoles.map((role) => {
            const isSelected = selectedRole === role.name
            return (
              <div
                key={role.name}
                onClick={() => setSelectedRole(role.name as any)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-50/40 border-blue-600 shadow-sm ring-1 ring-blue-500/30'
                    : 'bg-gray-50/60 border-gray-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-gray-900">{role.name}</h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                    Role
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  {role.desc}
                </p>
                <div className="space-y-1.5 pt-2 border-t border-gray-200">
                  {role.permissions.map((p, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-[11px] text-gray-700 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
