import { Job } from "@/types/Job";
import { User } from "@/types/User";
import { Grid2, Typography } from "@mui/material";
import JobCard from "./JobCard";

type JobListProps = {
  jobs: (Omit<Job, "userId"> & Pick<User, "firstName" | "lastName">)[] | null;
};

export const JobList = ({ jobs }: JobListProps) => {
  return (
    <>
      {jobs ? (
        jobs.map(({ id, title, firstName, lastName, createdAt }) => {
          return (
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
          );
        })
      ) : (
        <Typography>No jobs found</Typography>
      )}
    </>
  );
};

export default JobList;
