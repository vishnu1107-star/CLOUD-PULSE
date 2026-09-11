import React from 'react'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  subtitle?: string
  icon: LucideIcon
  color?: 'emerald' | 'cyan' | 'blue' | 'violet' | 'amber' | 'rose'
  colorScheme?: 'emerald' | 'cyan' | 'blue' | 'violet' | 'amber' | 'rose'
  trend?: string
}

export function MetricCard({ title, value, change, subtitle, icon: Icon, color, colorScheme, trend }: MetricCardProps) {
  const scheme = color || colorScheme || 'blue'

  const colorStyles = {
    emerald: {
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-600',
      text: 'text-emerald-700',
    },
    cyan: {
      border: 'border-blue-200',
      iconBg: 'bg-blue-50 text-blue-600',
      text: 'text-blue-700',
    },
    blue: {
      border: 'border-blue-200',
      iconBg: 'bg-blue-50 text-blue-600',
      text: 'text-blue-700',
    },
    violet: {
      border: 'border-indigo-200',
      iconBg: 'bg-indigo-50 text-indigo-600',
      text: 'text-indigo-700',
    },
    amber: {
      border: 'border-amber-200',
      iconBg: 'bg-amber-50 text-amber-600',
      text: 'text-amber-700',
    },
    rose: {
      border: 'border-rose-200',
      iconBg: 'bg-rose-50 text-rose-600',
      text: 'text-rose-700',
    }
  }[scheme] || {
    border: 'border-gray-200',
    iconBg: 'bg-gray-100 text-gray-700',
    text: 'text-gray-900',
  }

  const sub = change || subtitle

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${colorStyles.border} bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
          {sub && <p className={`mt-1 text-xs font-semibold ${colorStyles.text}`}>{sub}</p>}
        </div>
        <div className={`p-3 rounded-xl ${colorStyles.iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center text-xs font-medium text-gray-600 border-t border-gray-100 pt-2">
          <span className={colorStyles.text}>{trend}</span>
          <span className="ml-1.5 text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  )
}
