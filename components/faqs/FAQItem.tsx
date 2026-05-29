'use client'

import { Edit3, Trash2 } from 'lucide-react'
import type { FAQArticle } from '@/lib/types'
import Tag from '@/components/ui/Tag'

interface FAQItemProps {
  faq: FAQArticle
  onEdit: () => void
  onDelete: () => void
}

export default function FAQItem({ faq, onEdit, onDelete }: FAQItemProps) {
  return (
    <div className="bg-white border border-border rounded-xl p-4 fade-in">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <Tag variant={faq.isVerified ? 'verified' : 'draft'}>
              {faq.isVerified ? 'AI Verified' : 'Draft'}
            </Tag>
            <Tag variant={faq.visibility}>{faq.visibility === 'public' ? 'Public' : 'Private'}</Tag>
            <span className="text-sm font-medium text-accent">{faq.question}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onEdit}
            className="p-[6px] rounded-md text-muted hover:bg-[#f0f0ee] hover:text-accent transition-all"
            title="Edit FAQ"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={onDelete}
            className="p-[6px] rounded-md text-muted hover:bg-[#fef2f2] hover:text-red-600 transition-all"
            title="Delete FAQ"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div className="mt-2 bg-[#f9f9f8] rounded-lg p-3 text-xs text-muted leading-relaxed">
        {faq.answer}
      </div>
    </div>
  )
}
