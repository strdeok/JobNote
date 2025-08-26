import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const requestPath = request.nextUrl.pathname;

  const protectedPaths = !["/login", "/signup"].some((path) =>
    requestPath.startsWith(path)
  );

  if (protectedPaths) {
    if (!accessToken) {
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
            const newAccessTokenCookie = response.headers.get("Set-Cookie");

            if (newAccessTokenCookie) {
              const nextResponse = NextResponse.next();
              nextResponse.headers.set("Set-Cookie", newAccessTokenCookie);

              return nextResponse;
            }
          }
          return redirectToLogin(request);
        } catch (error) {
          return redirectToLogin(request);
        }
      }
      return redirectToLogin(request);
    }
  }

  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  const response = NextResponse.redirect(url);
  return response;
}

// 미들웨어가 실행될 경로를 지정합니다.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
