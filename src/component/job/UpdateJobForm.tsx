"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  UpdateJobFormData,
  updateJobFormSchema,
} from "@/lib/zod/jobs/UpdateJobFormData";
import { Job } from "@/types/Job";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import FormTitle from "../ui/title/FormTitle";
import { useRouter } from "next/navigation";
import { updateMyJobPostAction } from "@/app/lib/job/actions";
import { makeErrorToast, makeSuccessToast } from "@/lib/toast/toast";

type UpdateJobFormProps = {
  job: Job | undefined;
};

const UpdateJobForm = ({ job }: UpdateJobFormProps) => {
  const { state } = useAuth();
  const userId = state.user?.id;
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateJobFormData>({
    resolver: zodResolver(updateJobFormSchema),
    defaultValues: {
      id: job?.id ?? "",
      title: job?.title ?? "",
      description: job?.description ?? "",
      location: job?.location ?? "",
      salary: job?.salary ?? undefined,
      category: job?.category ?? "",
    },
  });

  const onSubmit = async (data: UpdateJobFormData) => {
    try {
      const newJob: Job = {
        ...data,
        userId: userId!,
        title: data.title ?? "",
        description: data.description ?? "",
        location: data.location ?? "",
        salary: data.salary ?? 0,
        category: data.category ?? "",
        updatedAt: new Date(),
      };

      const result = await updateMyJobPostAction(newJob);
      if (result?.error) {
        console.error("Error updating job:", result.error);
        return;
      }
      makeSuccessToast("Job updated successfully");
      push(`/jobs/my/${userId}`);
    } catch (error) {
      makeErrorToast("Failed to update job");
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
      <FormTitle title="Edit Job" />

      <TextField
        label="Title"
        fullWidth
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
        sx={{ marginBottom: "16px" }}
      />

      <TextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
        sx={{ marginBottom: "16px" }}
      />

      <TextField
        label="Location"
        fullWidth
        {...register("location")}
        error={!!errors.location}
        helperText={errors.location?.message}
        sx={{ marginBottom: "16px" }}
      />

      <TextField
        label="Salary"
        type="number"
        fullWidth
        {...register("salary", { valueAsNumber: true })}
        error={!!errors.salary}
        helperText={errors.salary?.message}
        sx={{ marginBottom: "16px" }}
      />

      <TextField
        label="Category"
        fullWidth
        {...register("category")}
        error={!!errors.category}
        helperText={errors.category?.message}
        sx={{ marginBottom: "16px" }}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Update Job
      </Button>
    </Box>
  );
};

export default UpdateJobForm;
