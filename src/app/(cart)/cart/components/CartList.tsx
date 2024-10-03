import { CartItem as TCartItem } from "@prisma/client";
import { CartItem } from "./CartItem";

interface Props {
   cartItems: TCartItem &
      {
         productVariantOption: {
            imageUrl: string[];
            color: {
               color: string;
            };
            price: number;
         };
      }[];
}

export const CartList: React.FC<Props> = ({ cartItems }) => {
   return (
      <div className="flex flex-1 flex-col rounded-[20px] border-[1px] border-black/10 px-4 md:px-6">
         {cartItems?.map((cartItem, index) => (
            <CartItem
               className={`${index !== cartItems.length - 1 ? "border-b border-black/10" : ""}`}
               key={index}
               cartItem={cartItem}
            />
         ))}
      </div>
   );
};
