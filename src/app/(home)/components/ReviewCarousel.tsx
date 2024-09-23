import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { prisma } from "../../../../prisma/PrismaClient";

export const ReviewCarousel: React.FC = async () => {
   const reviews = await prisma.review.findMany({
      include: {
         author: true,
      },
   });

   return (
      <CarouselContent className="flex gap-2">
         {reviews.map((review, index) => (
            <CarouselItem
               key={index}
               className="max-w-[358px] md:max-w-[400px]"
            >
               <ReviewCard
                  rating={review.rating}
                  name={review.author.fullName}
                  checked={true}
                  text={review.text}
               />
            </CarouselItem>
         ))}
      </CarouselContent>
   );
};
