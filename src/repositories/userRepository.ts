import { query } from "@/lib/pg/db";

export const getUserById = async (id: string) => {
  const result = await query(
    "SELECT id, first_name, last_name, email, role, created_at, updated_at FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0];
};
