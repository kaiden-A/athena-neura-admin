'use client'

import LogTerminal from '@/components/LogTerminal'

export default function LogsPage() {
  return (
    <div className="fade-in">
      <h2 className="text-lg font-semibold text-accent mb-1">System Logs</h2>
      <p className="text-xs text-muted mb-4">
        Real-time system events and diagnostic information.
      </p>
      <LogTerminal />
    </div>
  )
}
