import type { LogEntry } from '../types'

export async function fetchLogs(): Promise<LogEntry[]> {
  const res = await fetch('/api/logs')
  const data = await res.json()
  return data.logs
}
