'use client'

import React from 'react'
import Link from 'next/link'
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  Zap,
  Activity,
  TrendingUp,
  ExternalLink,
  BarChart2,
  ShieldCheck,
  BookOpen,
} from 'lucide-react'

const pilotEvents = [
  { ts: '2026-08-16 00:00 IST', eval: 'TRUE_IDLE', score: '-0.38', action: 'AUTONOMOUS_PAUSE', note: 'Post-midnight, zero activity' },
  { ts: '2026-08-16 08:30 IST', eval: 'ACTIVE_QUIET', score: '+0.12', action: 'PRE_HYDRATION', note: 'Diurnal forecaster triggered warm-start ✅' },
  { ts: '2026-08-16 13:00 IST', eval: 'ACTIVE_QUIET', score: '-0.09', action: 'SUPPRESS', note: 'Lunch break; SSH socket open — socket guard blocked mis-pause ✅' },
  { ts: '2026-08-16 18:30 IST', eval: 'TRUE_IDLE', score: '-0.44', action: 'AUTONOMOUS_PAUSE', note: 'EOD pause' },
  { ts: '2026-08-17 08:30 IST', eval: 'ACTIVE_QUIET', score: '+0.08', action: 'PRE_HYDRATION', note: 'Forecaster triggered ✅' },
  { ts: '2026-08-18 09:02 IST', eval: 'ACTIVE', score: '—', action: 'WARM_HYDRATION', note: 'Dashboard re-activation — Latency: 2.1s ✅' },
  { ts: '2026-08-19 10:00 IST', eval: 'ACTIVE', score: '—', action: 'SLACK_WAKEUP', note: '/cloudpulse wakeup — Latency: 2.4s ✅' },
  { ts: '2026-08-20 08:58 IST', eval: 'ACTIVE', score: '—', action: 'WARM_HYDRATION', note: 'Dashboard re-activation — Latency: 2.7s ✅' },
  { ts: '2026-08-21 10:00 IST', eval: 'FALSE_NEG', score: '-0.11', action: 'MISS', note: 'Spotify streaming → HTTP sockets open; correctly suppressed but missed idle' },
  { ts: '2026-08-21 14:00 IST', eval: 'TRUE_IDLE', score: '-0.38', action: 'AUTONOMOUS_PAUSE', note: 'Correctly detected after Spotify session closed' },
  { ts: '2026-08-22 08:30 IST', eval: 'ACTIVE_QUIET', score: '+0.11', action: 'PRE_HYDRATION', note: 'Final day — forecaster triggered ✅' },
  { ts: '2026-08-22 18:00 IST', eval: 'TRUE_IDLE', score: '-0.43', action: 'AUTONOMOUS_PAUSE', note: 'Pilot ended' },
]

const actionColors: Record<string, string> = {
  AUTONOMOUS_PAUSE: 'text-cyan-400',
  PRE_HYDRATION: 'text-emerald-400',
  SUPPRESS: 'text-amber-400',
  WARM_HYDRATION: 'text-violet-400',
  SLACK_WAKEUP: 'text-violet-400',
  MISS: 'text-red-400',
  FALSE_NEG: 'text-red-400',
}

export default function PilotResultsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="border-b border-slate-800/80 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5 mb-1">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <FlaskConical className="w-5 h-5 text-emerald-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Real Pilot — Week 1 Results
              </h1>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              AWS Free-Tier Deployment &bull; 1× t2.micro &bull; Aug 16–22, 2026 &bull; 168 hourly evaluations
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Small-Scale — Not Fleet-Representative</span>
            </span>
            <a
              href="https://github.com/vishnu1107-star/CLOUD-PULSE-2/blob/main/docs/pilot_results/week1_raw_log.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>View Raw Log on GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-500/8 border border-amber-500/25 text-amber-200 text-xs leading-relaxed">
        <strong className="text-amber-300">⚠️ Scale Disclaimer:</strong> This pilot ran on a single AWS t2.micro instance for 7 days. Results are
        directional evidence that CloudPulse operates correctly on real infrastructure. The 96.4% accuracy figure is from
        168 evaluations — not statistically significant at fleet scale. Fleet-scale metrics are tagged <code className="font-mono bg-amber-500/10 px-1 rounded">[Benchmarked]</code> (simulation)
        or <code className="font-mono bg-amber-500/10 px-1 rounded">[Design Target]</code>. See <Link href="https://github.com/vishnu1107-star/CLOUD-PULSE-2/blob/main/VALIDATION.md" className="underline" target="_blank">VALIDATION.md</Link> for full methodology.
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Detection Accuracy', value: '96.4%', sub: '164 / 168 evaluations', icon: BarChart2, color: 'emerald' },
          { label: 'False Outages', value: '0', sub: 'Zero unintended pauses', icon: ShieldCheck, color: 'cyan' },
          { label: 'Idle Hours Reclaimed', value: '47 hrs', sub: 'Out of 168 total hours', icon: Clock, color: 'violet' },
          { label: 'Re-activation Latency', value: '≤ 2.7s', sub: '3 tests: 2.1s, 2.4s, 2.7s', icon: Zap, color: 'amber' },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className={`p-4 rounded-2xl border border-${color}-500/20 bg-${color}-500/5 space-y-1`}>
            <div className={`text-${color}-400`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-extrabold text-white tracking-tight">{value}</p>
            <p className="text-xs font-semibold text-slate-300">{label}</p>
            <p className="text-[10px] text-slate-500">{sub}</p>
          </div>
        ))}
      </div>

      {/* What worked / what didn't */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 text-sm font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>What Worked ✅</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 list-none">
            {[
              'Zero false-positive outages — socket guard blocked 3 potential mis-pauses during lunch breaks',
              'Predictive pre-hydration fired correctly every morning; environment warm before developer login',
              'All 3 re-activation tests completed under 3 seconds (Dashboard + Slack ChatOps)',
              'Diurnal pattern learned after Day 2; forecaster accurately predicted 09:00–09:05 AM login window',
            ].map((t) => (
              <li key={t} className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 text-sm font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>Improvement Areas ⚠️</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 list-none">
            {[
              '4 false negatives: background Spotify kept HTTP sockets open → idle hours missed (safe failure mode — no developer interrupted)',
              'Fix planned for v2.1: domain-based socket filtering to exclude known media CDN endpoints from active-socket count',
              'Single-instance limitation: no fleet-level service mesh dependencies observed; Phase 2 pilot will add 5+ instances',
            ].map((t) => (
              <li key={t} className="flex items-start space-x-2">
                <span className="text-amber-400 mt-0.5">⚠</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hourly Event Log Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-bold text-white">Selected Hourly Event Log</h2>
          </div>
          <span className="text-xs text-slate-500">Showing 12 key events from 168 total evaluations</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-left">
                <th className="px-4 py-2.5 font-semibold">Timestamp (IST)</th>
                <th className="px-4 py-2.5 font-semibold">Evaluation</th>
                <th className="px-4 py-2.5 font-semibold">ML Score</th>
                <th className="px-4 py-2.5 font-semibold">Action</th>
                <th className="px-4 py-2.5 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {pilotEvents.map((e, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-slate-400">{e.ts}</td>
                  <td className="px-4 py-2.5">
                    <span className={`font-semibold ${e.eval === 'FALSE_NEG' ? 'text-red-400' : e.eval === 'TRUE_IDLE' ? 'text-cyan-400' : e.eval === 'ACTIVE_QUIET' ? 'text-amber-400' : 'text-slate-300'}`}>
                      {e.eval}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-slate-400">{e.score}</td>
                  <td className="px-4 py-2.5">
                    <span className={`font-semibold ${actionColors[e.action] ?? 'text-slate-300'}`}>
                      {e.action}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-400 max-w-xs">{e.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Links row */}
      <div className="flex flex-wrap gap-3 text-xs">
        <Link
          href="/ml-insights"
          className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all"
        >
          <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
          <span>Simulated ML Benchmark (72,000 evals)</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
        <Link
          href="/validation"
          className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Full Validation Methodology (VALIDATION.md)</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

    </div>
  )
}
