import type { PublicKeyCredentialRequestOptionsJSON, AuthenticationResponseJSON } from '@simplewebauthn/types'

export interface AuthUser {
  id: string
  name: string
  email: string
}

async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error((data as { message?: string }).message ?? `Request failed (${res.status})`)
  }
  return data as T
}

export function login(email: string, password: string) {
  return postJSON<{ user: AuthUser }>('/api/auth/login', { email, password })
}

export function register(name: string, email: string, password: string) {
  return postJSON<{ user: AuthUser }>('/api/auth/register', { name, email, password })
}

export function requestPasswordReset(email: string) {
  return postJSON<{ ok: boolean; resetUrl: string | null }>('/api/auth/forgot-password', { email })
}

export function resetPassword(email: string, token: string, password: string) {
  return postJSON<{ ok: boolean }>('/api/auth/reset-password', { email, token, password })
}

export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' })
}

// ---- WebAuthn / Touch ID (graceful — backend enrollment optional) ----
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? ''

export async function getWebAuthnChallenge(): Promise<PublicKeyCredentialRequestOptionsJSON> {
  const res = await fetch(`${API_BASE}/auth/webauthn/challenge`, { credentials: 'include' })
  if (!res.ok) throw new Error(`Touch ID is not set up yet (${res.status})`)
  return res.json() as Promise<PublicKeyCredentialRequestOptionsJSON>
}

export async function verifyWebAuthnAuth(assertion: AuthenticationResponseJSON): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/webauthn/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assertion),
    credentials: 'include',
  })
  if (!res.ok) throw new Error(`Biometric verification failed (${res.status})`)
}
