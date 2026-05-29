import type { FAQArticle } from '../types'

export async function fetchFAQs(params?: {
  folderId?: string
  q?: string
}): Promise<FAQArticle[]> {
  const query = new URLSearchParams()
  if (params?.folderId) query.set('folderId', params.folderId)
  if (params?.q) query.set('q', params.q)
  const res = await fetch(`/api/faqs?${query}`)
  const data = await res.json()
  return data.faqs
}

export async function fetchFAQ(id: string): Promise<FAQArticle> {
  const res = await fetch(`/api/faqs/${id}`)
  const data = await res.json()
  return data.faq
}

export async function createFAQ(
  data: Omit<FAQArticle, 'id'>
): Promise<FAQArticle> {
  const res = await fetch('/api/faqs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.error)
  return result.faq
}

export async function updateFAQ(
  id: string,
  data: Partial<FAQArticle>
): Promise<FAQArticle> {
  const res = await fetch(`/api/faqs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.error)
  return result.faq
}

export async function deleteFAQ(id: string): Promise<void> {
  const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' })
  const result = await res.json()
  if (!res.ok) throw new Error(result.error)
}
