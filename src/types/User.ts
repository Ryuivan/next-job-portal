export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "jobseeker" | "employer" | "Admin";
  createdAt: Date;
  updatedAt: Date;
};
