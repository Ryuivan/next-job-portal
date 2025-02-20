export type Job = {
  id: string;
  userId: string;
  title: string;
  description: string;
  location?: string;
  salary?: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}