import {
   CarouselNext,
   Carousel,
   CarouselPrevious,
} from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { ReviewCarousel } from "../../home/components/ReviewCarousel";

export const Reviews: React.FC = () => {
   return (
      <section className="py-[50px] md:py-[80px]">
         <Carousel>
            <Container>
               <div className="md:md-10 mb-6 flex items-end justify-between">
                  <Title text="Our Happy Customers" size="lg" />
                  <div className="flex gap-5">
                     <CarouselPrevious />
                     <CarouselNext />
                  </div>
               </div>
            </Container>
            <ReviewCarousel />
         </Carousel>
      </section>
   );
};
