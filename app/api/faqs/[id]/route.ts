import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getFAQs, setFAQs } from '@/lib/store'

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
  const body = await request.json()
  const faqs = getFAQs()
  const index = faqs.findIndex((f) => f.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'FAQ not found.' }, { status: 404 })
  }

  const updated = {
    ...faqs[index],
    ...body,
    updatedAt: new Date().toISOString(),
  }
  const newFaqs = [...faqs]
  newFaqs[index] = updated
  setFAQs(newFaqs)

  return NextResponse.json({ faq: updated })
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
