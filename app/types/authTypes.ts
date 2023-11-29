import { z } from "zod";

const authSchema = z.object({
  name: z.string().min(3, "Name should contain atleast 3 characters."),
  email: z.string().email({
    message: "Email should a valid email.",
  }),
  password: z.string().min(8, "Password must be atleast 10 characters long."),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be atleast 10 characters long."),
});

export const signUpSchema = authSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  }
);

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = authSchema.pick({ email: true, password: true });
export type TSignInSchema = z.infer<typeof signInSchema>;
