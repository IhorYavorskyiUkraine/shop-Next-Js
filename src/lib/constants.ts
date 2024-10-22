import { z } from "zod";

const baseSchema = z.object({
   firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be less than 50 characters"),
   lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name must be less than 50 characters"),
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

export const addressFormSchema = baseSchema
   .extend({
      city: z
         .string()
         .min(1, "City is required")
         .max(20, "City must be less than 100 characters"),
      street: z
         .string()
         .min(1, "Street is required")
         .max(50, "Street must be less than 100 characters"),
      house: z
         .string()
         .min(1, "House number is required")
         .max(10, "House number must be less than 10 characters"),
      apartment: z
         .string()
         .max(10, "Apartment number must be less than 10 characters")
         .optional(),
      postcode: z
         .string()
         .min(1, "Postcode is required")
         .max(10, "Postcode must be less than 10 characters"),
   })
   .omit({ email: true });

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
export type AddressFormValues = z.infer<typeof addressFormSchema>;
