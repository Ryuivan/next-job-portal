import { getFilteredJobsAndUserNameAction } from "@/app/lib/job/actions";
import JobList from "./JobList";
import { Box, Button, Typography } from "@mui/material";

type JobListAsyncProps = {
  query?: string;
  currentPage?: number;
};

const JobListAsync = async ({ query, currentPage = 1 }: JobListAsyncProps) => {
  const pageSize = 6;

  const response = await getFilteredJobsAndUserNameAction(
    query,
    currentPage,
    pageSize
  );
  const jobs = response.data ?? [];
  const total = response.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  if (!jobs.length) {
    return (
      <Typography color="error" textAlign="center" marginTop={4}>
        No jobs found.
      </Typography>
    );
  }

  return (
    <Box>
      <JobList
        jobs={jobs}
        total={total}
        currentPage={currentPage}
        query={query}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </Box>
  );
};

export default JobListAsync;
