import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createUser, getUserByEmail } from '@/lib/db'
import { signSession, setSessionCookie } from '@/lib/session'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email and password are required.' }, { status: 400 })
    }
    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ message: 'Password must be at least 8 characters.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 })
    }

    const existing = await getUserByEmail(email)
    if (existing) {
      return NextResponse.json({ message: 'An account with this email already exists.' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await createUser({ name: name.trim(), email, passwordHash })

    const token = await signSession({ sub: user.id, email: user.email, name: user.name })
    await setSessionCookie(token)

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch {
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
