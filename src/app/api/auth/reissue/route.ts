// app/api/login/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    // 1. 로그 요청
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

    const setCookieHeader = response.headers.get("set-cookie");
    console.log(setCookieHeader);

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
