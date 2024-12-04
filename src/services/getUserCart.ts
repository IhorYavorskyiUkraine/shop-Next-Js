import { prisma } from "@prisma/PrismaClient";

export async function getUserCart(sessionId?: number, token?: string | null) {
   const userId = sessionId ? sessionId : null;
   const whereClause = sessionId ? { userId: Number(userId) } : { token };

   if (!whereClause) {
      throw new Error("No valid identifier for cart");
   }

   return await prisma.cart.findFirst({
      where: whereClause,
      include: {
         items: {
            orderBy: {
               createdAt: "desc",
            },
            include: {
               product: true,
               productVariantOption: {
                  include: {
                     sizes: true,
                     color: true,
                  },
               },
               size: true,
            },
         },
      },
   });
}
