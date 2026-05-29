'use client'

import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import Button from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

export default function Modal({ open, onClose, title, children, footer }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm fade-in">
      <div className="bg-white rounded-[14px] p-6 max-w-[480px] w-full mx-4 shadow-lg animate-fadeIn">
        <div className="flex items-center justify-between pb-4 border-b border-[#f0f0ee]">
          <h2 className="text-base font-semibold text-accent">{title}</h2>
          <button onClick={onClose} className="text-muted hover:text-accent p-1">
            <X size={18} />
          </button>
        </div>
        <div className="py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 pt-4 border-t border-[#f0f0ee]">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
