"use server";

import {
  getJobsFromTable,
  insertJobToTable,
  updateJobInTable,
  deleteJobFromTable,
  getJobAndUserByIdFromTable,
  getJobsAndUserFromTable,
} from "@/repositories/jobRepository";
import { Job } from "@/types/Job";
import { User } from "@/types/User";

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

export const getAllJobs = async (): Promise<Job[] | null> => {
  const jobs = await getJobsFromTable();

  if (jobs.length === 0) {
    throw new Error("No jobs found.");
  }

  return jobs;
};

export const getAllJobsAndUserName = async (): Promise<
  (Omit<Job, "userId"> & Pick<User, "firstName" | "lastName">)[] | null
> => {
  const jobs = await getJobsAndUserFromTable();

  if (jobs.length === 0) {
    throw new Error("No jobs found.");
  }

  return jobs;
};

export const getJobAndUserById = async (id: string): Promise<Omit<Job, "userId"> & Pick<User, "firstName" | "lastName"> | null> => {
  const job = await getJobAndUserByIdFromTable(id);

  if (!job) {
    throw new Error("Job not found.");
  }

  return job;
};

export const createJob = async (job: Partial<Job>): Promise<Job> => {
  if (!validateJob(job)) {
    throw new Error("Invalid job data");
  }

  return insertJobToTable(job);
};

export const updateJob = async (job: Job): Promise<Job> => {
  if (!validateJob(job)) {
    throw new Error("Invalid job data");
  }

  return updateJobInTable(job);
};

export const deleteJob = async (id: string, userId: string) => {
  return deleteJobFromTable(id, userId);
};
