import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getFolders, getFAQs } from '@/lib/store'

const BACKEND_URL = process.env.BACKEND_URL!

function extractArray(json: unknown): unknown[] {
  if (Array.isArray(json)) return json
  if (json && typeof json === 'object') {
    const obj = json as Record<string, unknown>
    if (Array.isArray(obj.data)) return obj.data
    if (Array.isArray(obj.folders)) return obj.folders
    if (Array.isArray(obj.topics)) return obj.topics
    if (Array.isArray(obj.faqs)) return obj.faqs
    if (Array.isArray(obj.qa)) return obj.qa
    if (Array.isArray(obj.items)) return obj.items
    if (Array.isArray(obj.records)) return obj.records
  }
  return []
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    const folders = getFolders()
    const faqs = getFAQs()
    return NextResponse.json({
      totalArticles: faqs.length,
      totalFolders: folders.length,
      verifiedCount: faqs.filter((f) => f.isVerified).length,
    })
  }

  const headers = { Authorization: `Bearer ${token}` }

  const [foldersRes, faqsRes] = await Promise.all([
    fetch(`${BACKEND_URL}/api/v1/rag/topics`, { headers }),
    fetch(`${BACKEND_URL}/api/v1/rag/qa`, { headers }),
  ])

  const foldersJson = await foldersRes.json()
  const faqsJson = await faqsRes.json()

  const folders = extractArray(foldersJson)
  const faqs = extractArray(faqsJson)

  return NextResponse.json({
    totalArticles: faqs.length,
    totalFolders: folders.length,
    verifiedCount: 0,
  })
}
