import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const body = await request.json();

    console.log(body.nickname);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/nickname`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader || "",
        },
        body: JSON.stringify({ nickname: body.nickname }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: `An unexpected error occurred. ${error}` },
      { status: 500 }
    );
  }
}
