'use client'

import React, { useEffect, useState } from 'react'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { ToastProvider } from '@/components/toast'
import { LandingFooter } from '@/components/landing-footer'
import { Clock, Zap, FlaskConical } from 'lucide-react'

function LastUpdatedBar() {
  const [now, setNow] = useState<string>('')

  useEffect(() => {
    const fmt = () =>
      setNow(
        new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' IST'
      )
    fmt()
    const id = setInterval(fmt, 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/70 text-[11px] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-1.5">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold text-[11px]">
            <Zap className="w-3 h-3" />
            <span>TECHNOVA 2026 — AI Innovation Track</span>
          </span>
          <a
            href="/pilot"
            className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-medium text-[11px] hover:bg-emerald-500/20 transition-colors"
          >
            <FlaskConical className="w-3 h-3" />
            <span>Real Pilot — Week 1 Results</span>
          </a>
        </div>
        <div className="flex items-center space-x-1.5 text-slate-500">
          <Clock className="w-3 h-3" />
          <span>Live Demo — Last Updated: <span className="text-slate-300 font-mono">{now}</span></span>
        </div>
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-slate-100 min-h-screen flex flex-col antialiased">
        <ToastProvider>
          <LastUpdatedBar />
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {children}
          </main>
          <LandingFooter />
        </ToastProvider>
      </body>
    </html>
  )
}
