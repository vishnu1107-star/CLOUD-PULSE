'use client'

import React, { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'

export function LiveSavingsCounter() {
  const [savings, setSavings] = useState(47823.50)
  const [carbon, setCarbon] = useState(1842.3)
  const [hours, setHours] = useState(9211)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setSavings(s => parseFloat((s + (Math.random() * 0.08 + 0.02)).toFixed(2)))
      setCarbon(c => parseFloat((c + (Math.random() * 0.004 + 0.001)).toFixed(3)))
      setHours(h => Math.random() > 0.95 ? h + 1 : h)
      setPulse(p => !p)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-4 h-4 text-emerald-600" />
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Live Cost Reclamation Meter</span>
        <span className={"w-2 h-2 rounded-full " + (pulse ? "bg-emerald-500" : "bg-emerald-300") + " transition-colors duration-700"} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500 font-medium">Dollars Reclaimed</p>
          <p className="text-2xl font-extrabold text-gray-900 tabular-nums mt-0.5">{'$' + savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-emerald-700 font-semibold mt-0.5">ticking live</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">CO₂ Offset (kg)</p>
          <p className="text-2xl font-extrabold text-blue-700 tabular-nums mt-0.5">{carbon.toFixed(1) + ' kg'}</p>
          <p className="text-xs text-blue-600 font-medium mt-0.5">continuously</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Idle Hours Saved</p>
          <p className="text-2xl font-extrabold text-indigo-700 tabular-nums mt-0.5">{hours.toLocaleString()}</p>
          <p className="text-xs text-indigo-600 font-medium mt-0.5">across all workloads</p>
        </div>
      </div>
    </div>
  )
}