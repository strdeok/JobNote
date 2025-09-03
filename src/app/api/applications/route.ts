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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/application-forms`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
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
