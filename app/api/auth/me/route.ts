import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

async function decodeJWTPayload(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })
  }

  const decoded = await decodeJWTPayload(token)

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token.' }, { status: 401 })
  }

  return NextResponse.json({
    user: {
      email: (decoded.email as string) || '',
      name: (decoded.name as string) || (decoded.sub as string) || '',
    },
  })
}
