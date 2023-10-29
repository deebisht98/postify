import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";

type deleteParams = {
  blogId?: string;
};
export async function DELETE(
  request: Request,
  { params }: { params: deleteParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { blogId } = params;

  if (!blogId || typeof blogId !== "string") {
    throw new Error("Invalid Id.");
  }

  const blog = await prisma?.blog.deleteMany({
    where: {
      id: params.blogId,
      authorId: currentUser.id,
    },
  });

  return NextResponse.json(blog, { status: 200 });
}
export async function PUT(
  request: Request,
  { params }: { params: deleteParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const body = await request.json();

  const { blogId } = params;

  if (!blogId || typeof blogId !== "string") {
    throw new Error("Invalid Id.");
  }

  const blog = await prisma?.blog.update({
    where: {
      id: params.blogId,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(blog, { status: 200 });
}
