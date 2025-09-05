// strdeok/jobnote/JobNote-master/src/app/api/v1/users/reissue/route.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token not found in Next.js server" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/reissue`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refresh_token=${refreshToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    // 백엔드 응답에서 access_token과 set-cookie 헤더 추출
    const accessToken = response.headers.get("Authorization");
    const setCookieHeader = response.headers.get("Set-Cookie");

    const responseBody = await response.json();
    const nextResponse = NextResponse.json(responseBody);

    // 클라이언트(브라우저)로 보낼 응답에 헤더들을 설정
    if (accessToken) {
      nextResponse.headers.set("Authorization", accessToken);
    }
    if (setCookieHeader) {
      nextResponse.headers.set("Set-Cookie", setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error("Reissue proxy error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred during reissue." },
      { status: 500 }
    );
  }
}
