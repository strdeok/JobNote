import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const requestPath = request.nextUrl.pathname;

  // 보호되지 않는 경로들
  const publicPaths = ["/login", "/signup", "/join"];
  const isPublicPath = publicPaths.some((path) => requestPath.startsWith(path));

  // 공개 경로면 그대로 통과
  if (isPublicPath) {
    return NextResponse.next();
  }

  // 보호된 경로에서 accessToken이 없는 경우
  if (!accessToken) {
    // refreshToken이 있다면 토큰 재발급 시도
    if (refreshToken) {
      try {
        const reissueUrl = `${process.env
          .NEXT_PUBLIC_API_URL!}/api/v1/users/reissue`;

        const response = await fetch(reissueUrl, {
          method: "POST",
          headers: {
            Cookie: `refresh_token=${refreshToken}`,
          },
        });

        if (response.ok) {
          // 새로운 토큰을 쿠키에서 추출
          const setCookieHeader = response.headers.get("Set-Cookie");

          if (setCookieHeader) {
            const nextResponse = NextResponse.next();

            // Set-Cookie 헤더를 그대로 전달
            nextResponse.headers.set("Set-Cookie", setCookieHeader);

            // 또는 쿠키를 직접 설정 (더 안전한 방법)
            const accessTokenMatch =
              setCookieHeader.match(/access_token=([^;]+)/);
            if (accessTokenMatch) {
              nextResponse.cookies.set("access_token", accessTokenMatch[1], {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
              });
            }

            return nextResponse;
          }
        }

        // 토큰 재발급 실패시 로그인 페이지로
        return redirectToLogin(request);
      } catch (error) {
        console.error("Token reissue error:", error);
        return redirectToLogin(request);
      }
    }

    // refreshToken도 없으면 로그인 페이지로
    return redirectToLogin(request);
  }

  // accessToken이 있으면 그대로 진행
  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";

  // 현재 URL을 redirect 파라미터로 저장 (선택사항)
  if (request.nextUrl.pathname !== "/") {
    url.searchParams.set("redirect", request.nextUrl.pathname);
  }

  const response = NextResponse.redirect(url);

  // 만료된 토큰들 제거
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
