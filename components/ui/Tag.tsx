'use client'

import type { ReactNode } from 'react'

type TagVariant = 'verified' | 'draft' | 'public' | 'private'

const tagStyles: Record<TagVariant, string> = {
  verified: 'bg-[#ecfdf5] text-emerald-600 border-[#a7f3d0]',
  draft: 'bg-[#fffbeb] text-amber-600 border-[#fde68a]',
  public: 'bg-[#eef2ff] text-indigo-600 border-[#c7d2fe]',
  private: 'bg-[#f5f5f3] text-muted border-[#ddd]',
}

interface TagProps {
  variant: TagVariant
  children: ReactNode
}

export default function Tag({ variant, children }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-[2px] rounded-md text-[11px] font-semibold border ${tagStyles[variant]}`}
    >
      {children}
    </span>
  )
}
