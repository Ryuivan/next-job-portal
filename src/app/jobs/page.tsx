import JobList from "@/component/job/JobList";
import PageTitle from "@/component/ui/title/PageTitle";
import { Box, Grid2 } from "@mui/material";
import { getJobsAndUserName } from "../lib/job/actions";

const JobsPage = async () => {
  const jobs = await getJobsAndUserName();

  return (
    <Box>
      <PageTitle title="Job List" />
      <Grid2 container spacing={2}>
        <JobList jobs={jobs || { error: "No jobs available" }} />
      </Grid2>
    </Box>
  );
};

export default JobsPage;
