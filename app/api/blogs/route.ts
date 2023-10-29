import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../lib/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const body = await request.json();

  const blog = await prisma?.blog.create({
    data: {
      ...body,
      authorId: currentUser.id,
    },
  });

  return NextResponse.json(blog, { status: 201 });
}
