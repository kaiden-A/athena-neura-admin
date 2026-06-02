import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import type { Metadata } from 'next'
import LoginPageContent from './login-content'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to Athena-Neura Knowledge Base',
}

export default async function LoginPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  let shouldRedirect = false
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET)
      shouldRedirect = true
    } catch {}
  }

  if (shouldRedirect) redirect('/dashboard')

  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  )
}
