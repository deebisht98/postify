import prisma from "../lib/prismadb";

type blogParams = {
  blogId: string;
};

export default async function getBlogsById(params: blogParams) {
  try {
    const { blogId } = params;

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        author: true,
      },
    });

    if (!blog) {
      return null;
    }

    return {
      ...blog,
      createdAt: blog.createdAt.toString(),
      author: {
        ...blog.author,
        createdAt: blog.author.createdAt.toString(),
        updatedAt: blog.author.updatedAt.toString(),
        emailVerified: blog.author.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
