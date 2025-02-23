"use client";

import { Job } from "@/types/Job";
import { Button, Stack, TableCell, TableRow } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import { deleteMyJobPostAction } from "@/app/lib/job/actions";
import { formatRupiah } from "@/utils/formatNumberToIDR";
import { makeSuccessToast } from "@/lib/toast/toast";
import { useState } from "react";

type JobTableBodyContentProps = {
  myJobPost: Job[] | undefined;
};

const JobTableBodyContent = ({ myJobPost }: JobTableBodyContentProps) => {
  const [jobs, setJobs] = useState(myJobPost ?? []);

  const handleDelete = async (jobId: string, userId: string) => {
    try {
      await deleteMyJobPostAction(jobId, userId);
      setJobs((prev) => prev.filter((job) => job.id !== jobId)); // Update state
      makeSuccessToast("Job post deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell>{job.title}</TableCell>
            <TableCell>{job.description}</TableCell>
            <TableCell>{job.location}</TableCell>
            <TableCell>
              {job.salary ? formatRupiah(job.salary) : "N/A"}
            </TableCell>
            <TableCell>{job.category}</TableCell>
            <TableCell>
              {job.createdAt ? job.createdAt.toDateString() : "N/A"}
            </TableCell>
            <TableCell>
              {job.updatedAt ? job.updatedAt.toDateString() : "N/A"}
            </TableCell>
            <TableCell>
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
