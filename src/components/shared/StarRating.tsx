"use client";

import { Rating } from "react-simple-star-rating";

interface Props {
   rating: number;
   readonly?: boolean;
}

export const StarRating: React.FC<Props> = ({ rating, readonly = false }) => {
   return (
      <Rating
         className="-translate-y-[3px]"
         readonly={readonly}
         allowFraction
         size={20}
         initialValue={rating}
      />
   );
};
