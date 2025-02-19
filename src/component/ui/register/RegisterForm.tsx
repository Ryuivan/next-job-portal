"use client";

import axiosInstance from "@/lib/axios/axiosInstance";
import {
  RegisterFormData,
  registerFormSchema,
} from "@/lib/zod/RegisterFormData";
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

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    try {
      const response = await axiosInstance.post("/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("users success");
      console.log(response.data);
    } catch (error) {
      setError((error as Error).message || "An error occurred");
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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          marginBottom: "16px",
        }}
      >
        <TextField
          label="First Name"
          fullWidth
          type="text"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="Last Name"
          fullWidth
          type="text"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </Stack>

      <TextField
        label="Email"
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
        error={!!errors.role}
        sx={{ marginBottom: "16px" }}
      >
        <InputLabel>Role</InputLabel>
        <Controller
          name="role"
          control={control}
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

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
