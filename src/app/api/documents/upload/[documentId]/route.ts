import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  const { documentId } = params;
  const body = await req.json();
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/documents/upload/${documentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${accessToken}`,
        },
        body: JSON.stringify(body),
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
