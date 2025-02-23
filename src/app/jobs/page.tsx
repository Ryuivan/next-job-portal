import { Suspense } from "react";
import JobListAsync from "@/component/job/JobListAsync";
import PageTitle from "@/component/ui/title/PageTitle";
import { Box, Stack, Typography } from "@mui/material";
import JobSearch from "@/component/job/JobSearch";
import JobCategoryFilter from "@/component/job/JobCategoryFilter";
import { getJobCategoriesAction } from "../lib/job/actions";

type JobsPageProps = {
  searchParams?: Promise<{ query?: string; page?: string; category?: string }>;
};

const JobsPage = async ({ searchParams }: JobsPageProps) => {
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;
  const category = params?.category || "";

  const categoriesResponse = await getJobCategoriesAction();
  const categories = categoriesResponse.data ?? [];

  return (
    <Box>
      <PageTitle title="Job List" />
      <Stack direction="row" spacing={2} width="100%" sx={{ 
        marginBottom: "32px"
       }}>
        <JobSearch />
        <JobCategoryFilter categories={categories} />
      </Stack>
      <Suspense
        key={`${query}-${currentPage}-${category}`}
        fallback={<Typography>Loading job list...</Typography>}
      >
        <JobListAsync
          query={query}
          currentPage={currentPage}
          category={category}
        />
      </Suspense>
    </Box>
  );
};

export default JobsPage;
