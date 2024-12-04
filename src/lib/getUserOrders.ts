import { prisma } from "@prisma/PrismaClient";

export async function getUserOrders(
   sessionId?: number,
   email?: string,
   token?: string,
) {
   const whereClause = sessionId ? { email } : { userId: sessionId };

   return await prisma.order.findMany({
      where: whereClause || { token },
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

export type UserOrdersType = Awaited<ReturnType<typeof getUserOrders>>;
