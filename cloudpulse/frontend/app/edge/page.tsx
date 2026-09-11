'use client'

import React, { useState, useEffect } from 'react'
import { 
  Cpu, 
  Activity, 
  Brain, 
  ShieldCheck, 
  Lock, 
  PauseCircle, 
  RotateCcw, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Server, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Terminal,
  Play,
  Layers,
  Clock,
  ArrowRight,
  Database
} from 'lucide-react'
import { CloudPulseAPI } from '@/lib/api'
import { useToast } from '@/components/toast'
import { PipelineVisualizer, PipelineStageId } from '@/components/pipeline-visualizer'

export default function EdgeControllerPage() {
  const { showToast } = useToast()

  // Edge state
  const [edgeStatus, setEdgeStatus] = useState<any>({
    connected: true,
    mode: 'SIMULATION',
    offline: false,
    device_id: 'vega-aries-v3',
    architecture: 'C-DAC THEJAS32 SoC (VEGA ET1031 RISC-V @ 100MHz)',
    frame_size_bytes: 16,
    telemetry_count: 142,
    status_label: 'SIMULATION MODE'
  })

  // Current live telemetry
  const [telemetry, setTelemetry] = useState({
    device_id: 'vega-01',
    cpu: 1.4,
    network: 2.1,
    sockets: 0,
    iops: 1,
    memory: 18,
    process_activity: 0
  })

  // Inference & Safety evaluations
  const [analysis, setAnalysis] = useState<any>({
    decision: 'IDLE_CANDIDATE',
    confidence: 0.94,
    safety_status: 'PASS',
    recommended_action: 'RECLAIM',
    tinyml: {
      inference_type: 'SIMULATED EDGE INFERENCE',
      decision: 'IDLE CANDIDATE',
      confidence: 0.94,
      execution_cycles: 1420
    },
    isolation_forest: {
      classification: 'TRUE_IDLE',
      anomaly_score: -0.42,
      confidence: 0.96
    },
    safety_gate: {
      status: 'PASSED',
      passed: true,
      recommended_action: 'SAFE TO RECLAIM',
      primary_reason: 'All 6 telemetry safety signals verified zero-traffic idle state.',
      checks: {
        cpu: { name: 'CPU Utilization Low', value: '1.4%', threshold: '< 2.5%', passed: true },
        network: { name: 'Network Throughput Low', value: '2.1 KB/s', threshold: '< 10.0 KB/s', passed: true },
        sockets: { name: 'Sockets Inactive (Zero Active Sockets)', value: '0 sockets', threshold: '== 0', passed: true },
        iops: { name: 'Disk IOPS Low', value: '1 IOPS', threshold: '<= 5', passed: true },
        processes: { name: 'Process Activity Low', value: '0 procs', threshold: '<= 2', passed: true },
        ml_anomaly: { name: 'Isolation Forest ML Confirmation', value: 'TRUE_IDLE', threshold: 'TRUE_IDLE', passed: true }
      }
    }
  })

  const [activeScenario, setActiveScenario] = useState<'true_idle' | 'active' | 'false_idle'>('true_idle')
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [events, setEvents] = useState<any[]>([])

  // Pipeline stage tracking
  const [activePipelineStage, setActivePipelineStage] = useState<PipelineStageId>('safety_gate')
  const [completedStages, setCompletedStages] = useState<PipelineStageId[]>(['vega', 'telemetry', 'tinyml', 'isolation_forest', 'safety_gate'])

  const fetchStatusAndEvents = async () => {
    try {
      const statusRes = await CloudPulseAPI.getEdgeStatus()
      setEdgeStatus(statusRes)
      const evts = await CloudPulseAPI.getEvents(12)
      setEvents(evts)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchStatusAndEvents()
    const id = setInterval(fetchStatusAndEvents, 5000)
    return () => clearInterval(id)
  }, [])

  const handleSimulateScenario = async (sc: 'active' | 'true_idle' | 'false_idle') => {
    setActiveScenario(sc)
    setLoadingAction(sc)
    try {
      const res = await CloudPulseAPI.simulateEdgeScenario(sc)
      setAnalysis(res)
      
      // Update telemetry gauges
      if (sc === 'active') {
        setTelemetry({ device_id: 'vega-active', cpu: 65.2, network: 840.0, sockets: 24, iops: 72, memory: 74, process_activity: 8 })
        setActivePipelineStage('isolation_forest')
        setCompletedStages(['vega', 'telemetry'])
      } else if (sc === 'true_idle') {
        setTelemetry({ device_id: 'vega-idle', cpu: 1.4, network: 2.1, sockets: 0, iops: 1, memory: 18, process_activity: 0 })
        setActivePipelineStage('safety_gate')
        setCompletedStages(['vega', 'telemetry', 'tinyml', 'isolation_forest', 'safety_gate'])
      } else if (sc === 'false_idle') {
        setTelemetry({ device_id: 'vega-safety-test', cpu: 2.0, network: 2.5, sockets: 3, iops: 2, memory: 35, process_activity: 1 })
        setActivePipelineStage('safety_gate')
        setCompletedStages(['vega', 'telemetry', 'tinyml'])
      }

      showToast({
        type: res.safety_gate?.passed ? 'success' : 'info',
        title: `Telemetry Evaluated: ${sc.replace('_', ' ').toUpperCase()}`,
        description: res.reason
      })
      await fetchStatusAndEvents()
    } catch (e: any) {
      showToast({
        type: 'error',
        title: 'Simulation Failed',
        description: e.message
      })
    } finally {
      setLoadingAction(null)
    }
  }

  const handleToggleOffline = async () => {
    const nextOffline = !edgeStatus.offline
    setLoadingAction('offline_toggle')
    try {
      const res = await CloudPulseAPI.setEdgeMode(undefined, nextOffline)
      setEdgeStatus(res)
      showToast({
        type: nextOffline ? 'warning' : 'success',
        title: nextOffline ? 'Edge Offline Mode Activated' : 'Cloud Connection Restored',
        description: nextOffline ? 'Cloud connection unavailable — edge inference continues locally.' : 'Reconnected to CloudPulse API.'
      })
      await fetchStatusAndEvents()
    } catch (e: any) {
      showToast({ type: 'error', title: 'Mode switch failed', description: e.message })
    } finally {
      setLoadingAction(null)
    }
  }

  const handleToggleMode = async () => {
    const nextMode = edgeStatus.mode === 'SIMULATION' ? 'REAL_VEGA' : 'SIMULATION'
    setLoadingAction('mode_toggle')
    try {
      const res = await CloudPulseAPI.setEdgeMode(nextMode, undefined)
      setEdgeStatus(res)
      showToast({
        type: 'info',
        title: `Active Mode: ${nextMode}`,
        description: nextMode === 'REAL_VEGA' ? 'Waiting for VEGA Aries UART0 / USB frames.' : 'Operating on deterministic simulated telemetry stream.'
      })
      await fetchStatusAndEvents()
    } catch (e: any) {
      showToast({ type: 'error', title: 'Mode switch failed', description: e.message })
    } finally {
      setLoadingAction(null)
    }
  }

  const isSafetyPassed = analysis.safety_gate?.passed
  const isSafetyBlocked = !isSafetyPassed

  return (
    <div className="space-y-8 text-gray-900">
      
      {/* Top Breadcrumb & Live Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs text-blue-600 font-bold mb-1">
            <span>CLOUDPULSE HARDWARE INTEGRATION</span>
            <span>•</span>
            <span>C-DAC VEGA ARIES RISC-V</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">
            CLOUDPULSE EDGE CONTROLLER
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time telemetry ingestion, TinyML edge pre-filtering, and multi-signal safety gate.
          </p>
        </div>

        {/* VEGA Status Pill & Mode Switchers */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Connection Pill */}
          <div className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold ${
            edgeStatus.offline 
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : edgeStatus.mode === 'REAL_VEGA'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              edgeStatus.offline 
                ? 'bg-amber-500 animate-pulse' 
                : edgeStatus.mode === 'REAL_VEGA'
                ? 'bg-emerald-500 animate-ping'
                : 'bg-blue-500'
            }`} />
            <span>
              VEGA ARIES: {edgeStatus.offline ? 'OFFLINE' : (edgeStatus.mode === 'REAL_VEGA' ? 'CONNECTED' : 'SIMULATION MODE')}
            </span>
          </div>

          {/* Real vs Sim Mode Button */}
          <button
            onClick={handleToggleMode}
            disabled={loadingAction !== null}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
          >
            Switch to {edgeStatus.mode === 'SIMULATION' ? 'Real VEGA Mode' : 'Simulation Mode'}
          </button>

          {/* Offline Toggle Button */}
          <button
            onClick={handleToggleOffline}
            disabled={loadingAction !== null}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors flex items-center space-x-1 ${
              edgeStatus.offline
                ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {edgeStatus.offline ? <WifiOff className="w-3.5 h-3.5 mr-1 text-amber-600" /> : <Wifi className="w-3.5 h-3.5 mr-1 text-gray-500" />}
            <span>{edgeStatus.offline ? 'Edge Offline Active' : 'Simulate Offline'}</span>
          </button>
        </div>
      </div>

      {/* Offline Mode Banner when active */}
      {edgeStatus.offline && (
        <div className="flex items-center space-x-3 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 animate-in fade-in">
          <WifiOff className="w-5 h-5 text-amber-600 shrink-0" />
          <div className="text-xs">
            <span className="font-bold">EDGE OFFLINE MODE ACTIVE: </span>
            <span>Cloud connection unavailable — edge inference continues locally. Safety interlock holds all resources in current state.</span>
          </div>
        </div>
      )}

      {/* Live Pipeline Visualizer Component */}
      <PipelineVisualizer
        activeStage={activePipelineStage}
        completedStages={completedStages}
        isBlocked={isSafetyBlocked}
        blockReason={analysis.safety_gate?.primary_reason}
        activeScenario={activeScenario.replace('_', ' ').toUpperCase()}
      />

      {/* Scenario Selector Controls (Prompt #6) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
              Telemetry Scenario Selector (Judge Test Scenarios)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-gray-500">
            Source: C-DAC THEJAS32 RISC-V Telemetry Stream
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Scenario A: Active Resource */}
          <button
            onClick={() => handleSimulateScenario('active')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeScenario === 'active'
                ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                : 'bg-gray-50/50 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-gray-900">A. ACTIVE RESOURCE</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                KEEP RUNNING
              </span>
            </div>
            <div className="text-xs text-gray-600 font-mono space-y-0.5">
              <div>CPU: 65.2% • Network: High</div>
              <div>Sockets: 24 active • IOPS: 72</div>
            </div>
            <div className="text-[10px] text-gray-500 mt-2 font-medium">
              Action: Workload busy. Decision: ACTIVE.
            </div>
          </button>

          {/* Scenario B: True Idle Resource */}
          <button
            onClick={() => handleSimulateScenario('true_idle')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeScenario === 'true_idle'
                ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                : 'bg-gray-50/50 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-gray-900">B. TRUE IDLE RESOURCE</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                SAFE TO RECLAIM
              </span>
            </div>
            <div className="text-xs text-gray-600 font-mono space-y-0.5">
              <div>CPU: 1.4% • Network: 2.1 KB/s</div>
              <div>Sockets: 0 • IOPS: 1</div>
            </div>
            <div className="text-[10px] text-gray-500 mt-2 font-medium">
              Action: Zero activity. Passes Safety Gate.
            </div>
          </button>

          {/* Scenario C: False Idle / Safety Test */}
          <button
            onClick={() => handleSimulateScenario('false_idle')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeScenario === 'false_idle'
                ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                : 'bg-gray-50/50 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-gray-900">C. FALSE IDLE / SAFETY TEST</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                SAFETY BLOCKED
              </span>
            </div>
            <div className="text-xs text-gray-600 font-mono space-y-0.5">
              <div>CPU: 2.0% (Low!) • Network: 2.5 KB/s</div>
              <div>Sockets: 3 active! • IOPS: 2</div>
            </div>
            <div className="text-[10px] text-amber-800 mt-2 font-semibold">
              Crucial: Demonstrates CPU &lt; threshold does NOT trigger reclaim.
            </div>
          </button>
        </div>
      </div>

      {/* Main 3-Column Technical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 1. Live Telemetry Panel */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-gray-900 uppercase">Live Edge Telemetry</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
              16B Packed
            </span>
          </div>

          {/* Telemetry Metric Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="text-[10px] text-gray-500 font-bold uppercase">CPU Usage</div>
              <div className="text-xl font-black text-gray-900 mt-1">{telemetry.cpu.toFixed(1)}%</div>
              <div className="text-[9px] text-gray-400 font-mono">Threshold: &lt; 2.5%</div>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="text-[10px] text-gray-500 font-bold uppercase">Network</div>
              <div className="text-xl font-black text-gray-900 mt-1">{telemetry.network.toFixed(1)} KB/s</div>
              <div className="text-[9px] text-gray-400 font-mono">Threshold: &lt; 10 KB/s</div>
            </div>

            <div className={`p-3 rounded-2xl border ${telemetry.sockets > 0 ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'}`}>
              <div className="text-[10px] text-gray-500 font-bold uppercase">Active Sockets</div>
              <div className={`text-xl font-black mt-1 ${telemetry.sockets > 0 ? 'text-amber-700' : 'text-gray-900'}`}>
                {telemetry.sockets}
              </div>
              <div className="text-[9px] text-gray-400 font-mono">Guard: Must be 0</div>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="text-[10px] text-gray-500 font-bold uppercase">Disk IOPS</div>
              <div className="text-xl font-black text-gray-900 mt-1">{telemetry.iops}</div>
              <div className="text-[9px] text-gray-400 font-mono">Threshold: &lt;= 5</div>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="text-[10px] text-gray-500 font-bold uppercase">Memory</div>
              <div className="text-xl font-black text-gray-900 mt-1">{telemetry.memory}%</div>
              <div className="text-[9px] text-gray-400 font-mono">RAM Utilization</div>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="text-[10px] text-gray-500 font-bold uppercase">Processes</div>
              <div className="text-xl font-black text-gray-900 mt-1">{telemetry.process_activity}</div>
              <div className="text-[9px] text-gray-400 font-mono">Background procs</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 space-y-1">
            <div className="font-bold flex items-center space-x-1.5">
              <span>Hardware Layer:</span>
              <span className="font-mono text-[11px] text-blue-700">{edgeStatus.architecture}</span>
            </div>
            <div className="text-[10px] text-blue-800/80">
              Telemetry frame dispatched via UART0 serial protocol at 115200 bps.
            </div>
          </div>
        </div>

        {/* 2. TinyML & Isolation Forest Panel */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-gray-900 uppercase">Edge Inference &amp; ML</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold">
              {analysis.tinyml?.inference_type}
            </span>
          </div>

          {/* TinyML Card */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">TinyML Edge Pre-Filter</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                ● ANALYZING
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <div className="text-[10px] text-slate-400">Decision</div>
                <div className="text-base font-extrabold text-emerald-300">{analysis.tinyml?.decision}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Confidence</div>
                <div className="text-base font-mono font-bold text-white">{(analysis.tinyml?.confidence * 100).toFixed(0)}%</div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
              <span>Latency: 14.2 µs (1420 cycles)</span>
              <span>Memory: 16 bytes</span>
            </div>
          </div>

          {/* Isolation Forest Card */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <Brain className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-gray-900 uppercase">Isolation Forest (Anomaly ML)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                n=100 Trees
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <div className="text-[10px] text-gray-500">Classification</div>
                <div className="text-base font-extrabold text-gray-900">{analysis.isolation_forest?.classification}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-500">Anomaly Score</div>
                <div className="text-base font-mono font-bold text-indigo-700">{analysis.isolation_forest?.anomaly_score}</div>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed border-t border-gray-200 pt-2">
              Fuses historical 30-minute time-series windows to prevent false reclamation of quiet workloads.
            </p>
          </div>
        </div>

        {/* 3. Safety Gate Verification Panel */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-gray-900 uppercase">Safety Gate Authorization</h3>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              isSafetyPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
            }`}>
              {analysis.safety_gate?.status || 'VERIFYING'}
            </span>
          </div>

          {/* Check Breakdown Checklist */}
          <div className="space-y-2 text-xs">
            {Object.entries(analysis.safety_gate?.checks || {}).map(([key, check]: [string, any]) => (
              <div key={key} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center space-x-2">
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span className={check.passed ? 'text-gray-700' : 'text-red-700 font-semibold'}>{check.name}</span>
                </div>
                <span className="font-mono text-[10px] text-gray-500">{check.value}</span>
              </div>
            ))}
          </div>

          {/* Final Action Recommendation Box */}
          <div className={`p-4 rounded-2xl border ${
            isSafetyPassed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase">Final Safety Decision</span>
              <span className="text-xs font-black font-mono">{analysis.recommended_action}</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">
              {analysis.safety_gate?.primary_reason}
            </p>
          </div>
        </div>

      </div>

      {/* Real-time Edge Event Stream */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Edge Controller Audit Log &amp; Event Ledger
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Real-Time Tamper-Evident Stream
          </span>
        </div>

        <div className="max-h-48 overflow-y-auto space-y-1.5 font-mono text-[11px] pr-2">
          {events.map((evt, i) => (
            <div key={evt.id || i} className="flex items-start space-x-3 py-1 border-b border-slate-900">
              <span className="text-slate-500 shrink-0">{evt.timestamp}</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0 ${
                evt.stage === 'SAFETY_GATE' ? 'bg-amber-500/20 text-amber-300' :
                evt.stage === 'RECLAIM' ? 'bg-red-500/20 text-red-300' :
                evt.stage === 'VAULT' ? 'bg-indigo-500/20 text-indigo-300' :
                evt.stage === 'HYDRATION' ? 'bg-emerald-500/20 text-emerald-300' :
                'bg-blue-500/20 text-blue-300'
              }`}>
                {evt.stage}
              </span>
              <span className="text-slate-300">{evt.message}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
