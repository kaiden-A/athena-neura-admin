'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Cpu } from 'lucide-react'
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'
import EmailSentPanel from '@/components/auth/EmailSentPanel'
import { getStoredToken } from '@/lib/api/auth'

type Panel = 'login' | 'signup' | 'email-sent'

export default function LoginPage() {
  const router = useRouter()
  const [panel, setPanel] = useState<Panel>('login')
  const [error, setError] = useState('')
  const [registeredEmail, setRegisteredEmail] = useState('')

  useEffect(() => {
    if (getStoredToken()) {
      router.replace('/dashboard')
    }
  }, [router])

  function handleSignupSuccess(email: string) {
    setRegisteredEmail(email)
    setPanel('email-sent')
    setError('')
  }

  function handleVerified() {
    router.push('/login')
    setPanel('login')
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-white rounded-[16px] p-10 shadow-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-[7px] flex items-center justify-center mb-3">
            <img
              src={'/icon.png'}
              width={"100%"}
              height={"100%"}
            />
          </div>
          <h2 className="text-base font-semibold text-accent">Athena-Neura</h2>
          <p className="text-xs text-muted mt-1">Knowledge Base Explorer</p>
        </div>

        {error && (
          <div className="mb-4 px-3 py-2 bg-[#fef2f2] border border-[#fca5a5] text-red-600 text-xs rounded-lg">
            {error}
          </div>
        )}

        {panel === 'login' && (
          <>
            <LoginForm onError={setError} />
            <p className="text-xs text-center text-muted mt-4">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => {
                  setPanel('signup')
                  setError('')
                }}
                className="text-indigo-600 font-medium hover:underline"
              >
                Request Access
              </button>
            </p>
          </>
        )}

        {panel === 'signup' && (
          <>
            <SignupForm onSuccess={handleSignupSuccess} onError={setError} />
            <p className="text-xs text-center text-muted mt-4">
              Already have an account?{' '}
              <button
                onClick={() => {
                  setPanel('login')
                  setError('')
                }}
                className="text-indigo-600 font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          </>
        )}

        {panel === 'email-sent' && <EmailSentPanel email={registeredEmail} onVerified={handleVerified} />}
      </div>
    </div>
  )
}
