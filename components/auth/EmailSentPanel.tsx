'use client'

import { Mail } from 'lucide-react'

interface EmailSentPanelProps {
  email: string
  onVerified: () => void
}

export default function EmailSentPanel({ email, onVerified }: EmailSentPanelProps) {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="w-12 h-12 bg-[#eef2ff] rounded-full flex items-center justify-center mx-auto mb-3">
          <Mail size={22} className="text-indigo-600" />
        </div>
        <h3 className="text-sm font-semibold text-accent mb-1">Check your email</h3>
        <p className="text-xs text-muted">
          We sent a verification link to:
        </p>
        <p className="text-sm font-medium text-accent mt-1">{email}</p>
      </div>

      <div className="bg-[#f9f9f8] border border-border rounded-xl p-4 text-center">
        <p className="text-xs text-muted">
          Click the link in the email to verify your account and get started.
        </p>
      </div>

      <p className="text-[11px] text-subtle text-center">
        Didn&apos;t receive the email? Check your spam folder or{' '}
        <button className="text-indigo-600 hover:underline">resend</button>.
      </p>
    </div>
  )
}
