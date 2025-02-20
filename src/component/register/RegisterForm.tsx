"use client";

import { makeErrorToast, makeSuccessToast } from "@/lib/toast/toast";
import {
  RegisterFormData,
  registerFormSchema,
} from "@/lib/zod/auth/RegisterFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormTitle from "../ui/title/FormTitle";
import { useRouter } from "next/navigation";
import { createUser } from "@/services/userService";

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    try {
      await createUser(data);
      router.push("/login");
      makeSuccessToast("Register successful");
    } catch (err) {
      makeErrorToast(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component={"form"}
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
      <FormTitle title="Account Registration" />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          marginBottom: "16px",
        }}
      >
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          type="text"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          type="text"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </Stack>

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{
          marginBottom: "16px",
        }}
      />

      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{
          marginBottom: "16px",
        }}
      />

      <FormControl
        fullWidth
        variant="outlined"
        error={!!errors.role}
        sx={{ marginBottom: "16px" }}
      >
        <InputLabel>Role</InputLabel>
        <Controller
          name="role"
          control={control}
          defaultValue="jobseeker"
          render={({ field }) => (
            <Select {...field} label="Role">
              <MenuItem value="jobseeker">Job Seeker</MenuItem>
              <MenuItem value="employer">Employer</MenuItem>
            </Select>
          )}
        />
        {errors.role && (
          <Typography
            color="error"
            variant="caption"
            sx={{
              marginLeft: "14px",
            }}
          >
            {errors.role.message}
          </Typography>
        )}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        loading={loading}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
