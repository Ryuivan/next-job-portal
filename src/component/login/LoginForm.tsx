"use client";

import { makeErrorToast, makeSuccessToast } from "@/lib/toast/toast";
import { LoginFormData, loginFormSchema } from "@/lib/zod/auth/LoginFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormTitle from "../ui/title/FormTitle";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    login,
    state: { isAuthenticated },
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/jobs");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      await login(data);
      makeSuccessToast("Login successful");

      return router.push("/jobs");
    } catch (err: any) {
      makeErrorToast(err?.message || "Invalid email or password");
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
      <FormTitle title="Login" />

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
