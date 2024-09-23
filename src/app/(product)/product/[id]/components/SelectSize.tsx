import { ProductWithOptions } from "@/@types/ProductWithOptions";
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
   );

   if (!activeVariant) {
      return null;
   }

   return (
      <div className="flex gap-4">
         {activeVariant.sizes.map(sizeOption => {
            const isActive = size === sizeOption.id;
            const sizeData = sizes.find(s => s.id === sizeOption.id);

            return (
               <button
                  key={sizeOption.id}
                  onClick={() => setSize(sizeOption.id)}
                  className={cn(
                     isActive && "!bg-black text-white",
                     "rounded-full bg-[#F0F0F0] px-5 py-[10px] md:px-6 md:py-3",
                  )}
               >
                  {sizeData?.size || "Unknown"}
               </button>
            );
         })}
      </div>
   );
};
