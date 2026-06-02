import { headers } from 'next/headers'
import type { Metadata } from 'next'
import type { KnowledgeFolder } from '@/lib/types'
import FAQDirectoryContent from './faq-directory-content'

export const metadata: Metadata = {
  title: 'Knowledge Folders',
  description: 'Browse and manage knowledge topic clusters.',
}

export default async function FAQDirectoryPage() {
  const h = await headers()
  const baseUrl = `${h.get('x-forwarded-proto') || 'http'}://${h.get('host')}`

  let initialFolders: KnowledgeFolder[] = []
  try {
    const res = await fetch(`${baseUrl}/api/folders`, {
      headers: { cookie: h.get('cookie') || '' },
    })
    const data = await res.json()
    initialFolders = data.folders || []
  } catch {}

  return <FAQDirectoryContent initialFolders={initialFolders} />
}
