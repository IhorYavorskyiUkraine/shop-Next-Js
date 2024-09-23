import Link from "next/link";
import { StarRating } from "./StarRating";
import { productCategories } from "../../../prisma/products";

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
   const discountPercentage = oldPrice
      ? ((oldPrice - price) / oldPrice) * 100
      : 0;

   return (
      <Link className={className} href={`/product/${id}`}>
         <div className="mb-[10px] h-[200px] w-[200px] rounded-[14px] bg-[#F0EEED] md:mb-4 md:h-[300px] md:w-[300px] md:rounded-[20px]">
            <img src={imageUrl} alt={""} />
         </div>
         <h4 className="text-md font-bold leading-22 md:text-lg md:leading-27">
            {name}
         </h4>
         <div className="mb-1 flex items-center gap-2 md:mb-2">
            <StarRating rating={rating} />
            <p className="leading-20">{rating}/5</p>
         </div>
         <div className="flex gap-2 text-lg font-bold leading-27 md:text-xl">
            <p>${price}</p>
            {discountPercentage > 0 && (
               <p className="line-through opacity-40">${oldPrice}</p>
            )}
            {discountPercentage > 0 && (
               <div className="rounded-[62px] bg-[#FF33331A]/10 px-[14px] py-[6px] text-[10px] font-medium leading-[14px] text-[#FF3333] md:text-xs md:leading-[16px]">
                  -{discountPercentage.toFixed(0)}%
               </div>
            )}
         </div>
      </Link>
   );
};
