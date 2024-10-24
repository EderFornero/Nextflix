import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email is too short",
    })
    .email("This is not a valid email."),
  password: z.string().min(8, {
    message: "Something went wrong",
  }),
});
