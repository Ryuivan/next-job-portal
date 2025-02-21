"use server";

import {
  getJobsAndUserFromTable,
  getJobsByUserIdFromTable,
  insertJobToTable,
} from "@/repositories/jobRepository";
import { Job } from "@/types/Job";
import { User } from "@/types/User";

type CreateJobActionRequest = {
  userId: string;
  title: string;
  description: string;
  category: string;
  location?: string | undefined;
  salary?: number | undefined;
};

const validateJob = (job: Partial<Job>) => {
  const { userId, title, description, category, location, salary } = job;

  if (!userId || typeof userId !== "string") {
    throw new Error("User ID is required and must be a string.");
  }

  if (!title || typeof title !== "string") {
    throw new Error("Title is required and must be a string.");
  }

  if (!description || typeof description !== "string") {
    throw new Error("Description is required and must be a string.");
  }

  if (!category || typeof category !== "string") {
    throw new Error("Category is required and must be a string.");
  }

  if (location !== undefined && typeof location !== "string") {
    throw new Error("Location must be a string if provided.");
  }

  if (salary !== undefined && typeof salary !== "number") {
    throw new Error("Salary must be a number if provided.");
  }

  if (salary && salary < 0) {
    throw new Error("Salary must be a positive number.");
  }

  return true;
};

export const createJobAction = async (formData: CreateJobActionRequest) => {
  try {
    validateJob(formData);

    const newJob = await insertJobToTable(formData);
    return { success: true, job: newJob };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to create job",
    };
  }
};

export const getJobsAndUserName = async () => {
  try {
    const jobsAndUsername = await getJobsAndUserFromTable();
    return jobsAndUsername;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to fetch jobs",
    };
  }
};

export async function getJobsByUserIdAction(userId: string) {
  try {
    const jobs = await getJobsByUserIdFromTable(userId);
    return { success: true, jobs };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to fetch jobs",
    };
  }
}
