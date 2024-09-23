import { ProductsWithCategories } from "@/modules";
import { Reviews } from "@/app/(home)/sections/reviews/Reviews";
import { DressStyle } from "./sections/DressStyle";
import { Hero } from "./sections/Hero";

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
