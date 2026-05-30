import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/lib/db'
import { signSession, setSessionCookie } from '@/lib/session'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 })
    }

    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ message: 'Incorrect email or password.' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ message: 'Incorrect email or password.' }, { status: 401 })
    }

    const token = await signSession({ sub: user.id, email: user.email, name: user.name })
    await setSessionCookie(token)

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch {
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
