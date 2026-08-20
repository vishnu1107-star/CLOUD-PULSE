import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: 'CloudPulse | Multi-Cloud Cost Optimization & Infrastructure Engine',
  description: 'Production-grade FinOps cost optimization, real-time metric idle detection, 1-click re-activation, and ghost resource sweeper.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-slate-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-border bg-surface/40 py-6 text-center text-xs text-slate-500">
          <p>© 2026 CloudPulse FinOps Engine. Intelligent Multi-Cloud Lifecycle & Cost Optimization.</p>
        </footer>
      </body>
    </html>
  )
}
