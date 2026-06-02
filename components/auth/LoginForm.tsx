'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useLogin } from '@/lib/mutations'

interface LoginFormProps {
  onError: (msg: string) => void
}

export default function LoginForm({ onError }: LoginFormProps) {
  const router = useRouter()
  const login = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onError('')

    login.mutate(
      { email, password },
      {
        onSuccess: () => router.push('/dashboard'),
        onError: (err) => onError(err.message),
      }
    )
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
      <Button type="submit" className="w-full" disabled={login.isPending}>
        {login.isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
