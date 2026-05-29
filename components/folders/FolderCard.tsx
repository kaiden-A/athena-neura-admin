'use client'

import { Shield, CreditCard, Folder, type LucideIcon } from 'lucide-react'
import type { KnowledgeFolder } from '@/lib/types'

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  'credit-card': CreditCard,
  folder: Folder,
}

const presetStyles: Record<string, string> = {
  dark: 'bg-accent text-white border-accent',
  blue: 'bg-[#eef2ff] border-[#c7d2fe] text-accent',
  light: 'bg-white border-border text-accent',
}

interface FolderCardProps {
  folder: KnowledgeFolder
  onClick: () => void
}

export default function FolderCard({ folder, onClick }: FolderCardProps) {
  const Icon = iconMap[folder.icon] || Folder
  const style = presetStyles[folder.preset] || presetStyles.light

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start p-4 rounded-xl border text-left cursor-pointer transition-all duration-150 hover:border-[#bbb] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] ${style}`}
    >
      <div className="flex items-center justify-between w-full mb-3">
        <span
          className={`inline-flex items-center px-2 py-[2px] rounded-md text-[11px] font-semibold border ${
            folder.preset === 'blue'
              ? 'border-[#c7d2fe] text-indigo-600'
              : folder.preset === 'dark'
              ? 'border-white/20 text-white/80'
              : 'border-border text-muted'
          }`}
        >
          {folder.badge}
        </span>
        <Icon
          size={20}
          className={
            folder.preset === 'dark'
              ? 'opacity-70'
              : folder.preset === 'blue'
              ? 'text-indigo-400'
              : 'text-muted'
          }
        />
      </div>
      <h3 className="text-sm font-semibold mb-1">{folder.title}</h3>
      <p
        className={`text-xs leading-relaxed line-clamp-2 ${
          folder.preset === 'dark' ? 'text-white/70' : 'text-muted'
        }`}
      >
        {folder.description}
      </p>
    </button>
  )
}
