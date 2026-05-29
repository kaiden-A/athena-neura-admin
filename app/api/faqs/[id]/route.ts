import { NextResponse } from 'next/server'
import { getFAQs, setFAQs } from '@/lib/store'

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
  const faqs = getFAQs()
  const index = faqs.findIndex((f) => f.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'FAQ not found.' }, { status: 404 })
  }

  setFAQs(faqs.filter((f) => f.id !== id))
  return NextResponse.json({ success: true })
}
