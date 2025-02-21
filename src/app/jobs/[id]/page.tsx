import { getJobAndUserNameByIdAction } from "@/app/lib/job/actions";
import { formatRupiah } from "@/utils/formatNumberToIDR";
import { formatPostedDate } from "@/utils/formatPostedDate";
import { Box, Button, Container, Divider, Typography } from "@mui/material";

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
      <Box sx={{ marginBottom: "16px" }}>
        <Typography fontSize="20px" fontWeight={600}>
          {title ?? "No title provided"}
        </Typography>
        <Typography fontSize="12px" fontWeight={400} color="text.secondary">
          Posted by {firstName ?? "Unknown"} {lastName ?? ""}{" "}
          {updatedAt
            ? `(${formatPostedDate(updatedAt)})`
            : "(No date provided)"}
        </Typography>
      </Box>
      <Divider />

      <Box sx={{ marginTop: "16px" }}>
        <Typography fontSize="16px" fontWeight={400} color="text.secondary">
          Description:
        </Typography>
        <Typography fontSize="16px" fontWeight={400}>
          {description ?? "No description available"}
        </Typography>
      </Box>

      <Box sx={{ marginTop: "16px" }}>
        <Typography fontSize="16px" fontWeight={400} color="text.secondary">
          Category:
        </Typography>
        <Typography fontSize="16px" fontWeight={400}>
          {category ?? "Not categorized"}
        </Typography>
      </Box>

      <Box sx={{ marginTop: "16px" }}>
        <Typography fontSize="16px" fontWeight={400} color="text.secondary">
          Location:
        </Typography>
        <Typography fontSize="16px" fontWeight={400}>
          {location ?? "Not provided"}
        </Typography>
      </Box>

      {salary !== undefined && (
        <Box sx={{ marginTop: "16px" }}>
          <Typography fontSize="16px" fontWeight={400} color="text.secondary">
            Salary:
          </Typography>
          <Typography fontSize="16px" fontWeight={400}>
            {formatRupiah(salary)}
          </Typography>
        </Box>
      )}

      <Button variant="contained" sx={{ marginTop: "16px" }} fullWidth>
        Apply
      </Button>
    </Container>
  );
};

export default JobDetailPage;
