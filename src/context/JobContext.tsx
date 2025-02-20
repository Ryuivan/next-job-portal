"use client";

import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "@/services/jobService";
import { Job } from "@/types/Job";
import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";

// Job State and Action Types
type JobState = {
  jobs: Job[];
  loading: boolean;
  error: string | null;
};

type JobAction =
  | { type: "SET_JOBS"; payload: Job[] }
  | { type: "SET_JOB_DETAIL"; payload: Job }
  | { type: "ADD_JOB"; payload: Job }
  | { type: "UPDATE_JOB"; payload: Job }
  | { type: "REMOVE_JOB"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: JobState = {
  jobs: [],
  loading: false,
  error: null,
};

// Reducer Function
const jobsReducer = (state: JobState, action: JobAction): JobState => {
  switch (action.type) {
    case "SET_JOBS":
      return { ...state, jobs: action.payload, loading: false, error: null };

    case "SET_JOB_DETAIL":
      return {
        ...state,
        jobs: state.jobs.some((job) => job.id === action.payload.id)
          ? state.jobs.map((job) =>
              job.id === action.payload.id ? action.payload : job
            )
          : [...state.jobs, action.payload],
        loading: false,
        error: null,
      };

    case "ADD_JOB":
      return { ...state, jobs: [action.payload, ...state.jobs], error: null };

    case "UPDATE_JOB":
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === action.payload.id ? action.payload : job
        ),
        error: null,
      };

    case "REMOVE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
        error: null,
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

// Context Type
export type JobsContextType = {
  state: JobState;
  fetchJobs: () => Promise<void>;
  fetchJobDetail: (id: string) => Promise<void>;
  createNewJob: (job: Omit<Job, "id">) => Promise<void>;
  updateNewJob: (job: Job) => Promise<void>;
  removeJob: (id: string, userId: string) => Promise<void>;
};

export const JobsContext = createContext<JobsContextType | null>(null);

// JobsProvider Component
export const JobsProvider = ({
  children,
  initialJobs = [],
}: {
  children: ReactNode;
  initialJobs?: Job[];
}) => {
  const [state, dispatch] = useReducer(jobsReducer, {
    ...initialState,
    jobs: initialJobs,
  });

  // Helper function for error handling
  const handleError = (err: unknown) => {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred.";
    dispatch({ type: "SET_ERROR", payload: errorMessage });
  };

  // Fetch all jobs
  const fetchJobs = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const jobs = await getAllJobs();
      dispatch({ type: "SET_JOBS", payload: jobs ?? [] });
    } catch (err) {
      handleError(err);
    }
  };

  // Fetch job detail
  const fetchJobDetail = async (id: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const job = await getJobById(id);
      if (job) dispatch({ type: "SET_JOB_DETAIL", payload: job });
      else throw new Error("Job not found.");
    } catch (err) {
      handleError(err);
    }
  };

  // Create new job
  const createNewJob = async (job: Omit<Job, "id">) => {
    try {
      const newJob = await createJob(job);
      dispatch({ type: "ADD_JOB", payload: newJob });
    } catch (err) {
      handleError(err);
    }
  };

  // Update job
  const updateNewJob = async (job: Job) => {
    try {
      const updatedJob = await updateJob(job);
      dispatch({ type: "UPDATE_JOB", payload: updatedJob });
    } catch (err) {
      handleError(err);
    }
  };

  // Remove job
  const removeJob = async (id: string, userId: string) => {
    try {
      await deleteJob(id, userId);
      dispatch({ type: "REMOVE_JOB", payload: id });
    } catch (err) {
      handleError(err);
    }
  };

  // Fetch jobs on mount if empty
  useEffect(() => {
    if (state.jobs.length === 0) fetchJobs();
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      fetchJobs,
      fetchJobDetail,
      createNewJob,
      updateNewJob,
      removeJob,
    }),
    [state]
  );

  return (
    <JobsContext.Provider value={contextValue}>{children}</JobsContext.Provider>
  );
};
