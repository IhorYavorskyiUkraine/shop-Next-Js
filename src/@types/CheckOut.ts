import { Prisma } from "@prisma/client";

export type OrderInput = Omit<
   Prisma.OrderCreateInput,
   "token" | "totalAmount" | "fullName" | "firstOrder"
>;
