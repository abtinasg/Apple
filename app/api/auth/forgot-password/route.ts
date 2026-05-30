import { NextResponse } from 'next/server'
import { getUserByEmail, updateUser } from '@/lib/db'

// No email service in this local app: we generate a reset token and return a
// reset link directly so you can complete the flow yourself.
export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 })
    }

    const user = await getUserByEmail(email)

    // Always respond success-ish to avoid leaking which emails exist.
    if (!user) {
      return NextResponse.json({ ok: true, resetUrl: null })
    }

    const token = crypto.randomUUID().replace(/-/g, '')
    const expiry = Date.now() + 1000 * 60 * 30 // 30 minutes
    await updateUser(user.id, { resetToken: token, resetTokenExpiry: expiry })

    const resetUrl = `/reset-password?token=${token}&email=${encodeURIComponent(user.email)}`
    return NextResponse.json({ ok: true, resetUrl })
  } catch {
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
