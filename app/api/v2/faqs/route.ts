import { NextResponse } from 'next/server'
import { getFolders, getFAQs } from '@/lib/store'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format')

  if (format !== 'athena-neura-optimized') {
    return NextResponse.json({ error: 'Invalid format. Use ?format=athena-neura-optimized' }, { status: 400 })
  }

  const folders = getFolders()
  const faqs = getFAQs()

  const result = folders.map((folder) => ({
    folder,
    faqs: faqs.filter(
      (f) =>
        f.folderId === folder.id &&
        f.visibility === 'public' &&
        f.isVerified
    ),
  }))

  return NextResponse.json({ folders: result })
}
