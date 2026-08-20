import React from 'react'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  colorScheme: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose'
  trend?: string
}

export function MetricCard({ title, value, subtitle, icon: Icon, colorScheme, trend }: MetricCardProps) {
  const colorStyles = {
    emerald: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/5',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/10'
    },
    cyan: {
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/5',
      iconBg: 'bg-cyan-500/20 text-cyan-400',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-500/10'
    },
    violet: {
      border: 'border-violet-500/30',
      bg: 'bg-violet-500/5',
      iconBg: 'bg-violet-500/20 text-violet-400',
      text: 'text-violet-400',
      glow: 'shadow-violet-500/10'
    },
    amber: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/5',
      iconBg: 'bg-amber-500/20 text-amber-400',
      text: 'text-amber-400',
      glow: 'shadow-amber-500/10'
    },
    rose: {
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/5',
      iconBg: 'bg-rose-500/20 text-rose-400',
      text: 'text-rose-400',
      glow: 'shadow-rose-500/10'
    }
  }[colorScheme]

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${colorStyles.border} ${colorStyles.bg} p-5 shadow-lg ${colorStyles.glow} backdrop-blur-md transition-all duration-300 hover:translate-y-[-2px]`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-extrabold text-white tracking-tight">{value}</h3>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${colorStyles.iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center text-xs font-medium text-slate-300 border-t border-slate-800/80 pt-2">
          <span className={colorStyles.text}>{trend}</span>
          <span className="ml-1.5 text-slate-400">vs last month</span>
        </div>
      )}
    </div>
  )
}
