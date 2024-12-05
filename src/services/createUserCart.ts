import { prisma } from "@prisma/PrismaClient";

export async function createUserCart(
   sessionId?: number | null,
   token?: string,
) {
   return await prisma.cart.create({
      data: {
         token: sessionId ? undefined : token,
         userId: sessionId ? Number(sessionId) : undefined,
         items: {
            create: [],
         },
      },
   });
}
