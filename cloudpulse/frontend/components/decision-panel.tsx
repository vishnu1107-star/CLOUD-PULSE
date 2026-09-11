'use client'

import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { PipelineVisualizer, PipelineStageId } from '@/components/pipeline-visualizer'
import { WorkloadItem } from '@/lib/demo-store'

type DecisionData = {
  telemetry: {
    cpu: number
    network: number
    sockets: number
    iops: number
    memory: number
    timestamp: number
  }
  stages: {
    pre_filter: boolean | null
    isolation: boolean | null
    safety_gate: boolean | null
  }
  decision: string
  audit_log: Array<{ timestamp: number; decision: string }>
}

export function DecisionPanel({ workloads }: { workloads: WorkloadItem[] }) {
  const [decisions, setDecisions] = useState<Record<string, DecisionData>>({})
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const socket: Socket = io()
    socket.on('connect', () => {
      console.log('DecisionPanel socket connected')
    })
    socket.on('decision_update', (payload: { instance_id: string; data: DecisionData }) => {
      setDecisions(prev => ({
        ...prev,
        [payload.instance_id]: payload.data,
      }))
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  const renderRow = (w: WorkloadItem) => {
    const data = decisions[w.id] ?? null
    const completed: PipelineStageId[] = []
    let active: PipelineStageId = 'vega'
    if (data) {
      if (data.stages.pre_filter) completed.push('tinyml')
      if (data.stages.isolation) completed.push('isolation_forest')
      if (data.stages.safety_gate) completed.push('safety_gate')
      active = data.decision === 'RECLAIM' ? 'reclaim' : 'vault'
    }
    return (
      <div key={w.id} className="space-y-2 border-b border-gray-200 pb-4 last:border-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900">{w.name}</h4>
          <span className={`px-2 py-0.5 text-xs rounded ${w.isLiveHardware ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
            {w.isLiveHardware ? 'LIVE - VEGA Aries' : 'SIMULATED'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
          <div>CPU % {data?.telemetry.cpu.toFixed(1) ?? '--'}</div>
          <div>Net KB {data?.telemetry.network.toFixed(1) ?? '--'}</div>
          <div>Sockets {data?.telemetry.sockets ?? '--'}</div>
          <div>IOPS {data?.telemetry.iops ?? '--'}</div>
        </div>
        <PipelineVisualizer
          activeStage={active}
          completedStages={completed}
          isBlocked={data?.stages.safety_gate === false}
          blockReason={data?.stages.safety_gate === false ? 'Sockets > 0' : undefined}
        />
        {data?.audit_log?.length > 0 && (
          <div className="mt-2">
            <button
              className="text-xs text-indigo-600 hover:underline"
              onClick={() => setExpanded(prev => ({ ...prev, [w.id]: !prev[w.id] }))}
            >
              {expanded[w.id] ? 'Hide' : 'Show'} Audit Log ({data.audit_log.length})
            </button>
            {expanded[w.id] && (
              <ul className="mt-1 list-disc list-inside text-xs text-gray-500">
                {data.audit_log.map((log, idx) => (
                  <li key={idx}>
                    {new Date(log.timestamp * 1000).toLocaleTimeString()}: {log.decision}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <section className="rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200 p-4 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Live Decision Console</h3>
      {workloads.map(renderRow)}
    </section>
  )
}
