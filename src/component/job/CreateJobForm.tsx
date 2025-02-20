"use client";

import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import FormTitle from "../ui/title/FormTitle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreateJobFormData,
  createJobFormSchema,
} from "@/lib/zod/jobs/CreateJobFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { makeErrorToast, makeSuccessToast } from "@/lib/toast/toast";
import { useJobs } from "@/hooks/useJobs";
import { useAuth } from "@/hooks/useAuth";

export const CreateJobForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { createNewJob } = useJobs();
  const { state } = useAuth();
  const userId = state.user?.id;

  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobFormSchema),
  });

  const onSubmit = async (data: CreateJobFormData) => {
    setLoading(true);

    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const job = { ...data, userId };
      await createNewJob(job);
      makeSuccessToast("Job created successfully");
      push("/jobs");
    } catch (err) {
      makeErrorToast(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundColor: "background.paper",
        width: "100%",
        height: "100%",
        padding: "32px",
        borderRadius: "8px",
      }}
    >
      <FormTitle title="Create New Job" />

      <TextField
        label="Title"
        type="text"
        variant="outlined"
        fullWidth
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
        sx={{
          marginBottom: "16px",
        }}
      />

      <TextareaAutosize
        placeholder="Description"
        minRows={6}
        style={{
          width: "100%",
          marginBottom: "16px",
          backgroundColor: "#1e1e1e",
          padding: "10px",
          border: "1px solid #4b4b4b",
          borderRadius: "6px",
        }}
        {...register("description")}
      />

      <TextField
        label="Location"
        type="text"
        variant="outlined"
        fullWidth
        {...register("location")}
        error={!!errors.location}
        helperText={errors.location?.message}
        sx={{
          marginBottom: "16px",
        }}
      />

      <TextField
        label="Salary"
        type="number"
        variant="outlined"
        fullWidth
        {...register("salary", { valueAsNumber: true })}
        error={!!errors.salary}
        helperText={errors.salary?.message}
        sx={{
          marginBottom: "16px",
        }}
      />

      <TextField
        label="Category"
        type="text"
        variant="outlined"
        fullWidth
        {...register("category")}
        error={!!errors.category}
        helperText={errors.category?.message}
        sx={{
          marginBottom: "16px",
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        loading={loading}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateJobForm;
