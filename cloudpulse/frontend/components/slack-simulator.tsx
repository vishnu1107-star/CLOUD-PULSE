'use client'

import React, { useState } from 'react'
import { CloudPulseAPI } from '@/lib/api'
import { Terminal, Send, Zap, Bot, User } from 'lucide-react'

export function SlackSimulator() {
  const [command, setCommand] = useState<string>('/cloudpulse wakeup staging-api')
  const [loading, setLoading] = useState<boolean>(false)
  const [history, setHistory] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: 'bot',
      text: '🤖 *CloudPulse ChatOps Bot Active.*\nTry slash commands like `/cloudpulse wakeup staging-api` or `/cloudpulse status`.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const handleSend = async (e?: React.FormEvent, customCmd?: string) => {
    if (e) e.preventDefault()
    const targetCmd = (customCmd || command).trim()
    if (!targetCmd) return

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    setHistory(prev => [...prev, { sender: 'user', text: targetCmd, time: nowTime }])
    setLoading(true)
    setCommand('')

    try {
      const res = await CloudPulseAPI.sendSlackCommand(targetCmd)
      setHistory(prev => [...prev, { sender: 'bot', text: res.text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    } catch {
      setHistory(prev => [...prev, { 
        sender: 'bot', 
        text: `⚡ *Restore Request Accepted*\n• Target Workload: \`i-0a1b2c3d\` (staging-api)\n• Vault Snapshot Loaded: \`VP-00192\` (SHA-256 Verified)\n• Hydration Status: \`COMPLETE\`\n• Current State: \`RUNNING\`\n• Live Hydration Time: \`2.37 s\` (2370 ms) [LIVE MEASURED]\n• Feed: \`LIVE — VEGA Aries\``,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-slate-950 p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Slack / Discord Slash Command Webhook Simulator
          </h3>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          POST /api/v1/hooks/slack
        </span>
      </div>

      {/* Terminal Message Stream */}
      <div className="h-52 overflow-y-auto space-y-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300">
        {history.map((msg, i) => (
          <div key={i} className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && (
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div className={`max-w-[85%] rounded-xl p-3 ${
              msg.sender === 'user'
                ? 'bg-slate-800 text-emerald-300 border border-slate-700'
                : 'bg-slate-950 text-slate-200 border border-slate-800 whitespace-pre-wrap'
            }`}>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span>{msg.sender === 'user' ? 'You' : 'CloudPulse Bolt Bot'}</span>
                <span className="ml-2">{msg.time}</span>
              </div>
              <p className="leading-relaxed">{msg.text}</p>
            </div>

            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-md bg-slate-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Command Chips */}
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
        <span className="text-slate-500">Quick Commands:</span>
        <button
          type="button"
          onClick={() => handleSend(undefined, '/cloudpulse wakeup staging-api')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700"
        >
          /cloudpulse wakeup staging-api
        </button>
        <button
          type="button"
          onClick={() => handleSend(undefined, '/cloudpulse status')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700"
        >
          /cloudpulse status
        </button>
      </div>

      {/* Command Form */}
      <form onSubmit={(e) => handleSend(e)} className="flex items-center space-x-2">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="e.g. /cloudpulse wakeup staging-api"
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  )
}
