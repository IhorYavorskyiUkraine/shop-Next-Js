"use client";

import { ReviewCard } from "@/components/shared/ReviewCard";
import { ProductReviewsTabOptions } from "./ProductReviewsTabOptions";
import { useProductStore } from "../store";
import { Review } from "@/@types/Product";
import { Button } from "@/components/ui/button";
import { formatCreatedAt } from "@/lib/getDataReview";

export const ProductReviewsTab: React.FC = () => {
   const [product, reviews, hasMoreReviews, limit, setLimit] = useProductStore(
      state => [
         state.product,
         state.reviews,
         state.hasMoreReviews,
         state.limit,
         state.setLimit,
      ],
   );

   if (!product || !reviews) {
      return null;
   }

   return (
      <section className="py-6">
         <div className="flex items-center justify-between pb-6">
            <h2 className="relative mb-2 inline-block text-lg font-bold md:mb-4 md:text-xl">
               All Reviews
               <span className="absolute -right-5 bottom-0 text-sm leading-22 opacity-60">
                  ({product.reviews.length})
               </span>
            </h2>
            <ProductReviewsTabOptions />
         </div>
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {reviews.map((review: Review) => (
               <ReviewCard
                  key={review?.id}
                  name={review?.author?.fullName}
                  rating={review?.rating}
                  text={review?.text}
                  checked={review?.purchase?.productId === product.id}
                  reviewDate={formatCreatedAt(review?.createdAt)}
               />
            ))}
         </div>
         {hasMoreReviews && (
            <div className="mt-4 flex justify-center">
               {reviews.length > 0 && (
                  <Button onClick={() => setLimit(limit + 6)}>
                     Load More Reviews
                  </Button>
               )}
            </div>
         )}
      </section>
   );
};
