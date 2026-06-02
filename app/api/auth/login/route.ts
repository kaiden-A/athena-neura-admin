import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const BACKEND_URL = process.env.BACKEND_URL!
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

async function decodeJWTPayload(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

export async function POST(request: Request) {
  const body = await request.json()

  const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const json = await res.json()

  if (!res.ok) {
    return NextResponse.json(
      { error: json.message || json.error || 'Login failed.' },
      { status: res.status }
    )
  }

  const accessToken = json.access_token || json.token

  const decoded = await decodeJWTPayload(accessToken)

  const response = NextResponse.json({
    user: {
      email: (decoded?.email as string) || body.email,
      name: (decoded?.name as string) || (decoded?.sub as string) || '',
    },
  })

  response.cookies.set('auth-token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return response
}
