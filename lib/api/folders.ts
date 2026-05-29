import type { KnowledgeFolder } from '../types'

export async function fetchFolders(): Promise<KnowledgeFolder[]> {
  const res = await fetch('/api/folders')
  const data = await res.json()
  return data.folders
}

export async function createFolder(
  data: Omit<KnowledgeFolder, 'id'>
): Promise<KnowledgeFolder> {
  const res = await fetch('/api/folders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.error)
  return result.folder
}

export async function updateFolder(
  id: string,
  data: Partial<KnowledgeFolder>
): Promise<KnowledgeFolder> {
  const res = await fetch(`/api/folders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.error)
  return result.folder
}

export async function deleteFolder(id: string): Promise<void> {
  const res = await fetch(`/api/folders/${id}`, { method: 'DELETE' })
  const result = await res.json()
  if (!res.ok) throw new Error(result.error)
}
