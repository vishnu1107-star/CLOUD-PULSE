import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { ToastProvider } from '@/components/toast'

export const metadata: Metadata = {
  title: 'CloudPulse | Autonomous Multi-Cloud FinOps & Hydration Engine',
  description: 'Production-grade FinOps cost optimization, real-time metric idle detection, 1-click re-activation, and ghost resource sweeper.',
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
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {children}
          </main>
          <footer className="border-t border-border bg-surface/40 py-6 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>© 2026 CloudPulse FinOps Engine — Developed by Team ARGUS Innovators for TSM-TECHNOVA 2026.</p>
              <div className="flex items-center space-x-3 text-slate-400">
                <span>FastAPI + Next.js 14</span>
                <span>•</span>
                <span>C-DAC VEGA RISC-V Edge</span>
                <span>•</span>
                <span>UN SDG 9, 12, 13 Compliant</span>
              </div>
            </div>
          </footer>
        </ToastProvider>
      </body>
    </html>
  )
}
