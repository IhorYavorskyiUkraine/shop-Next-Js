import { Container } from "@/components/ui/container";
import { prisma } from "../../../../prisma/PrismaClient";
import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { Title } from "@/components/ui/title";
import { BrandCard } from "./components/BrandCard";

const BrandsPage = async () => {
   const brands = await prisma.product.findMany({
      select: {
         brand: true,
      },
      distinct: ["productBrandId"],
   });

   return (
      <Container>
         <BreadCrumb name={{ name: "Brands", link: "/brands" }} />
         <Title text="Popular Brands" className="mb-5 text-center" />
         <div className="grid grid-cols-2 py-5 md:grid-cols-4">
            {brands.map((item, index) => (
               <BrandCard key={index} item={item} />
            ))}
         </div>
      </Container>
   );
};

export default BrandsPage;
