import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "@/lib/auth-options";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  return NextResponse.json({ authenticated: !!session });
}
