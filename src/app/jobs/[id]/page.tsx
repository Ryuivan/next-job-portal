"use server"

import { getJobAndUserNameByIdAction } from "@/app/lib/job/actions";
import JobDetailCard from "@/component/job/JobDetailCard";
import { Container, Typography } from "@mui/material";

type JobDetailPageProps = {
  params: { id: string };
};

const JobDetailPage = async ({ params }: JobDetailPageProps) => {
  const { id } = params;

  const job = await getJobAndUserNameByIdAction(id);

  if (!job || "error" in job) {
    return (
      <Typography color="error" textAlign="center" marginTop={4}>
        {job?.error ?? "Failed to fetch job details."}
      </Typography>
    );
  }

  const {
    title,
    firstName,
    lastName,
    updatedAt,
    description,
    category,
    location,
    salary,
  } = job?.data ?? {};

  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: "background.paper",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: 1,
      }}
    >
      <JobDetailCard
        title={title ?? "No title provided"}
        firstName={firstName ?? "Unknown"}
        lastName={lastName}
        updatedAt={updatedAt}
        description={description ?? "No description available"}
        category={category ?? "No category provided"}
        location={location}
        salary={salary}
      />
    </Container>
  );
};

export default JobDetailPage;
