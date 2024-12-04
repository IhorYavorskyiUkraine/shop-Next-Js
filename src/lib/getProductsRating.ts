import { ProductWithVariantsAndDetails } from "@/@types/Product";
import { prisma } from "@prisma/PrismaClient";

export const getProductsRating = async (
   products: ProductWithVariantsAndDetails[],
) => {
   return Promise.all(
      products.map(async product => {
         const ratings = product.reviews.map(review => review.rating);
         const rating = ratings.length
            ? parseFloat(
                 (
                    ratings.reduce((acc, curr) => acc + curr, 0) /
                    ratings.length
                 ).toFixed(1),
              )
            : 0;

         if (rating !== product.rating) {
            try {
               await prisma.product.update({
                  where: { id: product.id },
                  data: { rating },
               });
            } catch (updateError) {
               console.error(
                  `Error updating product ${product.id}:`,
                  updateError,
               );
            }
         }

         return {
            ...product,
            rating,
         };
      }),
   );
};
