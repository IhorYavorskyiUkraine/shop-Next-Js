import { prisma } from "../../prisma/PrismaClient";
import { getSessionId } from "./getSessionId";

export async function getWishList() {
   const sessionId = await getSessionId();

   const wishList = await prisma.wishList.findFirst({
      where: { userId: sessionId },
      include: {
         items: {
            orderBy: {
               createdAt: "desc",
            },
         },
      },
   });

   if (!wishList) {
      return await prisma.wishList.create({
         data: {
            userId: sessionId,
         },
      });
   }

   return wishList;
}
