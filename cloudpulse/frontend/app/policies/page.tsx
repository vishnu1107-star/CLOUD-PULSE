'use client'

import React from 'react'
import { PolicyEditor } from '@/components/policy-editor'
import { Sliders } from 'lucide-react'

export default function PoliciesPage() {
  return (
    <div className="space-y-6 text-gray-900">
      <PolicyEditor />
    </div>
  )
}
