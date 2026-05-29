'use client'

import { useEffect, useState } from 'react'
import { fetchStats } from '@/lib/api/stats'
import type { Stats } from '@/lib/types'

export default function StatsBar() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetchStats().then(setStats)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats().then(setStats)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!stats) return null

  return (
    <div className="flex items-center gap-6 text-xs text-muted">
      <span>
        <strong className="text-accent">{stats.totalArticles}</strong> Articles
      </span>
      <span>
        <strong className="text-accent">{stats.totalFolders}</strong> Folders
      </span>
      <span>
        <strong className="text-accent">{stats.verifiedCount}</strong> Verified
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
