/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  if (!email) return null;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
