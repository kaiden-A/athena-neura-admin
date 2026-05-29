'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { signup } from '@/lib/api/auth'

interface SignupFormProps {
  onSuccess: (email: string) => void
  onError: (msg: string) => void
}

export default function SignupForm({ onSuccess, onError }: SignupFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    onError('')

    const result = await signup({ name, email, password })

    if (result.error) {
      onError(result.error)
      setLoading(false)
      return
    }

    onSuccess(result.email)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
          Full Name
        </label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          required
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted mb-1.5">
          Work Email
        </label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@company.com"
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
          placeholder="Create a password"
          required
          minLength={6}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating account...' : 'Request Access'}
      </Button>
    </form>
  )
}
