import { getJobAndUserById } from "@/services/jobService";
import { formatRupiah } from "@/utils/formatNumberToIDR";
import { formatPostedDate } from "@/utils/formatPostedDate";
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
} from "@mui/material";

type JobDetailPageProps = {
  params: { id: string };
};

const JobDetailPage = async ({ params }: JobDetailPageProps) => {
  const { id } = params;

  const job = await getJobAndUserById(id);

  return (
    <>
      {job ? (
        <Container
          maxWidth="xs"
          sx={{
            backgroundColor: "background.paper",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <Box sx={{ marginBottom: "16px" }}>
            <Typography fontSize="20px" fontWeight={600}>
              {job.title}
            </Typography>
            <Typography fontSize="12px" fontWeight={400} color="text.secondary">
              Posted by {job.firstName} {job.lastName ? job.lastName : ""}{" "}
              {job.updatedAt
                ? `(${formatPostedDate(job.updatedAt)})`
                : "A Long time ago"}
            </Typography>
          </Box>
          <Divider />

          <Box sx={{ marginTop: "16px" }}>
            <Typography fontSize="16px" fontWeight={400} color="text.secondary">
              Description:
            </Typography>
            <Typography fontSize="16px" fontWeight={400}>
              {job.description}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "16px" }}>
            <Typography fontSize="16px" fontWeight={400} color="text.secondary">
              Category:
            </Typography>
            <Typography fontSize="16px" fontWeight={400}>
              {job.category}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "16px" }}>
            <Typography fontSize="16px" fontWeight={400} color="text.secondary">
              Location:
            </Typography>
            <Typography fontSize="16px" fontWeight={400}>
              {job.location ? job.location : "Not provided"}
            </Typography>
          </Box>

          {job.salary && (
            <Box sx={{ marginTop: "16px" }}>
              <Typography
                fontSize="16px"
                fontWeight={400}
                color="text.secondary"
              >
                Salary:
              </Typography>
              <Typography fontSize="16px" fontWeight={400}>
                {formatRupiah(job.salary)}
              </Typography>
            </Box>
          )}
          <Button variant="contained" sx={{ marginTop: "16px" }} fullWidth>
            Apply
          </Button>
        </Container>
      ) : (
        <Typography>No job found</Typography>
      )}
    </>
  );
};

export default JobDetailPage;
