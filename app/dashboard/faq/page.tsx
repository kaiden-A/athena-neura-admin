'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RotateCcw, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import FolderGrid from '@/components/folders/FolderGrid'
import CreateFolderModal from '@/components/folders/CreateFolderModal'
import FAQModal from '@/components/faqs/FAQModal'
import StatsBar from '@/components/StatsBar'
import { useGlobalSearch } from '@/lib/search-context'
import type { KnowledgeFolder } from '@/lib/types'

export default function FAQDirectoryPage() {
  const router = useRouter()
  const { globalSearch, setGlobalSearch } = useGlobalSearch()
  const [folders, setFolders] = useState<KnowledgeFolder[]>([])
  const [filtered, setFiltered] = useState<KnowledgeFolder[]>([])
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [faqModalOpen, setFaqModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    fetch('/api/folders').then((r) => r.json()).then((d) => setFolders(d.folders))
  }, [refreshKey])

  useEffect(() => {
    if (!globalSearch.trim()) {
      setFiltered(folders)
    } else {
      const q = globalSearch.toLowerCase()
      setFiltered(
        folders.filter(
          (f) =>
            f.title.toLowerCase().includes(q) ||
            f.description.toLowerCase().includes(q)
        )
      )
    }
  }, [folders, globalSearch])

  function handleReset() {
    setGlobalSearch('')
    setRefreshKey((k) => k + 1)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-accent">Knowledge Folders</h2>
          <p className="text-xs text-muted mt-0.5">
            Browse and manage knowledge topic clusters.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={handleReset}>
            <RotateCcw size={14} />
            Reset
          </Button>
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus size={14} />
            New Folder
          </Button>
        </div>
      </div>

      <FolderGrid
        folders={filtered}
        onFolderClick={(id) => router.push(`/dashboard/faq/${id}`)}
      />

      <StatsBar />

      <CreateFolderModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreated={() => setRefreshKey((k) => k + 1)}
      />

      <FAQModal
        open={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
        onSaved={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  )
}
