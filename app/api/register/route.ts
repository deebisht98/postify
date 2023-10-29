import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      {
        message: "Please provide all the required fields.",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
