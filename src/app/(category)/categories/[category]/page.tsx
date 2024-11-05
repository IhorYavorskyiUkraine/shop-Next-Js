import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { Container } from "@/components/ui/container";
import { getProductsByCategory } from "@/lib/getProductsByCategory";
import { ProductsFilter } from "../../components/ProductsFilter";
import { ProductsList } from "../../components/ProductsList";
import { Title } from "@/components/ui/title";
import { Prisma } from "@prisma/client";

export type ProductWithVariants = Prisma.ProductGetPayload<{
   include: {
      productVariantOptions: {
         include: {
            sizes: true;
         };
      };
   };
}>;

const CategoriesPage = async (props: { params: Promise<{ category: string }> }) => {
   const params = await props.params;
   if (!params.category) {
      return <h1>Category not found</h1>;
   }

   const products = await getProductsByCategory(params.category);

   const breadCrumbName = () => {
      switch (params.category) {
         case "new_arrivals":
            return "New Arrivals";
         case "top_selling":
            return "Top Selling";
         case "on_sale":
            return "On Sale";
         default:
            return "";
      }
   };

   const crumbName = breadCrumbName();

   if (crumbName === "") {
      return (
         <Container className="flex h-[400px] flex-col items-center justify-center">
            <Title text="Category not found" className="mb-5 text-center" />
            <p className="text-[64px]">😞</p>
         </Container>
      );
   }

   return (
      <Container>
         <BreadCrumb
            name={{
               name: crumbName,
               link: `/categories/${params.category}`,
            }}
         />
         <ProductsFilter products={products} />
         <ProductsList category={crumbName} products={products} />
      </Container>
   );
};

export default CategoriesPage;
