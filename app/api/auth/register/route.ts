/* eslint-disable @typescript-eslint/no-unused-vars */
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
