import { z } from "zod";

export const updateJobFormSchema = z.object({
  id: z.string().nonempty("Job ID is required"),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  salary: z.number().optional(),
  category: z.string().optional(),
});

export type UpdateJobFormData = z.infer<typeof updateJobFormSchema>;
