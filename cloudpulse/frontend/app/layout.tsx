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
    <div className="w-full bg-white border-b border-gray-200 text-[11px] text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-1.5">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-[11px]">
            <Zap className="w-3 h-3 text-blue-600" />
            <span>EMBRIX&apos;26 VEGATHON — Edge AI &amp; TinyML Track</span>
          </span>
          <a
            href="/ml-insights"
            className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-medium text-[11px] hover:bg-indigo-100 transition-colors"
          >
            <FlaskConical className="w-3 h-3 text-indigo-600" />
            <span>Real VM Trace Replay &amp; Model Validation</span>
          </a>
        </div>
        <div className="flex items-center space-x-1.5 text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Prototype Demonstration — Last Updated: <span className="text-gray-700 font-mono font-medium">{now}</span></span>
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
    <html lang="en">
      <head>
        <title>CloudPulse | EMBRIX&apos;26 VEGATHON — Edge AI &amp; TinyML Track</title>
        <meta name="description" content="Autonomous Cloud Waste Reclamation via TinyML anomaly detection on C-DAC VEGA Aries RISC-V edge hardware with reversible Vault recovery." />
        <meta name="keywords" content="EMBRIX'26 VEGATHON, Edge AI, TinyML, VEGA Aries, RISC-V, Isolation Forest, Cloud Waste Reclamation, FinOps" />
      </head>
      <body className="bg-[#F9FAFB] text-gray-900 min-h-screen flex flex-col antialiased">
        <ToastProvider>
          <LastUpdatedBar />
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            {children}
          </main>
          <LandingFooter />
        </ToastProvider>
      </body>
    </html>
  )
}
