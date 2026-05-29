import { NextResponse } from 'next/server'
import { getFolders, setFolders } from '@/lib/store'
import type { KnowledgeFolder } from '@/lib/types'

export async function GET() {
  return NextResponse.json({ folders: getFolders() })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { title, badge, description, preset, icon } = body

  const id = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  const folders = getFolders()
  if (folders.find((f) => f.id === id)) {
    return NextResponse.json({ error: 'A folder with this title already exists.' }, { status: 409 })
  }

  const folder: KnowledgeFolder = {
    id,
    title: title || 'Untitled',
    badge: (badge || 'DOC').toUpperCase(),
    description: description || '',
    preset: preset || 'light',
    icon: icon || 'folder',
  }

  setFolders([...folders, folder])
  return NextResponse.json({ folder }, { status: 201 })
}
