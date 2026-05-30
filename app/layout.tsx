import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abtin',
  description: 'Sign in to your Abtin ID',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] antialiased">{children}</body>
    </html>
  )
}
