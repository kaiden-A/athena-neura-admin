'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { login } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  onError: (msg: string) => void
}

export default function LoginForm({ onError }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    onError('')

    const result = await login({ email, password })

    if (result.error) {
      onError(result.error)
      setLoading(false)
      return
    }

    localStorage.setItem('athena-token', result.token)
    localStorage.setItem('athena-user', JSON.stringify(result.user))
    document.cookie = `session=${result.token}; path=/; max-age=86400`
    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
          Email
        </label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
          Password
        </label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
