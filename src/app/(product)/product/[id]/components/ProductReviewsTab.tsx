import { ReviewCard } from "@/components/shared/ReviewCard";
import { ProductReviewsTabOptions } from "./ProductReviewsTabOptions";
import { ProductWithRelations } from "@/@types/ProductWithOptions";

interface Props {
   product: ProductWithRelations;
}

export const ProductReviewsTab: React.FC<Props> = ({ product }) => {
   function formatCreatedAt(createdAt: Date) {
      const date = new Date(createdAt);

      if (isNaN(date.getTime())) {
         return "Invalid Date";
      }

      const options: Intl.DateTimeFormatOptions = {
         year: "numeric",
         month: "long",
         day: "numeric",
      };

      const formattedDate = date.toLocaleDateString("en-US", options);

      return `Posted on ${formattedDate}`;
   }

   return (
      <section className="py-6">
         <div className="flex justify-between">
            <h2 className="relative mb-2 inline-block text-lg font-bold md:mb-4 md:text-xl">
               All Reviews
               <span className="absolute -right-5 bottom-0 text-sm leading-22 opacity-60">
                  ({product.reviews.length})
               </span>
            </h2>
            <ProductReviewsTabOptions />
         </div>
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {product.reviews?.map(review => (
               <ReviewCard
                  key={review.id}
                  name={review.author.fullName}
                  rating={review.rating}
                  text={review.text}
                  checked={review.purchase?.productId === product.id}
                  reviewDate={formatCreatedAt(review.createdAt)}
               />
            ))}
         </div>
      </section>
   );
};
