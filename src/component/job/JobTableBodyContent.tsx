"use client";

import { Job } from "@/types/Job";
import { Button, Stack, TableCell, TableRow } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import { deleteMyJobPostAction } from "@/app/lib/job/actions";
import { formatRupiah } from "@/utils/formatNumberToIDR";
import { makeSuccessToast } from "@/lib/toast/toast";

type JobTableBodyContentProps = {
  myJobPost: Job[] | undefined;
};

const JobTableBodyContent = ({ myJobPost }: JobTableBodyContentProps) => {
  const handleDelete = async (jobId: string, userId: string) => {
    try {
      await deleteMyJobPostAction(jobId, userId);
      makeSuccessToast("Job post deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {myJobPost !== undefined && myJobPost.length > 0 ? (
        myJobPost.map((job) => (
          <TableRow key={job.id}>
            <TableCell>{job.title}</TableCell>
            <TableCell align="right">{job.description}</TableCell>
            <TableCell align="right">{job.location}</TableCell>
            <TableCell align="right">
              {job.salary ? formatRupiah(job.salary) : "N/A"}
            </TableCell>
            <TableCell align="right">{job.category}</TableCell>
            <TableCell align="right">
              {job.createdAt ? job.createdAt.toDateString() : "N/A"}
            </TableCell>
            <TableCell align="right">
              {job.updatedAt ? job.updatedAt.toDateString() : "N/A"}
            </TableCell>
            <TableCell align="right">
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Link href={`/jobs/my/${job.id}/edit`} passHref>
                  <Button variant="contained" color="warning">
                    <Edit />
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(job.id, job.userId)}
                >
                  <Delete />
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={8} align="center">
            No job posts found.
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default JobTableBodyContent;
