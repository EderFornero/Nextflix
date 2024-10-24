import { z } from "zod";

export const formSchema = z
  .object({
    email: z.string().min(2).max(50).email(),
    password: z.string().min(8).max(50),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
