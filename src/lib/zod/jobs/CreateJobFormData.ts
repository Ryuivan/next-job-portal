import { z } from "zod";

export const createJobFormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  location: z.string().optional(),
  salary: z.number().optional(),
  category: z.string().nonempty("Category is required"),
});

export type CreateJobFormData = z.infer<typeof createJobFormSchema>;
