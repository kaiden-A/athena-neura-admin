import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { FAQArticle } from '@/lib/types'

const BACKEND_URL = process.env.BACKEND_URL!

function extractArray(json: unknown): unknown[] {
  if (Array.isArray(json)) return json
  if (json && typeof json === 'object') {
    const obj = json as Record<string, unknown>
    if (Array.isArray(obj.data)) return obj.data
    if (Array.isArray(obj.faqs)) return obj.faqs
    if (Array.isArray(obj.qa)) return obj.qa
    if (Array.isArray(obj.items)) return obj.items
    if (Array.isArray(obj.records)) return obj.records
  }
  return []
}

function mapQAItemToFAQ(item: Record<string, unknown>): FAQArticle {
  return {
    id: (item.id as string) || '',
    folderId: (item.topic_id as string) || '',
    question: (item.question as string) || '',
    answer: (item.answer as string) || '',
    isVerified: false,
    visibility: (item.visibility as FAQArticle['visibility']) || 'public',
    createdAt: item.created_at as string,
    updatedAt: item.updated_at as string,
  }
}

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return NextResponse.json({ faqs: [] }, { status: 200 })
  }

  const { searchParams } = new URL(request.url)
  const topicId = searchParams.get('folderId') || searchParams.get('topicId')
  const q = searchParams.get('q')

  const params = new URLSearchParams()
  if (topicId) params.set('topicId', topicId)
  if (q) params.set('q', q)

  const qs = params.toString()
  const url = `${BACKEND_URL}/api/v1/rag/qa${qs ? `?${qs}` : ''}`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const json = await res.json()
  const items = extractArray(json) as Record<string, unknown>[]
  const faqs = items.map(mapQAItemToFAQ)
  return NextResponse.json({ faqs })
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const res = await fetch(`${BACKEND_URL}/api/v1/rag/qa`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  const json = await res.json()
  return NextResponse.json(json, { status: res.status })
}
