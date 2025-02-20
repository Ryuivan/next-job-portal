import { query } from "@/lib/pg/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const checkDuplicateEmail = async (email: string) => {
  const checkEmail = await query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  if (checkEmail.rowCount !== null && checkEmail.rowCount > 0) {
    return true;
  }

  return false;
};

export const POST = async (req: Request) => {
  try {
    const { firstName, lastName, email, password, role } = await req.json();

    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const duplicateEmail = await checkDuplicateEmail(email);

    if (duplicateEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await query(
      "INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5)",
      [firstName, lastName || null, email, hashedPassword, role]
    );

    return NextResponse.json(
      {
        message: "User registered successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "User registration failed",
      },
      { status: 500 }
    );
  }
};
