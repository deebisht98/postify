import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../lib/prismadb";
import { signUpSchema } from "@/app/types/authTypes";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const result = signUpSchema.safeParse(body);
  let zodErrors = {};

  if (!result.success) {
    result.error.issues.forEach((issue: any) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  if (Object.keys(zodErrors).length > 0) {
    return NextResponse.json({ errors: zodErrors });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (currentUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
