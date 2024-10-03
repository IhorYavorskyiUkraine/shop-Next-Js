"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useProductStore } from "../store";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/app/(cart)/cart/store";
import { ProductWithRelations } from "@/@types/ProductWithOptions";

interface Props {
   product: ProductWithRelations;
   variant: any;
}

export const ProductAddToCart: React.FC<Props> = ({ product, variant }) => {
   const [quantity, setQuantity, size] = useProductStore(state => [
      state.quantity,
      state.setQuantity,
      state.size,
   ]);

   const [addToCart] = useCartStore(state => [state.addToCart]);

   const handleAddToCart = async () => {
      setQuantity(quantity || 1);

      const item = {
         productId: product.id,
         productVariantOptionId: variant.id,
         quantity: quantity || 1,
         sizeId: size.id,
      };

      addToCart(item);
   };

   return (
      <div className="grid grid-cols-[112px,_1fr] items-center gap-3 py-6 md:grid-cols-1 lg:grid-cols-[112px,_1fr]">
         <div className="flex h-[52px] items-center justify-between gap-4 rounded-full bg-[#F0F0F0] px-4 py-3 lg:justify-center">
            <button
               className={cn(
                  quantity === 0 && "opacity-50",
                  "inline-flex items-center justify-center",
               )}
               onClick={() => setQuantity(quantity - 1)}
               disabled={quantity === 0}
            >
               <Minus size={20} />
            </button>
            <span>{quantity}</span>
            <button
               className="inline-flex items-center justify-center"
               onClick={() => setQuantity(quantity + 1)}
            >
               <Plus size={20} />
            </button>
         </div>
         <Button
            className="md:w-full"
            onClick={handleAddToCart}
            variant="black"
         >
            Add to Cart
         </Button>
      </div>
   );
};
