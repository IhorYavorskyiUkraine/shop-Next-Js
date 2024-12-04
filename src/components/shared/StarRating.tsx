"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Rating } from "react-simple-star-rating";

interface Props {
   rating?: number;
   readonly?: boolean;
   size?: number;
   className?: string;
   onRatingChange?: (rate: number) => void;
}

export const StarRating = React.forwardRef<HTMLDivElement, Props>(
   (
      { rating, readonly = false, size = 20, className, onRatingChange },
      ref,
   ) => {
      const handleRating = (rate: number) => {
         if (onRatingChange) onRatingChange(rate);
      };

      return (
         <div ref={ref}>
            <Rating
               className={cn(className, "-translate-y-[3px]")}
               readonly={readonly}
               allowFraction
               size={size}
               initialValue={rating}
               onClick={handleRating}
            />
         </div>
      );
   },
);

StarRating.displayName = "StarRating";
