'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Plus, Search, AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Modal from '@/components/ui/Modal'
import FAQList from '@/components/faqs/FAQList'
import FAQModal from '@/components/faqs/FAQModal'
import { useToast } from '@/lib/toast-context'
import { useFAQs } from '@/lib/queries'
import { useDeleteFAQ } from '@/lib/mutations'
import { useQueryClient } from '@tanstack/react-query'
import type { KnowledgeFolder, FAQArticle } from '@/lib/types'

export default function FolderDetailContent({
  initialFolder,
  initialFaqs,
  folderId,
}: {
  initialFolder: KnowledgeFolder | null
  initialFaqs: FAQArticle[]
  folderId: string
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const { data: faqs = initialFaqs } = useFAQs(folderId, searchQuery)
  const deleteFaqMutation = useDeleteFAQ(folderId)

  const [folder] = useState<KnowledgeFolder | null>(initialFolder)
  const [faqModalOpen, setFaqModalOpen] = useState(false)
  const [editFaq, setEditFaq] = useState<FAQArticle | null>(null)
  const [deleteFaq, setDeleteFaq] = useState<FAQArticle | null>(null)

  function handleEdit(faq: FAQArticle) {
    setEditFaq(faq)
    setFaqModalOpen(true)
  }

  function handleDelete(faq: FAQArticle) {
    setDeleteFaq(faq)
  }

  async function confirmDelete() {
    if (!deleteFaq) return
    await deleteFaqMutation.mutateAsync(deleteFaq.id)
    showToast('Knowledge deleted successfully.')
    setDeleteFaq(null)
  }

  function handleSaved() {
    queryClient.invalidateQueries({ queryKey: ['faqs', folderId] })
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
          placeholder="Search Knowledge..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-[7px] text-sm border border-border rounded-lg bg-white text-accent placeholder:text-subtle focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/20 transition-all duration-150"
        />
      </div>

      <FAQList faqs={faqs} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        open={!!deleteFaq}
        onClose={() => setDeleteFaq(null)}
        title="Delete Knowledge"
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
            <p className="text-sm text-accent font-medium">Are you sure you want to delete this knowledge entry?</p>
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