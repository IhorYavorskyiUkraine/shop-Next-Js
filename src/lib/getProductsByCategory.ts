import { prisma } from "../../prisma/PrismaClient";

const categoryMap: { [key: string]: number } = {
   new_arrivals: 1,
   top_selling: 2,
};

export const getProductsByCategory = async (category: string) => {
   const categoryId = categoryMap[category] ?? null;

   try {
      const whereCondition = categoryId
         ? { categoryId }
         : { oldPrice: { not: null } };

      const products = await prisma.product.findMany({
         where: whereCondition,
         include: {
            productVariantOptions: {
               include: {
                  sizes: true,
               },
            },
         },
      });

      return products;
   } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products.");
   }
};
