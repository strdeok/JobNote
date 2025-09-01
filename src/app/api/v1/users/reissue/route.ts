
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token not found" },
        { status: 401 }
      );
    }

    // 2. refresh_token → Authorization 헤더로 전달
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

    // 3. 백엔드 응답에서 access_token 추출 (Authorization 헤더)
    const accessToken = response.headers.get("authorization");
    if (!accessToken) {
      throw new Error("Authorization header not found in backend response.");
    }

    // 4. 백엔드 응답에서 refresh_token 쿠키 추출
    const setCookieHeader = response.headers.get("set-cookie");
    if (!setCookieHeader) {
      throw new Error("Set-Cookie header not found in backend response.");
    }

    // 5. 백엔드 응답 바디
    const responseBody = await response.json();

    // 6. Next.js 응답 구성
    const nextResponse = NextResponse.json(responseBody);
    // 새 access_token → 프론트에서 zustand 같은 전역상태에 저장
    nextResponse.headers.set("authorization", accessToken);
    // 새 refresh_token → 브라우저 쿠키에 반영
    nextResponse.headers.set("Set-Cookie", setCookieHeader);

    return nextResponse;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
