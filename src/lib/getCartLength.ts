import { prisma } from "../../prisma/PrismaClient";

export const getCartLength = async () => {
   const cart = await prisma.cart.findMany();

   return cart.length;
};
