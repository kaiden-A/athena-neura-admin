import { NextResponse } from 'next/server'
import { getFolders, setFolders } from '@/lib/store'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const folders = getFolders()
  const index = folders.findIndex((f) => f.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Folder not found.' }, { status: 404 })
  }

  const updated = { ...folders[index], ...body }
  const newFolders = [...folders]
  newFolders[index] = updated
  setFolders(newFolders)

  return NextResponse.json({ folder: updated })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const folders = getFolders()
  const index = folders.findIndex((f) => f.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Folder not found.' }, { status: 404 })
  }

  setFolders(folders.filter((f) => f.id !== id))
  return NextResponse.json({ success: true })
}
