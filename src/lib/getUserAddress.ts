import { prisma } from "../../prisma/PrismaClient";

export async function getUserAddress(sessionId: number) {
   return await prisma.userAddressBook.findMany({
      where: { id: sessionId },
      include: {
         address: true,
      },
      orderBy: {
         createdAt: "desc",
      },
   });
}
