import type { Stats } from '../types'

export async function fetchStats(): Promise<Stats> {
  const res = await fetch('/api/stats')
  const data = await res.json()
  return data
}
