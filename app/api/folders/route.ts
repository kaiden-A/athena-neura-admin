import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { KnowledgeFolder } from '@/lib/types'

const BACKEND_URL = process.env.BACKEND_URL!

function extractArray(json: unknown): unknown[] {
  if (Array.isArray(json)) return json
  if (json && typeof json === 'object') {
    const obj = json as Record<string, unknown>
    if (Array.isArray(obj.data)) return obj.data
    if (Array.isArray(obj.folders)) return obj.folders
    if (Array.isArray(obj.topics)) return obj.topics
    if (Array.isArray(obj.items)) return obj.items
    if (Array.isArray(obj.records)) return obj.records
  }
  return []
}

function mapTopicToFolder(topic: Record<string, unknown>): KnowledgeFolder {
  return {
    id: (topic.topicid as string) || '',
    title: (topic.name as string) || '',
    description: (topic.description as string) || '',
    badge: 'TOPIC',
    preset: 'light',
    icon: 'folder',
  }
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return NextResponse.json({ folders: [] }, { status: 200 })
  }

  const res = await fetch(`${BACKEND_URL}/api/v1/rag/topics`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const json = await res.json()
  const items = extractArray(json) as Record<string, unknown>[]
  const folders = items.map(mapTopicToFolder)
  return NextResponse.json({ folders })
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const res = await fetch(`${BACKEND_URL}/api/v1/rag/topics`, {
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
