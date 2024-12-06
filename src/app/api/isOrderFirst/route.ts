import { prisma } from "@prisma/PrismaClient";

export async function isOrderFirst(userId?: number) {
   const ordersCount = await prisma.order.count({
      where: { userId },
   });

   return ordersCount === 0;
}
