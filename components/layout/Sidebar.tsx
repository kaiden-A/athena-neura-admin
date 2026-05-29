'use client'

import { usePathname, useRouter } from 'next/navigation'
import { BookOpen, Terminal, Code, Activity, Plus, LogOut, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { User as UserType } from '@/lib/types'

const navItems = [
  { label: 'FAQ Library', icon: BookOpen, section: 'faq' },
  { label: 'Instructions', icon: Terminal, section: 'instructions' },
  { label: 'Metadata', icon: Code, section: 'metadata' },
  { label: 'System Logs', icon: Activity, section: 'logs' },
]

interface SidebarProps {
  onNewEntry: () => void
}

export default function Sidebar({ onNewEntry }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.user) setUser(data.user)
      })
      .catch(() => {})
  }, [])

  const activeSection = pathname.split('/')[2] || 'faq'

  function handleNav(section: string) {
    router.push(`/dashboard/${section === 'faq' ? '' : section}`)
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <aside className="w-[220px] h-screen bg-white border-r border-border flex flex-col shrink-0">
      <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border">
        <div className="w-9 h-9 rounded-[7px] flex items-center justify-center">
          <img
            src={'/icon.png'}
          />
        </div>
        <span className="text-sm font-semibold text-accent">Athena-Neura</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.section === 'faq'
              ? activeSection === 'faq' || activeSection === ''
              : activeSection === item.section
          const Icon = item.icon
          return (
            <button
              key={item.section}
              onClick={() => handleNav(item.section)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-accent text-white'
                  : 'text-muted hover:bg-[#ebebea] hover:text-accent'
              }`}
            >
              <Icon size={16} className={isActive ? 'opacity-70' : ''} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="px-3 pb-2">
        <button
          onClick={onNewEntry}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:bg-[#ebebea] hover:text-accent transition-all duration-150"
        >
          <Plus size={16} />
          New Entry
        </button>
      </div>

      <div className="px-4 py-3 border-t border-border flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#ebebea] flex items-center justify-center">
          <User size={14} className="text-muted" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-accent truncate">{user?.name || 'User'}</p>
          <p className="text-[11px] text-muted truncate">{user?.email || ''}</p>
        </div>
        <button onClick={handleLogout} className="text-muted hover:text-accent p-1" title="Logout">
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  )
}
