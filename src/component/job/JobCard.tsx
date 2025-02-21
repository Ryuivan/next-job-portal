import { OpenInNew } from "@mui/icons-material";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";

type JobCardProps = {
  id: string;
  title: string;
  firstName: string;
  lastName?: string;
  createdAt?: Date;
};

export const JobCard = ({
  id,
  title,
  firstName,
  lastName,
  createdAt,
}: JobCardProps) => {
  return (
    <Stack direction="column">
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          marginBottom: "16px",
        }}
      >
        <Box>
          <Typography fontSize="20px" fontWeight={600}>
            {title}
          </Typography>
          <Typography fontSize="12px" fontWeight={400} color="text.secondary">
            Posted by {firstName} {lastName ? lastName : ""}
          </Typography>
        </Box>

        <Link href={`/jobs/${id}`} passHref>
          <IconButton>
            <OpenInNew />
          </IconButton>
        </Link>
      </Stack>
      <Divider />

      <Box
        sx={{
          marginTop: "16px",
        }}
      >
        {createdAt && (
          <Typography fontSize="14px" fontWeight={400}>
            Created at: {createdAt?.toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default JobCard;
