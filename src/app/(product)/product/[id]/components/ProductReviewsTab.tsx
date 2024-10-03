"use client";

import { ReviewCard } from "@/components/shared/ReviewCard";
import { ProductReviewsTabOptions } from "./ProductReviewsTabOptions";
import { useProductStore } from "../store";
import { useEffect, useState } from "react";
import { Review } from "@/@types/Author";

export const ProductReviewsTab: React.FC = () => {
   const [product, fetchReviews, reviews] = useProductStore(state => [
      state.product,
      state.fetchReviews,
      state.reviews,
   ]);

   const [orderBy, setOrderBy] = useState("desc");

   if (!product || !reviews) {
      return null;
   }

   useEffect(() => {
      if (product?.id) {
         fetchReviews({ id: product.id, orderBy });
      }
   }, [orderBy, fetchReviews, product?.id]);

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
         <div className="flex items-center justify-between pb-6">
            <h2 className="relative mb-2 inline-block text-lg font-bold md:mb-4 md:text-xl">
               All Reviews
               <span className="absolute -right-5 bottom-0 text-sm leading-22 opacity-60">
                  ({reviews.length})
               </span>
            </h2>
            <ProductReviewsTabOptions setOrderBy={setOrderBy} />
         </div>
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {reviews.map((review: Review) => (
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
