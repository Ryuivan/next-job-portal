import PageTitle from "@/component/ui/title/PageTitle";
import { getAllJobs } from "@/services/jobService";
import { Box, Grid2 } from "@mui/material";

const JobsPage = async () => {
  // const jobs = await getAllJobs();

  return (
    <Box>
      <PageTitle title="Job List" />

      <Grid2
        container
        spacing={2}
      >
        
      </Grid2>
    </Box>
  )

}

export default JobsPage;