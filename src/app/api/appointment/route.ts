import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.name || !body?.phone) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  return NextResponse.json({ success: true });
}