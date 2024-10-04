import { useProductStore } from "../store";
import { sizes } from "../../../../../../prisma/products";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export const SelectSize: React.FC = () => {
   const [product, variant, setQuantity, setSize, size] = useProductStore(
      state => [
         state.product,
         state.variant,
         state.setQuantity,
         state.setSize,
         state.size,
      ],
   );

   if (!product) {
      return null;
   }

   const activeVariant = product.productVariantOptions.find(
      option => option.colorId === variant?.colorId,
   );

   useEffect(() => {
      if (activeVariant?.sizes.length) {
         const newSize = activeVariant.sizes.find(s => s === size)
            ? size
            : activeVariant.sizes[0];
         setSize(newSize);
      }

      setQuantity(0);
   }, [activeVariant, size, setSize]);

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
                  const isActive = size === sizeOption;
                  const sizeData = sizes.find(s => s.size === sizeOption.size);

                  return (
                     <button
                        key={sizeOption.id}
                        onClick={() => setSize(sizeOption)}
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
