import { ProductsWithCategories } from "@/modules";
import { Reviews } from "@/app/(home)/sections/reviews/Reviews";
import { DressStyle } from "../sections/DressStyle";
import { Hero } from "../sections/Hero";
import { Container } from "@/components/ui/container";

export default function Home() {
   return (
      <>
         <Hero />
         <Container>
            <ProductsWithCategories categoryId={1} title="new arrivals" />
            <ProductsWithCategories categoryId={2} title="top selling" />
         </Container>
         <DressStyle />
         <Reviews />
      </>
   );
}
