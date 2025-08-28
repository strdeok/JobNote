import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { title, fileName, fileKey, fileType, fileSize } = await request.json();
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/documents/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${accessToken}`,
        },
        body: JSON.stringify({
          title,
          fileName,
          fileKey,
          fileType,
          fileSize,
        }),
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
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
