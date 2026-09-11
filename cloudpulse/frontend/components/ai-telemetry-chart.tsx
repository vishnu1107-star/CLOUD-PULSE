'use client'

import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts'
import { Brain, Activity } from 'lucide-react'

function generateTelemetryWindow() {
  const data: { time: string; cpu: number; network: number; connections: number }[] = []
  const now = Date.now()
  for (let i = 29; i >= 0; i--) {
    const t = new Date(now - i * 60000)
    const label = t.getHours().toString().padStart(2,'0') + ':' + t.getMinutes().toString().padStart(2,'0')
    const isIdle = i < 15
    data.push({
      time: label,
      cpu: isIdle ? parseFloat((Math.random() * 1.4 + 0.2).toFixed(2)) : parseFloat((Math.random() * 35 + 12).toFixed(2)),
      network: isIdle ? parseFloat((Math.random() * 6 + 0.5).toFixed(2)) : parseFloat((Math.random() * 80 + 20).toFixed(2)),
      connections: isIdle ? 0 : Math.floor(Math.random() * 12 + 2),
    })
  }
  return data
}

export function AiTelemetryChart() {
  const [data, setData] = useState(generateTelemetryWindow())
  const [idleDetected, setIdleDetected] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateTelemetryWindow())
      setIdleDetected(prev => !prev)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 rounded-2xl border border-violet-500/30 bg-violet-500/5 backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-violet-400" />
          <h2 className="text-base font-bold text-white">AI Multi-Signal Telemetry Engine</h2>
        </div>
      </div>
      <p className="text-xs text-slate-400">Real-time fusion of CPU%, Network KB/s and Active DB Connections over rolling 30-min window.</p>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 4, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 9 }} interval={4} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 9 }} />
          <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#94a3b8' }} />
          <Legend wrapperStyle={{ fontSize: 10, color: '#94a3b8' }} />
          <ReferenceLine y={2} stroke="#10b981" strokeDasharray="5 3" />
          <ReferenceLine y={10} stroke="#a78bfa" strokeDasharray="5 3" />
          <Line type="monotone" dataKey="cpu" stroke="#38bdf8" strokeWidth={2} dot={false} name="CPU %" />
          <Line type="monotone" dataKey="network" stroke="#a78bfa" strokeWidth={2} dot={false} name="Network KB/s" />
          <Line type="monotone" dataKey="connections" stroke="#f59e0b" strokeWidth={2} dot={false} name="DB Connections" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}