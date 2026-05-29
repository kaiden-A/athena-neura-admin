'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { useToast } from '@/lib/toast-context'
import type { FolderPreset } from '@/lib/types'

interface CreateFolderModalProps {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

const presets: { value: FolderPreset; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'blue', label: 'Blue' },
  { value: 'light', label: 'Light' },
]

const presetIcons: Record<FolderPreset, string> = {
  dark: 'shield',
  blue: 'credit-card',
  light: 'folder',
}

export default function CreateFolderModal({ open, onClose, onCreated }: CreateFolderModalProps) {
  const { showToast } = useToast()
  const [title, setTitle] = useState('')
  const [badge, setBadge] = useState('DOC')
  const [description, setDescription] = useState('')
  const [preset, setPreset] = useState<FolderPreset>('light')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit() {
    if (!title.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          badge: badge.toUpperCase(),
          description: description.trim(),
          preset,
          icon: presetIcons[preset],
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error)
      showToast('Folder created successfully.')
      onCreated()
      onClose()
      setTitle('')
      setBadge('DOC')
      setDescription('')
      setPreset('light')
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
          <Button onClick={handleSubmit} disabled={submitting || !title.trim()}>
            {submitting ? 'Creating...' : 'Create'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Folder Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Authentication"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Scope Badge
          </label>
          <Input
            value={badge}
            onChange={(e) => setBadge(e.target.value.toUpperCase())}
            placeholder="DOC"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of this folder..."
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
            Visual Style
          </label>
          <div className="flex gap-3">
            {presets.map((p) => (
              <label
                key={p.value}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-all ${
                  preset === p.value
                    ? 'border-accent bg-accent/5 text-accent'
                    : 'border-border text-muted hover:border-[#bbb]'
                }`}
              >
                <input
                  type="radio"
                  name="preset"
                  value={p.value}
                  checked={preset === p.value}
                  onChange={() => setPreset(p.value)}
                  className="sr-only"
                />
                {p.label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
