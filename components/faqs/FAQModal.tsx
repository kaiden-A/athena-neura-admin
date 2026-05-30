'use client'

import { useState, useEffect } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Input, Textarea, Select } from '@/components/ui/Input'
import VisibilityToggle from '@/components/ui/VisibilityToggle'
import { useToast } from '@/lib/toast-context'
import type { FAQArticle, FAQVisibility, KnowledgeFolder } from '@/lib/types'

interface FAQModalProps {
  open: boolean
  onClose: () => void
  onSaved: () => void
  editFaq?: FAQArticle | null
  preselectedFolderId?: string
}

export default function FAQModal({ open, onClose, onSaved, editFaq, preselectedFolderId }: FAQModalProps) {
  const { showToast } = useToast()
  const [folders, setFolders] = useState<KnowledgeFolder[]>([])
  const [topicId, setTopicId] = useState(preselectedFolderId || '')
  const [isVerified, setIsVerified] = useState(false)
  const [visibility, setVisibility] = useState<FAQVisibility>('public')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isEditing = !!editFaq

  useEffect(() => {
    if (open) {
      fetch('/api/folders').then((r) => r.json()).then((d) => setFolders(d.folders))
      if (editFaq) {
        setTopicId(editFaq.folderId)
        setIsVerified(editFaq.isVerified)
        setVisibility(editFaq.visibility)
        setQuestion(editFaq.question)
        setAnswer(editFaq.answer)
      } else {
        setTopicId(preselectedFolderId || '')
        setIsVerified(false)
        setVisibility('public')
        setQuestion('')
        setAnswer('')
      }
    }
  }, [open, editFaq, preselectedFolderId])

  async function handleSubmit() {
    if (!topicId || !question.trim() || !answer.trim()) return
    setSubmitting(true)
    try {
      let res: Response

      if (isEditing && editFaq) {
        res = await fetch(`/api/faqs/${editFaq.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topicId,
            question: question.trim(),
            answer: answer.trim(),
            visibility,
            assistant: '',
          }),
        })
      } else {
        res = await fetch('/api/faqs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topicId,
            question: question.trim(),
            answer: answer.trim(),
            visibility,
          }),
        })
      }

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Failed to save FAQ.')
      showToast(isEditing ? 'FAQ updated successfully.' : 'FAQ created successfully.')

      onSaved()
      onClose()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save FAQ.'
      showToast(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Edit FAQ Entry' : 'Add FAQ Entry'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting || !topicId || !question.trim() || !answer.trim()}>
            {submitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create'}
          </Button>
        </>
      }
    >
      <div className="space-y-4" data-faq-action={isEditing ? 'edit' : 'create'} data-faq-id={editFaq?.id || ''}>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Topic
          </label>
          <Select value={topicId} onChange={(e) => setTopicId(e.target.value)}>
            <option value="">Select a topic...</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.title}
              </option>
            ))}
          </Select>
        </div>
        {isEditing && (
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
              Status
            </label>
            <Select value={isVerified ? 'verified' : 'draft'} onChange={(e) => setIsVerified(e.target.value === 'verified')}>
              <option value="draft">Draft</option>
              <option value="verified">AI Verified</option>
            </Select>
          </div>
        )}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Visibility
          </label>
          <VisibilityToggle value={visibility} onChange={setVisibility} />
          <p className="text-[11px] text-subtle mt-1">
            {visibility === 'public'
              ? 'Visible to all users and the LLM knowledge base.'
              : 'Only visible to internal admins.'}
          </p>
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Question/Context
          </label>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the FAQ question..."
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Answer/Content
          </label>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter the answer..."
            rows={4}
          />
        </div>
      </div>
    </Modal>
  )
}
