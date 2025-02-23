"use client";

import { Job } from "@/types/Job";
import { User } from "@/types/User";
import { Grid2, Pagination, Stack } from "@mui/material";
import JobCard from "./JobCard";

type JobListProps = {
  jobs: (Omit<Job, "userId"> & Pick<User, "firstName" | "lastName">)[];
  query?: string;
  total: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  category?: string;
};

const JobList = ({ jobs, query, currentPage, totalPages }: JobListProps) => {
  const onPageChange = (page: number) => {
    window.location.search = `?query=${query ?? ""}&page=${page}`;
  };

  return (
    <>
      <Grid2 container spacing={2}>
        {jobs.map(({ id, title, firstName, lastName, createdAt }) => (
          <Grid2
            key={id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
            sx={{
              padding: "16px",
              backgroundColor: "background.paper",
              borderRadius: "8px",
            }}
          >
            <JobCard
              id={id}
              title={title}
              firstName={firstName}
              lastName={lastName}
              createdAt={createdAt}
            />
          </Grid2>
        ))}
      </Grid2>

      <Stack
        direction="row"
        justifyContent="center"
        sx={{
          marginTop: "60px",
        }}
      >
        <Pagination
          shape="rounded"
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
        />
      </Stack>
    </>
  );
};

export default JobList;
