import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getUserByEmail, updateUser } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { email, token, password } = await req.json()

    if (!email || !token || !password) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 })
    }
    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ message: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    const user = await getUserByEmail(email)
    if (!user || !user.resetToken || user.resetToken !== token) {
      return NextResponse.json({ message: 'Invalid or expired reset link.' }, { status: 400 })
    }
    if (!user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
      return NextResponse.json({ message: 'This reset link has expired.' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    await updateUser(user.id, { passwordHash, resetToken: undefined, resetTokenExpiry: undefined })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
