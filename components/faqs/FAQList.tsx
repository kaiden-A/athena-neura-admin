'use client'

import { HelpCircle } from 'lucide-react'
import type { FAQArticle } from '@/lib/types'
import FAQItem from './FAQItem'

interface FAQListProps {
  faqs: FAQArticle[]
  onEdit: (faq: FAQArticle) => void
  onDelete: (faq: FAQArticle) => void
}

export default function FAQList({ faqs, onEdit, onDelete }: FAQListProps) {
  if (faqs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border rounded-xl text-muted">
        <HelpCircle size={36} className="text-subtle mb-3" />
        <p className="text-sm font-medium">No FAQs yet</p>
        <p className="text-xs text-subtle mt-1">Add your first FAQ entry to this folder.</p>
      </div>
    )
  }

  return (
    <div className="space-y-[10px]">
      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          onEdit={() => onEdit(faq)}
          onDelete={() => onDelete(faq)}
        />
      ))}
    </div>
  )
}
