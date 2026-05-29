import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL!

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=missing_token', request.url))
  }

  const verifyRes = await fetch(`${BACKEND_URL}/api/v1/auth/verify-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })

  if (!verifyRes.ok) {
    return NextResponse.redirect(new URL('/login?error=invalid_token', request.url))
  }

  const signupRes = await fetch(`${BACKEND_URL}/api/v1/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })

  if (!signupRes.ok) {
    return NextResponse.redirect(new URL('/login?error=signup_failed', request.url))
  }

  const signupJson = await signupRes.json()
  const accessToken = signupJson.access_token || signupJson.token

  const response = NextResponse.redirect(new URL('/dashboard', request.url))

  response.cookies.set('auth-token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return response
}
