'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, Plus, Search } from 'lucide-react'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import FAQList from '@/components/faqs/FAQList'
import FAQModal from '@/components/faqs/FAQModal'
import { fetchFolders } from '@/lib/api/folders'
import { fetchFAQs, deleteFAQ } from '@/lib/api/faqs'
import { useToast } from '@/lib/toast-context'
import type { KnowledgeFolder, FAQArticle } from '@/lib/types'

export default function FolderDetailPage() {
  const { folderId } = useParams<{ folderId: string }>()
  const router = useRouter()
  const { showToast } = useToast()

  const [folder, setFolder] = useState<KnowledgeFolder | null>(null)
  const [faqs, setFaqs] = useState<FAQArticle[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [faqModalOpen, setFaqModalOpen] = useState(false)
  const [editFaq, setEditFaq] = useState<FAQArticle | null>(null)

  useEffect(() => {
    fetchFolders().then((f) => {
      const found = f.find((x) => x.id === folderId)
      setFolder(found || null)
    })
    loadFAQs()
  }, [folderId])

  function loadFAQs() {
    fetchFAQs({ folderId, q: searchQuery || undefined }).then(setFaqs)
  }

  useEffect(() => {
    const timer = setTimeout(() => loadFAQs(), 200)
    return () => clearTimeout(timer)
  }, [searchQuery])

  function handleEdit(faq: FAQArticle) {
    setEditFaq(faq)
    setFaqModalOpen(true)
  }

  function handleDelete(faq: FAQArticle) {
    if (confirm(`Delete FAQ: "${faq.question}"?`)) {
      deleteFAQ(faq.id).then(() => {
        showToast('FAQ deleted successfully.')
        loadFAQs()
      })
    }
  }

  function handleSaved() {
    loadFAQs()
  }

  if (!folder) {
    return (
      <div className="flex items-center justify-center py-20 text-muted text-sm">
        Folder not found.
      </div>
    )
  }

  return (
    <div className="space-y-5 fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => router.push('/dashboard/faq')}>
            <ChevronLeft size={16} />
            Back
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-accent">{folder.title}</h2>
              <Tag variant={folder.preset === 'dark' ? 'private' : 'public'}>
                {folder.badge}
              </Tag>
            </div>
            <p className="text-xs text-muted mt-0.5">{folder.description}</p>
          </div>
        </div>
        <Button
          onClick={() => {
            setEditFaq(null)
            setFaqModalOpen(true)
          }}
        >
          <Plus size={14} />
          Add FAQ
        </Button>
      </div>

      <div className="relative w-72">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-[7px] text-sm border border-border rounded-lg bg-white text-accent placeholder:text-subtle focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/20 transition-all duration-150"
        />
      </div>

      <FAQList faqs={faqs} onEdit={handleEdit} onDelete={handleDelete} />

      <FAQModal
        open={faqModalOpen}
        onClose={() => {
          setFaqModalOpen(false)
          setEditFaq(null)
        }}
        onSaved={handleSaved}
        editFaq={editFaq}
        preselectedFolderId={folderId}
      />
    </div>
  )
}
