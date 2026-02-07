// import { NextResponse } from 'next/server'
// import { TOKEN_KEY } from '@/config/token_key'

// export function middleware(request) {
//   const token = request.cookies.get(TOKEN_KEY)?.value
//   const { pathname } = request.nextUrl

//   // ถ้าเข้าหน้า login แต่มี token แล้ว -> redirect ไป admin
//   if (pathname === '/login' && token) {
//     return NextResponse.redirect(new URL('/admin', request.url))
//   }

//   // ถ้าเข้าหน้า admin แต่ไม่มี token -> redirect ไป login
//   if (pathname.startsWith('/admin') && !token) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
  
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/admin/:path*', '/login']
// }


import {NextResponse} from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import {TOKEN_KEY} from '@/config/token_key';

// ตั้งค่า next-intl middleware (ส่วนหน้าบ้าน)
const intlMiddleware = createIntlMiddleware({
  locales: ['th', 'en', 'mm'],
  defaultLocale: 'th'
});

export function middleware(request) {
  const token = request.cookies.get(TOKEN_KEY)?.value;
  const {pathname} = request.nextUrl;

  // ---------- 1) โซนหลังบ้าน: ไม่ต้องแปล ----------
  // login: มี token แล้ว -> ไป admin
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // admin: ไม่มี token -> ไป login
  if (pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ถ้าเป็น /admin หรือ /login ให้ผ่านไปเลย (ไม่เข้า next-intl)
  if (pathname.startsWith('/admin') || pathname === '/login') {
    return NextResponse.next();
  }

  // ---------- 2) โซนหน้าบ้าน: ใช้หลายภาษา ----------
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // ให้ middleware ทำงานกับทุกหน้า "ยกเว้น" api, _next, ไฟล์ static, admin, login
    '/((?!api|_next|.*\\..*|admin|login).*)',

    // แต่ยังให้ middleware ทำงานกับ admin/login เพื่อเช็ค token ได้
    '/admin/:path*',
    '/login'
  ]
};


