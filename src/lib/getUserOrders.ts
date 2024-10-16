import { prisma } from "../../prisma/PrismaClient";

export async function getUserOrders(sessionId: number) {
   return await prisma.order.findMany({
      where: { userId: sessionId },
      include: {
         items: {
            include: {
               productVariantOption: {
                  include: {
                     product: {
                        include: {
                           productCategory: true,
                        },
                     },
                  },
               },
               size: true,
            },
         },
      },
      orderBy: {
         createdAt: "desc",
      },
   });
}
