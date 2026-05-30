import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? 'abtin-id-dev-secret-change-me-in-production'
)
const SESSION_COOKIE = 'abtin_session'

async function isValid(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    await jwtVerify(token, SECRET)
    return true
  } catch {
    return false
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  const valid = await isValid(token)
  const { pathname } = req.nextUrl

  // Protect dashboard
  if (pathname.startsWith('/dashboard') && !valid) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Keep authed users out of auth pages
  if (valid && ['/login', '/register'].includes(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
