export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "jobseeker" | "employer";
  createdAt?: Date;
  updatedAt?: Date;
};
