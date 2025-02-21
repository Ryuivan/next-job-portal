import JobList from "@/component/job/JobList";
import PageTitle from "@/component/ui/title/PageTitle";
import { getAllJobsAndUserName } from "@/services/jobService";
import { Box, Grid2 } from "@mui/material";

const JobsPage = async () => {
  const jobs = await getAllJobsAndUserName();

  return (
    <Box>
      <PageTitle title="Job List" />
      <Grid2 container spacing={2}>
        <JobList jobs={jobs ? jobs : null} />
      </Grid2>
    </Box>
  );
};

export default JobsPage;
