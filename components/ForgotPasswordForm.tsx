'use client'

import { useState } from 'react'
import Link from 'next/link'
import AbtinLogo from './AbtinLogo'
import { requestPasswordReset } from '@/lib/auth'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resetUrl, setResetUrl] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await requestPasswordReset(email)
      setSubmitted(true)
      setResetUrl(res.resetUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-slide-up w-full max-w-[380px] mx-auto px-4">
      <div className="glass-card rounded-2xl px-8 pt-10 pb-9 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <AbtinLogo size={52} />
          <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-white/95">Reset Password</h1>
          <p className="text-[13px] text-apple-gray text-center">
            Enter your Abtin ID email and we&apos;ll create a reset link.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              className="apple-input"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            {error && <p className="text-[12px] text-red-400/90 text-center px-1">{error}</p>}
            <button type="submit" disabled={!email || loading} className="apple-btn-primary mt-1">
              {loading ? 'Sending…' : 'Continue'}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-3 text-center">
            <p className="text-[13px] text-white/80">
              If an account exists for <span className="text-white">{email}</span>, a reset link has been created.
            </p>
            {resetUrl ? (
              <Link
                href={resetUrl}
                className="apple-btn-primary flex items-center justify-center mt-1"
              >
                Open reset link
              </Link>
            ) : (
              <p className="text-[12px] text-apple-gray">
                Check your account — no further action is shown for security.
              </p>
            )}
            <p className="text-[11px] text-white/30">
              (This local app has no email service, so the link is shown directly.)
            </p>
          </div>
        )}

        <p className="text-center text-[12px] text-apple-gray">
          <Link href="/login" className="text-apple-blue hover:underline underline-offset-2">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
