import Link from "next/link";
import { StarRating } from "./StarRating";

interface Props {
   id: number;
   imageUrl: string;
   name: string;
   rating: number;
   price: number;
   oldPrice?: number;
   className?: string;
}

export const ProductCard: React.FC<Props> = ({
   id,
   imageUrl,
   name,
   rating,
   price,
   oldPrice,
   className,
}) => {
   return (
      <Link className={className} href={`/product/${id}`}>
         <div className="mb-[10px] h-[200px] w-[200px] rounded-[14px] bg-[#F0EEED] md:mb-4 md:h-[300px] md:w-[300px] md:rounded-[20px]">
            <img src={imageUrl} alt={""} />
         </div>
         <h4 className="md:leading-27 text-md font-bold leading-22 md:text-lg">
            {name}
         </h4>
         <div className="mb-1 flex items-center md:mb-2">
            <StarRating rating={rating} />
            <p className="leading-20">{rating}/5</p>
         </div>
         <div className="leading-27 flex gap-1 text-lg font-bold md:text-xl">
            <p>${price}</p>
            {oldPrice !== 0 && <p>${oldPrice}</p>}
         </div>
      </Link>
   );
};
