import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const applicationForm = await request.json();
    const token = request.headers.get("authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/application-forms`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify(applicationForm),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const responseBody = await response.json();
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization");
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");

    // URL을 동적으로 구성
    const apiUrl = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/application-forms`
    );
    if (page) apiUrl.searchParams.append("page", page);

    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const responseBody = await response.json();
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
