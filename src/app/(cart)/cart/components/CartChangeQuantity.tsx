"use client";

import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "../store";
import { useEffect } from "react";

interface Props {
   id: number;
   quantity: number;
}

export const CartChangeQuantity: React.FC<Props> = ({ id, quantity }) => {
   const [newQuantity, setNewQuantity] = useCartStore(state => [
      state.newQuantity,
      state.setNewQuantity,
   ]);

   const onClickCountButton = (
      id: number,
      quantity: number,
      type: "plus" | "minus",
   ) => {
      const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
      // updateItemQuantity(id, newQuantity);
   };

   return (
      <div className="flex h-[31px] items-center justify-between gap-5 rounded-full bg-[#F0F0F0] px-4 py-3 md:h-11 lg:justify-center">
         <button
            className={cn(
               newQuantity === 0 && "opacity-50",
               "inline-flex items-center justify-center",
            )}
            onClick={() => onClickCountButton(id, newQuantity, "minus")}
            type="minus"
            disabled={newQuantity === 0}
         >
            <Minus size={16} />
         </button>
         <span>{newQuantity}</span>
         <button
            className="inline-flex items-center justify-center"
            onClick={() => onClickCountButton(id, newQuantity, "plus")}
            type="plus"
         >
            <Plus size={16} />
         </button>
      </div>
   );
};
