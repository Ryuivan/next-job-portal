"use server";

import JobList from "@/component/job/JobList";
import PageTitle from "@/component/ui/title/PageTitle";
import { Box, Grid2, Typography } from "@mui/material";
import { getJobsAndUserNameAction } from "../lib/job/actions";

const JobsPage = async () => {
  const jobs = await getJobsAndUserNameAction();

  if (!jobs || "error" in jobs) {
    return (
      <Typography color="error" textAlign="center" marginTop={4}>
        {jobs?.error ?? "Failed to fetch job details."}
      </Typography>
    );
  }

  return (
    <Box>
      <PageTitle title="Job List" />
      <Grid2 container spacing={2}>
        <JobList jobs={jobs.data} />
      </Grid2>
    </Box>
  );
};

export default JobsPage;
