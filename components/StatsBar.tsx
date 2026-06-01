'use client'

import { useEffect, useState } from 'react'
import type { Stats } from '@/lib/types'

async function fetchStats(): Promise<Stats | null> {
  try {
    const res = await fetch('/api/stats')
    if (!res.ok) return null
    const data = await res.json()
    if (typeof data.totalArticles === 'number' && typeof data.totalFolders === 'number') {
      return data
    }
  } catch {}
  return null
}

export default function StatsBar() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetchStats().then(setStats)

    const interval = setInterval(() => {
      fetchStats().then(setStats)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-6 text-xs text-muted">
      <span>
        <strong className="text-accent">{stats?.totalArticles ?? '—'}</strong> Articles
      </span>
      <span>
        <strong className="text-accent">{stats?.totalFolders ?? '—'}</strong> Folders
      </span>
      <span className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        System Online
      </span>
    </div>
  )
}
