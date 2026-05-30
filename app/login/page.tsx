import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% -10%, #1a1a3e 0%, #0d0d1a 40%, #0a0a0a 70%)',
        }}
      />

      {/* Ambient orbs */}
      <div
        className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0071e3 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #5e5ce6 0%, transparent 70%)' }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-[400px] px-4">
        <LoginForm />
      </div>
    </main>
  )
}
