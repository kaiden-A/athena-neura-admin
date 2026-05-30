'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, Plus, Search, AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Modal from '@/components/ui/Modal'
import FAQList from '@/components/faqs/FAQList'
import FAQModal from '@/components/faqs/FAQModal'
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
  const [deleteFaq, setDeleteFaq] = useState<FAQArticle | null>(null)

  useEffect(() => {
    fetch('/api/folders').then((r) => r.json()).then((d) => {
      const found = d.folders.find((x: KnowledgeFolder) => x.id === folderId)
      setFolder(found || null)
    })
    loadFAQs()
  }, [folderId])

  function loadFAQs() {
    const params = new URLSearchParams()
    if (folderId) params.set('folderId', folderId)
    if (searchQuery) params.set('q', searchQuery)
    fetch(`/api/faqs?${params}`).then((r) => r.json()).then((d) => setFaqs(d.faqs))
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
    setDeleteFaq(faq)
  }

  async function confirmDelete() {
    if (!deleteFaq) return
    await fetch(`/api/faqs/${deleteFaq.id}`, { method: 'DELETE' })
    showToast('FAQ deleted successfully.')
    setDeleteFaq(null)
    loadFAQs()
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
          Add Knowledge
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

      <Modal
        open={!!deleteFaq}
        onClose={() => setDeleteFaq(null)}
        title="Delete FAQ"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteFaq(null)}>Cancel</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={confirmDelete}>Delete</Button>
          </>
        }
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-red-500">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-sm text-accent font-medium">Are you sure you want to delete this FAQ?</p>
            <p className="text-sm text-muted mt-1">{deleteFaq?.question}</p>
          </div>
        </div>
      </Modal>

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
