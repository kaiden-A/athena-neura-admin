import { headers } from 'next/headers'
import type { Metadata } from 'next'
import type { KnowledgeFolder, FAQArticle } from '@/lib/types'
import FolderDetailContent from './folder-detail-content'

export const metadata: Metadata = {
  title: 'Folder Details',
  description: 'View and manage knowledge entries in a folder.',
}

export default async function FolderDetailPage({
  params,
}: {
  params: Promise<{ folderId: string }>
}) {
  const { folderId } = await params
  const h = await headers()
  const baseUrl = `${h.get('x-forwarded-proto') || 'http'}://${h.get('host')}`
  const cookie = h.get('cookie') || ''

  let initialFolder: KnowledgeFolder | null = null
  let initialFaqs: FAQArticle[] = []

  try {
    const [foldersRes, faqsRes] = await Promise.all([
      fetch(`${baseUrl}/api/folders`, { headers: { cookie } }),
      fetch(`${baseUrl}/api/faqs?folderId=${folderId}`, { headers: { cookie } }),
    ])

    const foldersData = await foldersRes.json()
    const folders: KnowledgeFolder[] = foldersData.folders || []
    initialFolder = folders.find((x) => x.id === folderId) || null

    const faqsData = await faqsRes.json()
    initialFaqs = faqsData.faqs || []
  } catch {}

  return <FolderDetailContent initialFolder={initialFolder} initialFaqs={initialFaqs} folderId={folderId} />
}
