import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Email invalid").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
