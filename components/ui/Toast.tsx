'use client'

import { useToast } from '@/lib/toast-context'
import { Check } from 'lucide-react'

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-2.5 bg-accent text-white px-4 py-3 rounded-[10px] shadow-lg text-sm fade-in cursor-pointer"
          onClick={() => removeToast(toast.id)}
        >
          <Check size={16} className="text-emerald-400 shrink-0" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
