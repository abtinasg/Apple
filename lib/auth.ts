import type { PublicKeyCredentialRequestOptionsJSON, AuthenticationResponseJSON } from '@simplewebauthn/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export async function loginWithPassword(email: string, password: string): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { message?: string }).message ?? `Sign in failed (${res.status})`)
  }
}

export async function getWebAuthnChallenge(): Promise<PublicKeyCredentialRequestOptionsJSON> {
  const res = await fetch(`${API_BASE}/auth/webauthn/challenge`, {
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error(`Could not start biometric auth (${res.status})`)
  }

  return res.json() as Promise<PublicKeyCredentialRequestOptionsJSON>
}

export async function verifyWebAuthnAuth(assertion: AuthenticationResponseJSON): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/webauthn/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assertion),
    credentials: 'include',
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { message?: string }).message ?? `Biometric verification failed (${res.status})`)
  }
}
