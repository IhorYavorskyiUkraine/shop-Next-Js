import { z } from "zod";

const baseSchema = z.object({
   firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" }),
   lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" }),
   email: z.string().email({ message: "Enter a valid email address" }),
   phone: z
      .string()
      .min(19, { message: "Enter a valid phone number" })
      .max(19, { message: "Enter a valid phone number" }),
});

export const checkoutFormSchema = baseSchema.extend({
   address: z.string().min(5, { message: "Enter a valid address" }),
   comment: z.string().optional(),
});

export const addressFormSchema = z.object({
   address: z.string().min(5, { message: "Enter a valid address" }),
});

export const profileFormSchema = baseSchema
   .extend({
      password: z
         .union([
            z.string().min(8, {
               message: "Password must be at least 8 characters long",
            }),
            z.literal("").optional(),
         ])
         .optional(),
      confirmPassword: z
         .union([
            z.string().min(8, {
               message: "Password must be at least 8 characters long",
            }),
            z.literal("").optional(),
         ])
         .optional(),
   })
   .refine(data => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords must match",
   });

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
