// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. 로그인 요청
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    // 2. 백엔드 응답에서 'Set-Cookie' 헤더 추출
    const setCookieHeader = response.headers.get("set-cookie");

    if (!setCookieHeader) {
      throw new Error("Set-Cookie header not found in backend response.");
    }

    const responseBody = await response.json();

    const nextResponse = NextResponse.json(responseBody);
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
