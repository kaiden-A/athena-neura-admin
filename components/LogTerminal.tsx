'use client'

import { useEffect, useState, useRef } from 'react'
import { fetchLogs } from '@/lib/api/logs'
import type { LogEntry } from '@/lib/types'

const levelColors: Record<string, string> = {
  INFO: 'text-blue-400',
  OK: 'text-emerald-400',
  WARN: 'text-amber-400',
  ERROR: 'text-red-400',
}

export default function LogTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchLogs().then(setLogs)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="bg-accent text-emerald-400 font-mono text-xs rounded-xl p-4 h-[360px] overflow-y-auto custom-scrollbar">
      {logs.map((log, i) => (
        <div key={i} className="leading-relaxed whitespace-nowrap">
          <span className="text-white/40">[{log.timestamp}]</span>{' '}
          <span className={levelColors[log.level]}>[{log.level}]</span>{' '}
          <span className="text-white/80">{log.message}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
