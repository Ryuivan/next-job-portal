import { JobsContext, JobsContextType } from "@/context/JobContext";
import { useContext } from "react";

export const useJobs = (): JobsContextType => {
  const context = useContext(JobsContext);
  if (!context) throw new Error("useJobs must be used within a JobsProvider");
  return context;
};
