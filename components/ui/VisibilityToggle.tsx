'use client'

import type { FAQVisibility } from '@/lib/types'

interface VisibilityToggleProps {
  value: FAQVisibility
  onChange: (v: FAQVisibility) => void
}

export default function VisibilityToggle({ value, onChange }: VisibilityToggleProps) {
  return (
    <div className="inline-flex bg-bg border border-border rounded-lg p-[3px]">
      <button
        type="button"
        onClick={() => onChange('public')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 ${
          value === 'public'
            ? 'bg-white text-accent shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
            : 'bg-transparent text-muted hover:text-accent'
        }`}
      >
        Public
      </button>
      <button
        type="button"
        onClick={() => onChange('private')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 ${
          value === 'private'
            ? 'bg-white text-accent shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
            : 'bg-transparent text-muted hover:text-accent'
        }`}
      >
        Private
      </button>
    </div>
  )
}
