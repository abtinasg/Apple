'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import FingerprintButton from './FingerprintButton'
import AbtinLogo from './AbtinLogo'
import { login } from '@/lib/auth'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(email, password)
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed. Please try again.')
      setLoading(false)
    }
  }

  const canSubmit = email.length > 0 && password.length > 0 && !loading

  return (
    <div className="animate-fade-slide-up w-full max-w-[380px] mx-auto px-4">
      <div className="glass-card rounded-2xl px-8 pt-10 pb-9 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <AbtinLogo size={52} />
          <h1 className="mt-1 text-[28px] font-semibold tracking-tight text-white/95">Sign In</h1>
          <p className="text-[13px] text-apple-gray text-center">Use your Abtin ID</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="apple-input"
            type="email"
            autoComplete="email"
            placeholder="Abtin ID (email)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            className="apple-input"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          {error && (
            <p className="text-[12px] text-red-400/90 text-center px-1 animate-fade-slide-up">{error}</p>
          )}

          <button type="submit" disabled={!canSubmit} className="apple-btn-primary mt-1">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <SpinnerIcon />
                Signing In…
              </span>
            ) : (
              'Continue'
            )}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] text-apple-gray tracking-widest uppercase">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <FingerprintButton />
          <span className="text-[12px] text-apple-gray">Touch ID</span>
        </div>

        <div className="flex items-center justify-center gap-4 text-[12px]">
          <Link href="/forgot-password" className="text-apple-blue hover:underline underline-offset-2">
            Forgot password?
          </Link>
          <span className="text-white/15">|</span>
          <Link href="/register" className="text-apple-blue hover:underline underline-offset-2">
            Create Abtin ID
          </Link>
        </div>
      </div>

      <p className="mt-5 text-center text-[11px] text-white/25 leading-relaxed">
        Your Abtin ID gives you access to mail, budget, diet and everything in your control center.
      </p>
    </div>
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
