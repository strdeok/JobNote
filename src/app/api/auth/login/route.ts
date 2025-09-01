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

    const nextResponse = NextResponse.json(response);

    console.log(response.headers);

    const authHeader = response.headers.get("Authorization");
    const authRefreshToken = response.headers.get("set-cookie");

    if (authHeader && authRefreshToken) {
      nextResponse.headers.set("Authorization", authHeader);
      nextResponse.headers.set("set-cookie", authRefreshToken);
    }

    return nextResponse;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
