"use client";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "../store";

interface Props {
   itemId: number;
   itemName: string;
}

export const CartDeleteBtn: React.FC<Props> = ({ itemId, itemName }) => {
   const [fetchCart, removeFromCart] = useCartStore(state => [
      state.fetchCart,
      state.removeFromCart,
   ]);

   const handleRemoveFromCart = async (itemId: number) => {
      await removeFromCart(itemId);

      fetchCart();

      toast.success(`${itemName} removed from cart`, {
         icon: "✅",
      });
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Trash2 color={"#FF3333"} className="cursor-pointer" size={16} />
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuLabel>Are you sure?</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleRemoveFromCart(itemId)}>
               Yes
            </DropdownMenuItem>
            <DropdownMenuItem>No</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
