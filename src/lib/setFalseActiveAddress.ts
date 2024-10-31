import { prisma } from "../../prisma/PrismaClient";

export const setFalseActiveAddress = async () => {
   try {
      await prisma.address.updateMany({
         data: {
            active: false,
         },
      });
   } catch (e) {
      console.error(e);
   }
};
