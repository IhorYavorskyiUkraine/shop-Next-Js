import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma/PrismaClient";
import { Hero } from "./sections/Hero";
import { ProductWithRelations } from "@/@types/ProductWithOptions";

interface Props {
   params: {
      id: string;
   };
}

const ProductPage = async ({ params: { id } }: Props) => {
   try {
      const product: ProductWithRelations | null =
         await prisma.product.findFirst({
            where: { id: Number(id) },
            include: {
               productVariantOptions: {
                  include: {
                     sizes: true,
                  },
               },
               productDetails: true,
               reviews: {
                  include: {
                     author: true,
                     purchase: true,
                  },
                  orderBy: {
                     createdAt: "desc",
                  },
               },
            },
         });

      if (!product) {
         notFound();
      }

      return <Hero product={product} />;
   } catch (error) {
      console.error("Error fetching product:", error);
      return notFound();
   }
};

export default ProductPage;
