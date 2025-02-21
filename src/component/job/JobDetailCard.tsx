"use client";

import { useAuth } from "@/hooks/useAuth";
import { formatRupiah } from "@/utils/formatNumberToIDR";
import { formatPostedDate } from "@/utils/formatPostedDate";
import { Box, Button, Divider, Typography } from "@mui/material";

type JobDetailCardProps = {
  title: string;
  firstName: string;
  lastName?: string;
  updatedAt?: Date;
  description: string;
  category: string;
  location?: string;
  salary?: number;
};

const JobDetailCard = ({
  title,
  firstName,
  lastName,
  updatedAt,
  category,
  location,
  salary,
  description,
}: JobDetailCardProps) => {
  const { state } = useAuth();
  const role = state.user?.role;

  return (
    <>
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

      {role === "jobseeker" && (
        <Button variant="contained" sx={{ marginTop: "16px" }} fullWidth>
          Apply
        </Button>
      )}
    </>
  );
};

export default JobDetailCard;
