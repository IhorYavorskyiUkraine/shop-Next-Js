import { prisma } from "@prisma/PrismaClient";

export async function getUserAddress(sessionId: number) {
   let userAddress = await prisma.userAddressBook.findUnique({
      where: { id: sessionId },
      include: {
         address: true,
      },
   });

   if (!userAddress) {
      userAddress = await prisma.userAddressBook.create({
         data: {
            userId: sessionId,
         },
         include: {
            address: true,
         },
      });
   }

   return userAddress;
}
