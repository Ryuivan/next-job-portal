"use server";

import { query } from "@/lib/pg/db";
import { User } from "@/types/User";
import { QueryResult } from "pg";

export const getUserByIdFromTable = async (
  id: string
): Promise<User | null> => {
  const result: QueryResult<User> = await query(
    "SELECT id, first_name, last_name, email, role, created_at, updated_at FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

export const getUserByEmailFromTable = async (
  email: string
): Promise<User | null> => {
  try {
    console.log("🔍 Mencari user di database dengan email:", email);
    const result: QueryResult<User> = await query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    return result?.rowCount && result.rowCount > 0 ? result.rows[0] : null;
  } catch (error: any) {
    throw error;
  }
};

export const insertUserToTable = async (user: Partial<User>): Promise<User> => {
  try {
    const result: QueryResult<User> = await query(
      `INSERT INTO users (first_name, last_name, email, password, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user.firstName, user.lastName, user.email, user.password, user.role]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Failed to insert user:", err);
    throw new Error("Failed to insert user");
  }
};
