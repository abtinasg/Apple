import { Suspense } from 'react'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import AuthBackground from '@/components/AuthBackground'

export default function ResetPasswordPage() {
  return (
    <AuthBackground>
      <Suspense fallback={<div className="text-center text-apple-gray text-sm">Loading…</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthBackground>
  )
}
