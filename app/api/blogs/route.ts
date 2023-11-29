import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../lib/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const body = await request.json();

  try {
    const blog = await prisma?.blog.create({
      data: {
        ...body,
        authorId: currentUser.id,
      },
    });
    return NextResponse.json(blog, { status: 201 });
    console.log("blog", blog);
  } catch (err) {
    console.log(err);
  }
}
