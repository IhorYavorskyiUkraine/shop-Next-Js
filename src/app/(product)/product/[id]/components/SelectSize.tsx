import {
   ProductVariantOptionWithSizes,
   ProductWithOptions,
} from "@/@types/ProductWithOptions";
import { useProductStore } from "../store";
import { sizes } from "../../../../../../prisma/products";
import { cn } from "@/lib/utils";

interface Props {
   product: ProductWithOptions;
}

export const SelectSize: React.FC<Props> = ({ product }) => {
   const [variant, setSize, size] = useProductStore(state => [
      state.variant,
      state.setSize,
      state.size,
   ]);

   const activeVariant = product.productVariantOptions.find(
      option => option.colorId === variant?.colorId,
   ) as ProductVariantOptionWithSizes;

   if (!activeVariant) {
      return null;
   }

   return (
      <div className="border-b-[1px] border-black/10 py-6">
         <p className="mb-2 leading-19 opacity-60 md:mb-4 md:text-md md:leading-22">
            Select Size
         </p>
         <div className="flex flex-wrap gap-4">
            {activeVariant.sizes.map(
               (sizeOption: { id: number; size: string }) => {
                  const isActive = size === sizeOption.size;
                  const sizeData = sizes.find(s => s.size === sizeOption.size);

                  return (
                     <button
                        key={sizeOption.id}
                        onClick={() => setSize(sizeOption.size)}
                        className={cn(
                           isActive && "!bg-black text-white",
                           "rounded-full bg-[#F0F0F0] px-5 py-[10px] md:px-6 md:py-3",
                        )}
                     >
                        {sizeData?.size || "Unknown"}
                     </button>
                  );
               },
            )}
         </div>
      </div>
   );
};
