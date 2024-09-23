"use client";

import { ProductWithOptions } from "@/@types/ProductWithOptions";
import { colors } from "../../../../../../prisma/products";
import { useProductStore } from "../store";

interface Props {
   product: ProductWithOptions;
}

export const SelectColor: React.FC<Props> = ({ product }) => {
   const [setVariant, setColor] = useProductStore(state => [
      state.setVariant,
      state.setColor,
   ]);

   const onItemClick = (option, color) => {
      setVariant(option);
      setColor(color.color);
   };

   return (
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
                  className="h-9 w-9 cursor-pointer rounded-full"
               ></button>
            );
         })}
      </div>
   );
};
