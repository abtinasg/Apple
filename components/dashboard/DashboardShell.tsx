'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import AbtinLogo from '../AbtinLogo'
import { logout } from '@/lib/auth'

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardShell({
  name,
  email,
  children,
}: {
  name: string
  email: string
  children: React.ReactNode
}) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [now, setNow] = useState<Date | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push('/login')
    router.refresh()
  }

  const firstName = name.split(' ')[0]
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const dateStr = now
    ? now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
    : ''

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse at 50% -10%, #1a1a3e 0%, #0d0d1a 45%, #070709 80%)' }}
      />
      <div
        className="fixed top-[-15%] right-[-5%] w-[700px] h-[700px] rounded-full opacity-[0.05] blur-3xl -z-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0071e3 0%, transparent 70%)' }}
      />
      <div
        className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl -z-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #5e5ce6 0%, transparent 70%)' }}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-40 px-5 sm:px-8 py-3.5 flex items-center justify-between backdrop-blur-xl bg-black/30 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <AbtinLogo size={34} withWordmark />
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2.5 rounded-full pl-1 pr-3 py-1 hover:bg-white/[0.06] transition-colors"
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full text-[12px] font-semibold text-white"
              style={{ background: 'linear-gradient(145deg, #2997ff, #5e5ce6)' }}
            >
              {initials}
            </span>
            <span className="hidden sm:block text-[13px] text-white/85">{firstName}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-60 glass-card rounded-2xl p-2 animate-fade-slide-up">
              <div className="px-3 py-2.5">
                <p className="text-[14px] font-medium text-white/95">{name}</p>
                <p className="text-[12px] text-apple-gray truncate">{email}</p>
              </div>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2.5 rounded-xl text-[13px] text-red-400 hover:bg-white/[0.06] transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Greeting */}
      <div className="px-5 sm:px-8 pt-7 pb-2 max-w-[1400px] mx-auto w-full">
        <p className="text-[13px] text-apple-gray">{dateStr}</p>
        <h1 className="text-[30px] sm:text-[34px] font-bold tracking-tight text-white/95 mt-0.5">
          {greeting()}, {firstName}
        </h1>
      </div>

      {/* Widget grid */}
      <div className="px-5 sm:px-8 pb-16 max-w-[1400px] mx-auto w-full">{children}</div>
    </div>
  )
}
