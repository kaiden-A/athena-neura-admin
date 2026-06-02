'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useSignup } from '@/lib/mutations'

interface SignupFormProps {
  onSuccess: (email: string) => void
  onError: (msg: string) => void
}

export default function SignupForm({ onSuccess, onError }: SignupFormProps) {
  const signup = useSignup()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onError('')

    signup.mutate(
      { name, email, password },
      {
        onSuccess: (data) => onSuccess(data.email),
        onError: (err) => onError(err.message),
      }
    )
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
      <Button type="submit" className="w-full" disabled={signup.isPending}>
        {signup.isPending ? 'Creating account...' : 'Request Access'}
      </Button>
    </form>
  )
}
