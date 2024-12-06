import { CartItem } from "@/@types/Cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag } from "lucide-react";
import { CartCheckOutButton } from "./CartCheckOutButton";
import { CartInfo } from "./CartInfo";

interface Props {
   cartItems: CartItem[];
   contactOpen: boolean;
   firstOrder: boolean;
   isSubmitting: boolean;
   triggerSubmit: () => void;
   setContactOpen: (value: boolean) => void;
}

export const CartOrderSummary: React.FC<Props> = ({
   cartItems,
   contactOpen,
   setContactOpen,
   isSubmitting,
   triggerSubmit,
   firstOrder,
}) => {
   const totalCartPrice =
      cartItems?.reduce((cartTotal, item) => {
         const itemTotal = item.productVariantOption
            ? Number(item.productVariantOption.price)
            : 0;
         return cartTotal + itemTotal * (item.quantity || 1);
      }, 0) || 0;

   const discount = firstOrder ? totalCartPrice * 0.2 : 0;
   const deliveryFee = 15;
   const totalWithDiscount =
      totalCartPrice - discount + (totalCartPrice > 0 ? deliveryFee : 0) || 0;

   return (
      <div className="rounded-[20px] border-[1px] border-black/10 p-5 md:p-6">
         <h2 className="text-lg font-bold leading-27 md:text-xl">
            Order Summary
         </h2>
         <div className="border-b-[1px] border-black/10 py-3">
            <CartInfo
               text="Subtotal"
               price={Number(totalCartPrice?.toFixed(2))}
            />
            {Boolean(discount) && (
               <CartInfo
                  text="Discount (-20%)"
                  discount
                  price={Number(discount.toFixed(2))}
               />
            )}
            <CartInfo
               text="Delivery Fee"
               price={Number(totalWithDiscount > 0 ? deliveryFee : 0)}
            />
         </div>
         <div className="flex items-center justify-between py-3 md:py-4">
            <span className="text-md leading-22 md:text-lg md:leading-27">
               Total
            </span>
            <span className="text-lg font-bold leading-27">
               ${Number(totalWithDiscount.toFixed(2))}
            </span>
         </div>
         <div className="mb-4 grid grid-cols-[1fr,_90px] gap-2 md:mb-6">
            <Input
               icon={<Tag size={16} />}
               iconHidden={false}
               placeholder="Add promo code"
            />
            <Button type="button" variant="black">
               Apply
            </Button>
         </div>
         <CartCheckOutButton
            triggerSubmit={triggerSubmit}
            isSubmitting={isSubmitting}
            contactOpen={contactOpen}
            setContactOpen={setContactOpen}
         />
      </div>
   );
};
