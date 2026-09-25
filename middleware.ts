import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    return NextResponse.next()
  }

  const auth = request.headers.get('authorization')
  if (auth?.startsWith('Basic ')) {
    const decoded = Buffer.from(auth.slice('Basic '.length), 'base64').toString()
    const [user, pass] = decoded.split(':')
    if (user === 'admin' && pass === password) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Autenticación requerida', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Work Services Admin"' },
  })
}

export const config = {
  matcher: ['/admin/:path*'],
}