'use client'

import { useState, useCallback } from 'react'
import { getWebAuthnChallenge, verifyWebAuthnAuth } from '@/lib/auth'

type ScanState = 'idle' | 'scanning' | 'success' | 'error'

const ringColors: Record<ScanState, string> = {
  idle:     'rgba(255,255,255,0.25)',
  scanning: 'rgba(0,113,227,0.85)',
  success:  'rgba(52,199,89,0.85)',
  error:    'rgba(255,59,48,0.85)',
}

const iconColors: Record<ScanState, string> = {
  idle:     'rgba(255,255,255,0.8)',
  scanning: '#0071e3',
  success:  '#34c759',
  error:    '#ff3b30',
}

export default function FingerprintButton() {
  const [state, setState] = useState<ScanState>('idle')

  const handlePress = useCallback(async () => {
    if (state === 'scanning') return
    setState('scanning')

    try {
      const options = await getWebAuthnChallenge()
      const { startAuthentication } = await import('@simplewebauthn/browser')
      const assertion = await startAuthentication(options)
      await verifyWebAuthnAuth(assertion)
      setState('success')
    } catch (err) {
      if (err instanceof Error && (err.name === 'NotAllowedError' || err.message.includes('AbortError'))) {
        setState('idle')
      } else {
        setState('error')
        setTimeout(() => setState('idle'), 2000)
      }
    }
  }, [state])

  const color = iconColors[state]
  const ring = ringColors[state]

  return (
    <button
      type="button"
      onClick={handlePress}
      aria-label="Sign in with Touch ID"
      className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full bg-white/[0.06] border border-white/20 transition-all duration-300 ease-out active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      style={{ boxShadow: `0 0 0 2px ${ring}, 0 4px 20px rgba(0,0,0,0.5)`, transition: 'box-shadow 0.3s ease' }}
    >
      {/* Scan pulse ring */}
      {state === 'scanning' && (
        <span
          aria-hidden="true"
          className="absolute inset-[-4px] rounded-full border-2 border-[#0071e3]/60 animate-scan-ring pointer-events-none"
        />
      )}

      {/* Fingerprint SVG */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        style={{ transition: 'all 0.35s ease' }}
      >
        {/* Outermost arc */}
        <path
          d="M8 28 C8 16.95 15.16 8 24 8 C32.84 8 40 16.95 40 28"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Second arc */}
        <path
          d="M12 30 C12 21.16 17.37 14 24 14 C30.63 14 36 21.16 36 30"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Third arc */}
        <path
          d="M16 32 C16 25.37 19.58 20 24 20 C28.42 20 32 25.37 32 32"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Fourth arc */}
        <path
          d="M20 33 C20 29.13 21.79 26 24 26 C26.21 26 28 29.13 28 33"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Core dot */}
        <circle cx="24" cy="24" r="2.5" fill={color} opacity="0.9" />
        {/* Vertical center line connecting core downward */}
        <line x1="24" y1="26.5" x2="24" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  )
}
