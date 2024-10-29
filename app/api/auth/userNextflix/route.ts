import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();

  const { profileName, avatarUrl } = await req.json();

  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  if (!profileName || !avatarUrl || !user.id)
    return new NextResponse("Bad Request", { status: 400 });

  const userNextflixCreated = await db.userNextflix.create({
    data: {
      profileName,
      avatarUrl,
      userId: user.id as string,
    },
  });

  return NextResponse.json(userNextflixCreated);
}
