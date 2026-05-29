import { NextResponse } from 'next/server'
import { getFolders, getFAQs } from '@/lib/store'

export async function GET() {
  const folders = getFolders()
  const faqs = getFAQs()

  return NextResponse.json({
    totalArticles: faqs.length,
    totalFolders: folders.length,
    verifiedCount: faqs.filter((f) => f.isVerified).length,
  })
}
