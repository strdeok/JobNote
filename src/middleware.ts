import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");

  const { pathname } = request.nextUrl;

  // 로그인이 필요한 보호된 페이지
  const protectedPaths = ["/dashboard", "/mypage"];

  // accessToken이 없는 경우
  if (
    !accessToken &&
    protectedPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 로그인한 사용자가 로그인/회원가입 페이지에 접근
  if (
    accessToken &&
    (pathname.startsWith("/login") || pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 위 조건에 해당하지 않으면 요청을 통과
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
