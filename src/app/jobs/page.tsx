import { Suspense } from "react";
import JobListAsync from "@/component/job/JobListAsync";
import PageTitle from "@/component/ui/title/PageTitle";
import { Box, Typography } from "@mui/material";
import JobSearch from "@/component/job/JobSearch";

type JobsPageProps = {
  searchParams?: Promise<{ query?: string; page?: string }>;
};

const JobsPage = async ({ searchParams }: JobsPageProps) => {
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;

  return (
    <Box>
      <PageTitle title="Job List" />
      <JobSearch />
      <Suspense key={query + currentPage} fallback={<Typography>Loading job list...</Typography>}>
        <JobListAsync query={query} currentPage={currentPage} />
      </Suspense>
    </Box>
  );
};

export default JobsPage;
