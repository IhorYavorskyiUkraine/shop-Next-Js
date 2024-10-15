import { prisma } from "../../prisma/PrismaClient";

export async function getUserOrders(token: string, sessionId: number) {
   return await prisma.order.findMany({
      where: {
         OR: [{ token }, { userId: sessionId }],
      },
      include: {
         items: {
            include: {
               productVariantOption: {
                  include: {
                     product: true,
                     sizes: true,
                     color: true,
                  },
               },
            },
         },
      },
   });
}
