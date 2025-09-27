import z from "zod";

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6, "Passoword must be atleast 6 character long"),
  panId: z.string().length(10, "Pan Id is 10 charatcer long"),
  imageId: z.string(),
});

export const SignInSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});

export type SignIn = z.infer<typeof SignInSchema>
export type SignUp = z.infer<typeof SignUpSchema>