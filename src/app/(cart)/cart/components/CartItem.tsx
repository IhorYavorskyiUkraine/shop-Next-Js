import { CartDeleteBtn } from "./CartDeleteBtn";
import { cn } from "@/lib/utils";
import { CountButton } from "@/components/shared/CountButton";
import { useCartStore } from "../store";
import Link from "next/link";

import { CartItem as ICartItem } from "@/@types/Cart";

interface Props {
   cartItem: ICartItem;
   className?: string;
}

export const CartItem: React.FC<Props> = ({ cartItem, className }) => {
   const updateItemQuantity = useCartStore(state => state.updateItemQuantity);

   const onClickCountButton = (
      id: number,
      quantity: number,
      type: "plus" | "minus",
   ) => {
      const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
      updateItemQuantity(id, newQuantity);
   };

   return (
      <div className={cn(className, "flex gap-3 py-3 md:py-5")}>
         <div className="rounded-[8px] bg-[#F0EEED]">
            <Link href={`/product/${cartItem?.product?.id}`}>
               <img
                  className="size-[100px] md:size-[125px]"
                  src={cartItem?.productVariantOption?.imageUrl[0]}
                  alt="cartItem.imageUrl"
               />
            </Link>
         </div>
         <div className="flex-1">
            <div className="mb-1 flex items-center justify-between md:mb-2">
               <Link href={`/product/${cartItem?.product?.id}`}>
                  <h4 className="text-md font-bold leading-22 md:text-lg md:leading-27">
                     {cartItem?.product?.name || "no name"}
                  </h4>
               </Link>
               <CartDeleteBtn
                  itemId={cartItem?.id}
                  itemName={cartItem?.product?.name}
               />
            </div>
            <p className="mb-1 text-xs leading-[16px] md:mb-2 md:text-sm">
               Size:
               <span className="pl-1 opacity-60">
                  {cartItem?.size?.size || "no size"}
               </span>
            </p>
            <p className="mb-3 text-xs leading-[16px] md:mb-4 md:text-sm">
               Color:
               <span className="pl-1 opacity-60">
                  {cartItem?.productVariantOption?.color?.color || "no color"}
               </span>
            </p>
            <div className="flex items-center justify-between">
               <p className="text-lg font-bold leading-27 md:text-xl">
                  ${cartItem?.productVariantOption?.price || 0}
               </p>
               <CountButton
                  onClick={type =>
                     onClickCountButton(cartItem?.id, cartItem?.quantity, type)
                  }
                  minValue={1}
                  value={cartItem?.quantity}
               />
            </div>
         </div>
      </div>
   );
};
