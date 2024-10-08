import { prisma } from "../../prisma/PrismaClient";
import { getUserCart } from "./getUserCart";

export async function createUserCart(sessionId?: number, token?: string) {
   const userCart = await getUserCart(sessionId, token);
   if (!userCart) {
      return await prisma.cart.create({
         data: {
            token: token,
            userId: sessionId ? Number(sessionId) : undefined,
         },
      });
   }
   return userCart;
}
