export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  name: string
  email: string
  password: string
}

export async function login(data: LoginPayload) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function signup(data: SignupPayload) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('athena-user')
  return raw ? JSON.parse(raw) : null
}

export function getStoredToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('athena-token')
}

export function clearSession() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('athena-token')
  localStorage.removeItem('athena-user')
  document.cookie = 'session=; path=/; max-age=0'
}
