import { ReviewCard } from "@/components/shared/ReviewCard";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getDataReview } from "@/lib";
import { prisma } from "@prisma/PrismaClient";

export const ReviewCarousel: React.FC = async () => {
   const reviews = await prisma.review.findMany({
      include: {
         reviewReplies: true,
         author: {
            select: {
               imageUrl: true,
               fullName: true,
            },
         },
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
                  userImage={review.author.imageUrl}
                  reviewDate={getDataReview(review?.createdAt)}
                  home
               />
            </CarouselItem>
         ))}
      </CarouselContent>
   );
};
