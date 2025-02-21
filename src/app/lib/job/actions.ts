"use server";

import {
  getJobAndUserByIdFromTable,
  getJobsAndUserFromTable,
  getJobsByUserIdFromTable,
  insertJobToTable,
} from "@/repositories/jobRepository";
import { Job } from "@/types/Job";
import { User } from "@/types/User";

// Request Type
export type CreateJobActionRequest = {
  userId: string;
  title: string;
  description: string;
  category: string;
  location?: string;
  salary?: number;
};

// Response Type
export type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type JobAndUserName = Omit<Job, "userId"> & Pick<User, "firstName" | "lastName">;

// Validator
const validateJob = (job: Partial<Job>): boolean => {
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
  if (salary !== undefined && (typeof salary !== "number" || salary < 0)) {
    throw new Error("Salary must be a positive number if provided.");
  }

  return true;
};

// Create Job Action
export const createJobAction = async (
  formData: CreateJobActionRequest
): Promise<ActionResponse<Job>> => {
  try {
    validateJob(formData);
    const newJob = await insertJobToTable(formData);
    return { success: true, data: newJob };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to create job" };
  }
};

// Get All Jobs with User Name
export const getJobsAndUserNameAction = async (): Promise<ActionResponse<JobAndUserName[]>> => {
  try {
    const jobsAndUsername = await getJobsAndUserFromTable();
    return { success: true, data: jobsAndUsername };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to fetch jobs" };
  }
};

// Get Jobs by User ID
export const getJobsByUserIdAction = async (
  userId: string
): Promise<ActionResponse<Job[]>> => {
  try {
    const jobs = await getJobsByUserIdFromTable(userId);
    return { success: true, data: jobs };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to fetch jobs" };
  }
};

// Get Job by ID with User Name
export const getJobAndUserNameByIdAction = async (
  jobId: string
): Promise<ActionResponse<JobAndUserName>> => {
  try {
    const jobAndUsername = await getJobAndUserByIdFromTable(jobId);
    if (!jobAndUsername) {
      return { success: false, error: "Job not found" };
    }
    return { success: true, data: jobAndUsername };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to fetch job" };
  }
};
