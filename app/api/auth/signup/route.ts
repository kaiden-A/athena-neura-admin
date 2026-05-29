import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL!
const MOTIONU_API_KEY = process.env.MOTIONU_API_KEY!
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@motionukict.com'
const EMAIL_TEMPLATE_ID = process.env.EMAIL_TEMPLATE_ID || 'tmpl_new_users'
const EMAIL_SUBJECT = process.env.EMAIL_SUBJECT || 'Verify your email for Athena-Neura'

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  const res = await fetch(`${BACKEND_URL}/api/v1/auth/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })

  const json = await res.json()

  if (!res.ok) {
    return NextResponse.json(
      { error: json.message || json.error || 'Email verification failed.' },
      { status: res.status }
    )
  }

  const token = json.token

  const origin = new URL(request.url).origin
  const verificationLink = `${origin}/api/auth/verify-token?token=${encodeURIComponent(token)}`

  await fetch(`${BACKEND_URL}/api/v1/emails/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'motionu-api-key': MOTIONU_API_KEY,
    },
    body: JSON.stringify({
      templateId: EMAIL_TEMPLATE_ID,
      toEmail: email,
      fromEmail: EMAIL_FROM,
      subject: EMAIL_SUBJECT,
      data: { verificationLink, name },
    }),
  })

  return NextResponse.json({ email })
}
