import { StarRating } from "@/components/shared/StarRating";
import { Title } from "@/components/ui/title";
import { SelectColor } from "./SelectColor";
import { ProductWithOptions } from "@/@types/ProductWithOptions";
import { SelectSize } from "./SelectSize";
import { ProductAddToCart } from "./ProductAddToCart";

interface Props {
   product: ProductWithOptions;
}

export const ProductAbout: React.FC<Props> = ({ product }) => {
   const { price, oldPrice } = product;

   const discountPercentage = oldPrice
      ? ((oldPrice - price) / oldPrice) * 100
      : 0;

   return (
      <div>
         <Title
            className="md:md-4 mb-3 text-xl md:text-4xl md:leading-10"
            size="lg"
            text={product?.name}
         />
         <div className="mb-3 flex items-center gap-2 md:mb-6">
            <StarRating readonly rating={product.rating || 0} />
            <span className="md:leading-0">{product.rating || 0}/5</span>
         </div>
         <div className="mb-5 flex gap-2 text-xl font-bold leading-27 md:mb-6 md:text-2xl">
            <p>${price}</p>
            {discountPercentage > 0 && (
               <p className="line-through opacity-40">${oldPrice}</p>
            )}
            {discountPercentage > 0 && (
               <div className="rounded-[62px] bg-[#FF33331A]/10 px-[14px] py-[6px] text-sm font-medium leading-[14px] text-[#FF3333] md:text-md md:leading-[16px]">
                  -{discountPercentage.toFixed(0)}%
               </div>
            )}
         </div>
         {product.description && (
            <p className="border-b-[1px] border-black/10 pb-3 leading-20 opacity-60 md:text-md md:leading-22">
               {product.description}
            </p>
         )}
         <SelectColor product={product} />
         <SelectSize product={product} />
         <ProductAddToCart />
      </div>
   );
};
