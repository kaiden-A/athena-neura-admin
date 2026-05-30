import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getFAQs } from '@/lib/store'

const BACKEND_URL = process.env.BACKEND_URL!

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const faqs = getFAQs()
  const faq = faqs.find((f) => f.id === id)

  if (!faq) {
    return NextResponse.json({ error: 'FAQ not found.' }, { status: 404 })
  }

  return NextResponse.json({ faq })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const res = await fetch(`${BACKEND_URL}/api/v1/rag/qa/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  const json = await res.json()
  return NextResponse.json(json, { status: res.status })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const res = await fetch(`${BACKEND_URL}/api/v1/rag/qa/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })

  const json = await res.json()
  return NextResponse.json(json, { status: res.status })
}
