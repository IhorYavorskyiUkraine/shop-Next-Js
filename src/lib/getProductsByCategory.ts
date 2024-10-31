import { prisma } from "../../prisma/PrismaClient";

export const getProductsByCategory = async (category: string) => {
   const categoryId = category === "new_arrivals" ? 1 : 2;

   const productsByCategory = await prisma.product.findMany({
      where: {
         categoryId,
      },
      include: {
         productVariantOptions: {
            include: {
               sizes: true,
            },
         },
      },
   });

   if (productsByCategory.length > 0) {
      return productsByCategory;
   }

   const productsOnSale = await prisma.product.findMany({
      where: {
         oldPrice: {
            gt: 0,
         },
      },
      include: {
         productVariantOptions: {
            include: {
               sizes: true,
            },
         },
      },
   });

   return productsOnSale;
};
