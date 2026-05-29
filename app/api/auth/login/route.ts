import { NextResponse } from 'next/server'
import { getUsers } from '@/lib/store'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const users = getUsers()
  const user = users.find((u) => u.email === email)

  if (!user || password !== 'admin123') {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  const token = 'mock-token-' + Date.now()

  return NextResponse.json({ user, token })
}
