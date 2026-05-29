'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { useToast } from '@/lib/toast-context'

interface CreateFolderModalProps {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

export default function CreateFolderModal({ open, onClose, onCreated }: CreateFolderModalProps) {
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit() {
    if (!name.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Failed to create folder.')
      showToast('Folder created successfully.')
      onCreated()
      onClose()
      setName('')
      setDescription('')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create folder.'
      showToast(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Folder"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting || !name.trim()}>
            {submitting ? 'Creating...' : 'Create'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Authentication"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of this topic..."
          />
        </div>
      </div>
    </Modal>
  )
}
