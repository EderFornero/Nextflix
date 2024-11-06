import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();

  const { profileName, avatarUrl } = await req.json();

  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  if (!profileName || !avatarUrl || !user.id)
    return new NextResponse("Bad Request", { status: 400 });

  const profilesPerUser = await db.userNextflix.count({
    where: { userId: user.id },
  });

  if (profilesPerUser >= 4)
    return new NextResponse(
      JSON.stringify({ message: "You can only have 4 profiles" }),
      { status: 406 }
    );

  const userNextflixCreated = await db.userNextflix.create({
    data: {
      profileName,
      avatarUrl,
      userId: user.id as string,
    },
  });

  return NextResponse.json(userNextflixCreated);
}

export async function DELETE(req: Request) {
  const user = await currentUser();

  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { userIdNextflix } = await req.json();

  if (!userIdNextflix)
    return new NextResponse("Id is required", { status: 400 });

  const userDeleted = await db.userNextflix.delete({
    where: {
      id: userIdNextflix,
    },
  });

  return NextResponse.json(userDeleted);
}
