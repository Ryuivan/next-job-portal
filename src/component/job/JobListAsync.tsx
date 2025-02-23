import { getFilteredJobsAndUserNameAction } from "@/app/lib/job/actions";
import JobList from "./JobList";
import { Box, Button, Typography } from "@mui/material";

type JobListAsyncProps = {
  query?: string;
  currentPage?: number;
  category?: string;
};

const JobListAsync = async ({ query, currentPage = 1, category }: JobListAsyncProps) => {
  const pageSize = 6;

  const response = await getFilteredJobsAndUserNameAction(
    query,
    currentPage,
    pageSize,category
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
        category={category}
      />
    </Box>
  );
};

export default JobListAsync;
