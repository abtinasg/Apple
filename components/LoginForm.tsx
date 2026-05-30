'use client'

import { useState } from 'react'
import FingerprintButton from './FingerprintButton'
import { loginWithPassword } from '@/lib/auth'

type SubmitState = 'idle' | 'loading' | 'error'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('loading')
    setError(null)

    try {
      await loginWithPassword(email, password)
      setSubmitState('idle')
      // TODO: redirect('/dashboard')
    } catch (err) {
      setSubmitState('error')
      setError(err instanceof Error ? err.message : 'Sign in failed. Please try again.')
    }
  }

  const isLoading = submitState === 'loading'
  const canSubmit = email.length > 0 && password.length > 0 && !isLoading

  return (
    <div className="animate-fade-slide-up w-full max-w-[380px] mx-auto px-4">
      {/* Glass card */}
      <div className="glass-card rounded-2xl px-8 pt-10 pb-9 flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <AppleLogo />
          <h1 className="mt-2 text-[28px] font-semibold tracking-tight text-white/95">
            Sign In
          </h1>
          <p className="text-[13px] text-apple-gray text-center">
            Use your Apple Account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="apple-input"
            type="email"
            autoComplete="email"
            placeholder="Apple Account or Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            className="apple-input"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          {error && (
            <p className="text-[12px] text-red-400/90 text-center px-1 animate-fade-slide-up">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="apple-btn-primary mt-1"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <SpinnerIcon />
                Signing In…
              </span>
            ) : (
              'Continue'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] text-apple-gray tracking-widest uppercase">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Touch ID */}
        <div className="flex flex-col items-center gap-2.5">
          <FingerprintButton />
          <span className="text-[12px] text-apple-gray">Touch ID</span>
        </div>

        {/* Footer links */}
        <div className="flex items-center justify-center gap-4 text-[12px]">
          <button type="button" className="text-apple-blue hover:underline underline-offset-2 focus:outline-none">
            Forgot password?
          </button>
          <span className="text-white/15">|</span>
          <button type="button" className="text-apple-blue hover:underline underline-offset-2 focus:outline-none">
            Create Account
          </button>
        </div>
      </div>

      {/* Below-card note */}
      <p className="mt-5 text-center text-[11px] text-white/25 leading-relaxed">
        Your Apple Account is used to access all Apple services.
      </p>
    </div>
  )
}

function AppleLogo() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 814 1000"
      fill="white"
      aria-label="Apple"
      className="drop-shadow-sm"
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-43.4-150.3-109.2C67.3 714 0 610.7 0 512.3 0 348.2 105.1 255.5 208.4 255.5c67.9 0 124.7 44.1 167.3 44.1 40.9 0 105.3-46.7 178.6-46.7 28.8 0 130.9 2.6 198.3 99zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
    </svg>
  )
}
