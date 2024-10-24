import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(2, "Email is too short")
    .email("Email is invalid"),
  password: string({ required_error: "Password is required" }).min(
    8,
    "Password is too short"
  ),
});
