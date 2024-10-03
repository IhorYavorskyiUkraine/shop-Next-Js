"use client";

import { Trash2 } from "lucide-react";
import { useCartStore } from "../store";

interface Props {
   itemId: number;
}

export const CartDeleteBtn: React.FC<Props> = ({ itemId }) => {
   const [fetchCart, removeFromCart] = useCartStore(state => [
      state.fetchCart,
      state.removeFromCart,
   ]);

   const handleRemoveFromCart = async (itemId: number) => {
      await removeFromCart(itemId);
      fetchCart();
   };

   return (
      <Trash2
         onClick={() => handleRemoveFromCart(itemId)}
         color={"#FF3333"}
         className="cursor-pointer"
         size={16}
      />
   );
};
