import { NextResponse } from 'next/server'
import { getFAQs, setFAQs } from '@/lib/store'
import type { FAQArticle } from '@/lib/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const folderId = searchParams.get('folderId')
  const q = searchParams.get('q')

  let faqs = getFAQs()

  if (folderId) {
    faqs = faqs.filter((f) => f.folderId === folderId)
  }

  if (q) {
    const query = q.toLowerCase()
    faqs = faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(query) ||
        f.answer.toLowerCase().includes(query)
    )
  }

  return NextResponse.json({ faqs })
}

export async function POST(request: Request) {
  const body = await request.json()
  const faqs = getFAQs()

  const id = 'faq-' + (faqs.length + 1)

  const faq: FAQArticle = {
    id,
    folderId: body.folderId,
    question: body.question || '',
    answer: body.answer || '',
    isVerified: body.isVerified ?? false,
    visibility: body.visibility || 'private',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  setFAQs([...faqs, faq])
  return NextResponse.json({ faq }, { status: 201 })
}
