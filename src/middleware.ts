import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeJWT(token: string) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
  } catch (e) {
    console.error("JWT decode error:", e);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;

  const { pathname } = request.nextUrl;

  if (accessToken) {
    const decoded = decodeJWT(accessToken);

    if (decoded?.exp) {
      const now = Math.floor(Date.now() / 1000);

      console.log(now >= decoded.exp);

      // 만료 시 /api/auth/reissue로 리다이렉트
      if (now >= decoded.exp) {
        console.log("⚠️ Access Token 만료됨 → /api/auth/reissue로 이동");
        return NextResponse.redirect(new URL("/api/auth/reissue", request.url));
      }
    }
  }

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
