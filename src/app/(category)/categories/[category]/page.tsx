import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { Container } from "@/components/ui/container";
import { Prisma } from "@prisma/client";
import { Hero } from "../../components/Hero";

export type ProductWithVariants = Prisma.ProductGetPayload<{
   include: {
      productVariantOptions: {
         include: {
            sizes: true;
         };
      };
   };
}>;

const CategoriesPage = async ({ params }: { params: { category: string } }) => {
   if (!params.category) {
      return <h1>Category not found</h1>;
   }

   const breadCrumbName = () => {
      switch (params.category) {
         case "new_arrivals":
            return "New Arrivals";
         case "top_selling":
            return "Top Selling";
         case "on_sale":
            return "On Sale";
         default:
            return "All Products";
      }
   };

   const crumbName = breadCrumbName();

   return (
      <Container>
         <BreadCrumb
            name={{
               name: crumbName,
               link: `/categories/${params.category}`,
            }}
         />
         <Hero crumbName={crumbName} category={params.category} />
      </Container>
   );
};

export default CategoriesPage;
