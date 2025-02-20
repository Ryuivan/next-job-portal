import { query } from "@/lib/pg/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/types/User";
import { QueryResult } from "pg";
import { LoginCredentials } from "@/types/LoginCredentials";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const POST = async (req: Request) => {
  try {
    const { email, password }: LoginCredentials = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const user: QueryResult<User> = await query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rowCount === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const userData = user.rows[0];

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        role: userData.role,
      },
      JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: userData.role,
        },
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        message: "Login failed",
      },
      { status: 500 }
    );
  }
};
