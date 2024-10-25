import { prisma } from "../../prisma/PrismaClient";

export async function getUser(sessionId: number) {
   return await prisma.user.findFirst({
      where: { id: sessionId },
      include: {
         usersAddressBook: {
            include: {
               address: true,
            },
         },
      },
   });
}
