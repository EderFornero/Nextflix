import { z } from "zod";

export const formSchema = z.object({
  profileName: z.string().min(2).max(50),
  avatarUrl: z.enum([
    "/profiles/profile-1.jpg",
    "/profiles/profile-2.jpg",
    "/profiles/profile-3.jpg",
    "/profiles/profile-4.jpg",
    "/profiles/profile-5.jpg",
    "/profiles/profile-6.jpg",
    "/profiles/profile-7.jpg",
    "/profiles/profile-8.jpg",
    "/profiles/profile-9.jpg",
    "/profiles/profile-10.jpg",
  ]),
});
