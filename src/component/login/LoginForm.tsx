"use client";

import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios/axiosInstance";
import { makeErrorToast, makeSuccessToast } from "@/lib/toast/toast";
import { LoginFormData, loginFormSchema } from "@/lib/zod/LoginFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      await login(data);
      makeSuccessToast("Login successful");
    } catch (err: any) {
      makeErrorToast(err.message || "An error occurred");
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        loading={loading}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
