import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ReviewCard } from "@/components/shared/ReviewCard";

export const ReviewCarousel: React.FC = () => {
   return (
      <CarouselContent className="flex gap-2">
         {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
               key={index}
               className="max-w-[358px] md:max-w-[400px]"
            >
               <ReviewCard
                  rating={4.5}
                  name="Aboba"
                  checked={true}
                  text={"adasd"}
               />
            </CarouselItem>
         ))}
      </CarouselContent>
   );
};
