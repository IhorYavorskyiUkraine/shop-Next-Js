"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useProductStore } from "../store";
import { cn } from "@/lib/utils";

interface Props {}

export const ProductAddToCart: React.FC<Props> = ({}) => {
   const [quantity, setQuantity] = useProductStore(state => [
      state.quantity,
      state.setQuantity,
   ]);

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
         <Button className="md:w-full" variant="black">
            Add to Cart
         </Button>
      </div>
   );
};
