import { Hero } from "@/modules";
import { DressStyle } from "@/modules/sections/DressStyle";
import { ProductsWithCategories } from "@/modules/sections/productsWithCategories/ProductsWithCategories";
import { Reviews } from "@/modules/sections/reviews/Reviews";

export default function Home() {
   return (
      <>
         <Hero />
         <ProductsWithCategories categoryId={1} title="new arrivals" />
         <ProductsWithCategories categoryId={2} title="top selling" />
         <DressStyle />
         <Reviews />
      </>
   );
}
