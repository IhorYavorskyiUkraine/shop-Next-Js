import { Container } from "@/components/ui/container";
import { prisma } from "../../../../../prisma/PrismaClient";
import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { ProductInfo } from "@/app/(product)/product/[id]/sections/ProductInfo";
import { ProductTabs } from "./sections/ProductTabs";

interface Props {
   params: {
      id: string;
   };
}

const ProductPage = async ({ params: { id } }: Props) => {
   const product = await prisma.product.findFirst({
      where: { id: Number(id) },
      include: {
         productVariantOptions: {
            include: {
               sizes: true,
            },
         },
         productDetails: true,
         reviews: true,
      },
   });

   if (!product) {
      return <p>Product not found</p>;
   }

   return (
      <Container>
         <BreadCrumb name={product.name} />
         <ProductInfo product={product} />
         <ProductTabs product={product} />
      </Container>
   );
};

export default ProductPage;
