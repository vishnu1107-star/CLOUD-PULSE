'use client'

import React from 'react'
import { AuditLogStream } from '@/components/audit-log-stream'

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <AuditLogStream />
    </div>
  )
}
