"use client";

import { Rating } from "react-simple-star-rating";

interface Props {
   rating: number;
   readonly?: boolean;
}

export const StarRating: React.FC<Props> = ({ rating, readonly = false }) => {
   return (
      <Rating
         readonly={readonly}
         allowFraction
         size={20}
         initialValue={rating}
      />
   );
};
