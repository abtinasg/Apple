'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AbtinLogo from './AbtinLogo'
import { register } from '@/lib/auth'

export default function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      await register(name, email, password)
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create account.')
      setLoading(false)
    }
  }

  const canSubmit = name && email && password && confirm && !loading

  return (
    <div className="animate-fade-slide-up w-full max-w-[380px] mx-auto px-4">
      <div className="glass-card rounded-2xl px-8 pt-10 pb-9 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <AbtinLogo size={52} />
          <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-white/95">Create Abtin ID</h1>
          <p className="text-[13px] text-apple-gray text-center">One account for everything in your control center</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="apple-input"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
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
          <input
            className="apple-input"
            type="password"
            autoComplete="new-password"
            placeholder="Password (8+ characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <input
            className="apple-input"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            disabled={loading}
          />

          {error && <p className="text-[12px] text-red-400/90 text-center px-1">{error}</p>}

          <button type="submit" disabled={!canSubmit} className="apple-btn-primary mt-1">
            {loading ? 'Creating…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-[12px] text-apple-gray">
          Already have an Abtin ID?{' '}
          <Link href="/login" className="text-apple-blue hover:underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
