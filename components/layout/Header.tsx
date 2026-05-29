'use client'

import { Search, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useGlobalSearch } from '@/lib/search-context'

const sectionTitles: Record<string, string> = {
  faq: 'FAQ Library',
  instructions: 'Instructions',
  metadata: 'Metadata / API Schema',
  logs: 'System Logs',
}

export default function Header() {
  const pathname = usePathname()
  const { globalSearch, setGlobalSearch } = useGlobalSearch()
  const segment = pathname.split('/')[2] || 'faq'
  const isFolderDetail = pathname.includes('/faq/') && pathname.split('/faq/')[1]?.length > 0
  const title = isFolderDetail ? 'FAQ Folder' : (sectionTitles[segment] || 'Dashboard')
  const showSearch = segment === 'faq' && !isFolderDetail

  return (
    <header className="h-14 bg-white border-b border-border flex items-center justify-between px-6 shrink-0">
      <h1 className="text-base font-semibold text-accent">{title}</h1>
      {showSearch && (
        <div className="relative w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
          <input
            type="text"
            placeholder="Search folders..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-[7px] text-sm border border-border rounded-lg bg-white text-accent placeholder:text-subtle focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/20 transition-all duration-150"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-subtle hover:text-accent"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}
    </header>
  )
}
