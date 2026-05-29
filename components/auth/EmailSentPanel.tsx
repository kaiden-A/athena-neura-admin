'use client'

import { Mail } from 'lucide-react'
import Button from '@/components/ui/Button'

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
        <h3 className="text-sm font-semibold text-accent mb-1">Verify your email</h3>
        <p className="text-xs text-muted">
          We sent a verification email to:
        </p>
        <p className="text-sm font-medium text-accent mt-1">{email}</p>
      </div>

      <div className="border border-border rounded-xl p-4 bg-[#f9f9f8]">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
          Mock Email Preview
        </div>
        <div className="bg-white border border-border rounded-lg p-3 text-xs space-y-2">
          <p className="font-medium text-accent">Welcome to Athena-Neura</p>
          <p className="text-muted">
            Click the link below to verify your email address and activate your account.
          </p>
          <button
            onClick={onVerified}
            className="inline-block text-indigo-600 font-medium hover:underline"
          >
            Verify my email &rarr;
          </button>
        </div>
      </div>

      <p className="text-[11px] text-subtle text-center">
        Didn&apos;t receive the email? Check your spam folder or{' '}
        <button className="text-indigo-600 hover:underline">resend</button>.
      </p>

      <Button variant="ghost" className="w-full" onClick={onVerified}>
        Skip (mock verification)
      </Button>
    </div>
  )
}
