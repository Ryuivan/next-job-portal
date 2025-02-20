import { NextRequest, NextResponse } from "next/server";
import { getUserProfile } from "@/services/authService";

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: Missing Token" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = await getUserProfile(token);
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
};
