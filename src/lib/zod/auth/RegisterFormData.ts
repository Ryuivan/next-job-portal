import { z } from "zod";

export const registerFormSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(3, "First name must be at least 3 characters"),
  lastName: z.string().optional(),
  email: z.string().email("Email invalid").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
  role: z.enum(["jobseeker", "employer"], {
    required_error: "Role is required",
  }),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
