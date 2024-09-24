"use client";

import { ProductWithOptions } from "@/@types/ProductWithOptions";
import { colors } from "../../../../../../prisma/products";
import { useProductStore } from "../store";
import { Check } from "lucide-react";

interface Props {
   product: ProductWithOptions;
}

export const SelectColor: React.FC<Props> = ({ product }) => {
   const [setVariant, variant, setColor] = useProductStore(state => [
      state.setVariant,
      state.variant,
      state.setColor,
   ]);

   const onItemClick = (option, color) => {
      setVariant(option);
      setColor(color.color);
   };

   return (
      <div className="border-b-[1px] border-black/10 py-6">
         <p className="mb-2 leading-19 opacity-60 md:mb-4 md:text-md md:leading-22">
            Select Color
         </p>
         <div className="flex gap-4">
            {product.productVariantOptions.map(option => {
               const color = colors.find(c => c.id === option.colorId);
               return (
                  <button
                     onClick={() => {
                        onItemClick(option, color);
                     }}
                     key={option.colorId}
                     style={{
                        backgroundColor: color ? color.color : "transparent",
                     }}
                     className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full"
                  >
                     {variant?.colorId === option.colorId && (
                        <Check size={16} color={"white"} />
                     )}
                  </button>
               );
            })}
         </div>
      </div>
   );
};
