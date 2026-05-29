import { NextResponse } from 'next/server'
import { getUsers, setUsers } from '@/lib/store'
import type { User } from '@/lib/types'

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  const users = getUsers()
  if (users.find((u) => u.email === email)) {
    return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
  }

  const newUser: User = { email, name, verified: false }
  setUsers([...users, newUser])

  return NextResponse.json({ success: true, email })
}
