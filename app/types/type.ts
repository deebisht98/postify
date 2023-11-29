import { z } from "zod";
import { User, Blog } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeBlog = Omit<Blog, "createdAt"> & {
  author: User;
  createdAt: string;
};

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required."),
  imageSrc: z.string().optional(),
  description: z.string().min(1, "Description is required."),
});

export type TBlogSchema = z.infer<typeof blogSchema>;
