import { ReviewCard } from "@/components/shared/ReviewCard";
import { Product } from "@prisma/client";

interface Props {
   product: Product;
}

export const ProductReviewsTab: React.FC<Props> = ({ product }) => {
   console.log(product);
   return (
      <section className="py-6">
         <h2 className="relative mb-2 inline-block text-lg font-bold md:mb-4 md:text-xl">
            All Reviews
            <span className="absolute -right-5 bottom-0 text-sm leading-22 opacity-60">
               ({product.reviews.length})
            </span>
         </h2>
         <div>
            {product.rewiews?.map(review => (
               <ReviewCard key={review.id} {...review} />
            ))}
         </div>
      </section>
   );
};
