import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import type { Metadata } from 'next'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export const metadata: Metadata = {
  title: 'Athena-Neura',
  description: 'Athena-Neura Knowledge Base Explorer',
}

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  let isValid = false
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET)
      isValid = true
    } catch {}
  }

  if (isValid) redirect('/dashboard')
  redirect('/login')
}
