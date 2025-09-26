import z from "zod";

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  panId: z.string().length(10),
  imageId: z.string(),
});

export const SignInSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type SignIn = z.infer<typeof SignInSchema>
export type SignUp = z.infer<typeof SignUpSchema>