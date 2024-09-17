import { Hero } from "@/modules";
import { ProductsWithCategories } from "@/modules/sections/productsWithCategories/ProductsWithCategories";

export default function Home() {
   return (
      <>
         <Hero />
         <ProductsWithCategories categoryId={1} title="new arrivals" />
      </>
   );
}
