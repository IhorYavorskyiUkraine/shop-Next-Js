import { z } from "zod";

export const passwordSchema = z
   .string()
   .min(8, { message: "Enter a valid password" });

export const formLoginSchema = z.object({
   email: z.string().email({ message: "Enter a valid email address" }),
   password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
   .merge(
      z.object({
         fullName: z.string().min(2, { message: "Enter your full name" }),
         confirmPassword: passwordSchema,
      }),
   )
   .refine(data => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
   });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
