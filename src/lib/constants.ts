import { z } from "zod";

export const checkoutFormSchema = z.object({
   firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" }),
   lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" }),
   email: z.string().email({ message: "Enter a valid email address" }),
   phone: z.string().min(10, { message: "Enter a valid phone number" }),
   address: z.string().min(5, { message: "Enter a valid address" }),
   comment: z.string().optional(),
});

export const profileFormSchema = z.object({
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
   address: z.string().min(5, { message: "Enter a valid address" }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
