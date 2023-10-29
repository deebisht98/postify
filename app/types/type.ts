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
  createdAt: string;
};

export type newBlog = {
  name: string;
  imageSrc: string;
  description: string;
};
