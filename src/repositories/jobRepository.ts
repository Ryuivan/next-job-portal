"use server";

import { query } from "@/lib/pg/db";
import { Job } from "@/types/Job";
import { User } from "@/types/User";
import { QueryResult } from "pg";

export const getJobsFromTable = async () => {
  try {
    const result: QueryResult<Job> = await query(
      `SELECT id, user_id AS "userId", title, description, location, salary, category, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM jobs 
       ORDER BY updated_at DESC`
    );

    return result.rows;
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    throw new Error("Failed to fetch jobs");
  }
};

export const getJobByIdFromTable = async (id: string): Promise<Job> => {
  try {
    const result: QueryResult<Job> = await query(
      `SELECT id, user_id AS "userId", title, description, location, salary, category, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM jobs
       WHERE id = $1`,
      [id]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Failed to fetch job:", err);
    throw new Error("Failed to fetch job");
  }
};

export const getJobByIdAndUserIdFromTable = async (
  jobId: string,
  userId: string
): Promise<Job> => {
  try {
    const result: QueryResult<Job> = await query(
      `SELECT id, user_id AS "userId", title, description, location, salary, category, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM jobs
       WHERE id = $1 AND user_id = $2`,
      [jobId, userId]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Failed to fetch job:", err);
    throw new Error("Failed to fetch job");
  }
};

export const getJobsAndUserFromTable = async (): Promise<
  (Omit<Job, "userId"> & Pick<User, "firstName" | "lastName">)[]
> => {
  try {
    const result: QueryResult<
      Omit<Job, "userId"> & Pick<User, "firstName" | "lastName">
    > = await query(
      `SELECT 
        jobs.id,
        jobs.user_id AS "userId",
        users.first_name AS "firstName",
        users.last_name AS "lastName",
        jobs.title,
        jobs.description,
        jobs.location,
        jobs.salary,
        jobs.category,
        jobs.created_at AS "createdAt",
        jobs.updated_at AS "updatedAt"
      FROM jobs
      JOIN users ON jobs.user_id = users.id
      ORDER BY jobs.updated_at DESC;`
    );

    return result.rows;
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    throw new Error("Failed to fetch jobs");
  }
};

export const getJobAndUserByIdFromTable = async (
  id: string
): Promise<Omit<Job, "userId"> & Pick<User, "firstName" | "lastName">> => {
  try {
    const result: QueryResult<
      Omit<Job, "userId"> & Pick<User, "firstName" | "lastName">
    > = await query(
      `SELECT 
        jobs.id,
        jobs.user_id AS "userId",
        users.first_name AS "firstName",
        users.last_name AS "lastName",
        jobs.title,
        jobs.description,
        jobs.location,
        jobs.category,
        jobs.salary,
        jobs.created_at AS "createdAt",
        jobs.updated_at AS "updatedAt"
      FROM jobs
      JOIN users ON jobs.user_id = users.id
      WHERE jobs.id = $1`,
      [id]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Failed to fetch job:", err);
    throw new Error("Failed to fetch job");
  }
};

export const getJobsByUserIdFromTable = async (
  userId: string
): Promise<Job[]> => {
  try {
    const result: QueryResult<Job> = await query(
      `SELECT id, user_id AS "userId", title, description, location, salary, category, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM jobs 
       WHERE user_id = $1
       ORDER BY updated_at DESC`,
      [userId]
    );

    return result.rows;
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    throw new Error("Failed to fetch jobs");
  }
};

export const getMyJobPostsFromTable = async (id: string) => {
  try {
    const result: QueryResult<Job> = await query(
      `SELECT id, user_id AS "userId", title, description, location, salary, category, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM jobs 
       WHERE user_id = $1`,
      [id]
    );

    return result.rows;
  } catch (err) {
    console.error("Failed to fetch job:", err);
    throw new Error("Failed to fetch job");
  }
};

export const insertJobToTable = async (job: Partial<Job>): Promise<Job> => {
  const { userId, title, description, location, salary, category } = job;

  if (!userId || !title || !description || !category) {
    throw new Error("Missing required fields");
  }

  try {
    const result = await query(
      `INSERT INTO jobs (user_id, title, description, location, salary, category)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, title, description, location ?? null, salary ?? null, category]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Failed to insert job:", err);
    throw new Error("Failed to insert job");
  }
};

export const updateJobInTable = async (job: Job): Promise<Job> => {
  const {
    id,
    userId,
    title,
    description,
    location,
    salary,
    category,
    updatedAt,
  } = job;

  try {
    const result: QueryResult<Job> = await query(
      `UPDATE jobs SET 
      title = $1, 
      description = $2, 
      location = $3, 
      salary = $4, 
      category = $5,
      updated_at = $6
      WHERE id = $7
      AND user_id = $8
      RETURNING *
      `,
      [title, description, location, salary, category, updatedAt, id, userId]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Failed to update job:", err);
    throw new Error("Failed to update job");
  }
};

export const deleteJobFromTable = async (id: string, userId: string) => {
  try {
    await query(
      `DELETE FROM jobs 
       WHERE id = $1
       AND user_id = $2`,
      [id, userId]
    );
  } catch (err) {
    console.error("Failed to delete job:", err);
    throw new Error("Failed to delete job");
  }
};
