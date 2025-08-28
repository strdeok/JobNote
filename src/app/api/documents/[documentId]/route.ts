import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { documentId: string } }) {
  const { documentId } = params;
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/documents/${documentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${accessToken}`,
        },
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

export async function DELETE({ params }: { params: { documentId: string } }) {
  const { documentId } = params;

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
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/documents/${documentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${accessToken}`,
        },
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
