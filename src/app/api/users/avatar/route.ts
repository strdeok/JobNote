import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/avatar`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader || "",
        },
        body: JSON.stringify({ avatarUrl: body.avatarUrl }),
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
