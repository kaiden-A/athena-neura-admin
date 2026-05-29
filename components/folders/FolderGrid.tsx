'use client'

import type { KnowledgeFolder } from '@/lib/types'
import FolderCard from './FolderCard'

interface FolderGridProps {
  folders: KnowledgeFolder[]
  onFolderClick: (id: string) => void
}

export default function FolderGrid({ folders, onFolderClick }: FolderGridProps) {
  if (folders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted">
        <p className="text-sm">No folders found.</p>
        <p className="text-xs text-subtle mt-1">Create a new folder to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[14px]">
      {folders.map((folder) => (
        <FolderCard
          key={folder.id}
          folder={folder}
          onClick={() => onFolderClick(folder.id)}
        />
      ))}
    </div>
  )
}
