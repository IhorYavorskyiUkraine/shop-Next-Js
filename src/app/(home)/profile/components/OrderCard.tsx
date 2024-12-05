import { OrderItem } from "@/@types/Order";
import { cn } from "@/lib";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { ProductCard } from "./ProductCard";

interface Props {
   id: number;
   open: boolean;
   address: string;
   status: string;
   comment: string | null;
   phone: string;
   totalAmount: number;
   items: OrderItem[];
   setOpen: (open: boolean) => void;
}

export const OrderCard: React.FC<Props> = ({
   id,
   open,
   setOpen,
   address,
   status,
   comment,
   phone,
   totalAmount,
   items,
}) => {
   const orderDetails = {
      "Delivery Address": address,
      "Order Status": status,
      Comment: comment,
      Phone: phone,
   };

   const totalProductPrice = items?.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
   );

   const deliveryFee = 15;

   return (
      <article className="mb-4 border-b-[1px] border-black/10 pb-4 last:mb-0 last:border-b-0 last:pb-0">
         <div
            className={cn(
               open && "!grid-cols-[auto_16px]",
               "grid cursor-pointer grid-cols-[auto_1fr_1fr_16px] items-center",
            )}
            onClick={() => setOpen(!open)}
         >
            <div className="mb-2 flex items-center justify-between">
               <h3 className="pr-4 text-xl font-bold leading-27 md:text-lg">
                  Order#{id}
               </h3>
            </div>
            {open || (
               <div className="flex gap-2">
                  {items?.map((item, index) => (
                     <Image
                        key={index}
                        width={50}
                        height={50}
                        loading="lazy"
                        src={item.productVariantOption.imageUrl[0]}
                        alt=""
                     />
                  ))}
               </div>
            )}
            {open || (
               <div className="flex items-center justify-center text-xl font-bold leading-27 md:text-lg">
                  ${totalProductPrice * 0.8 + deliveryFee}
               </div>
            )}
            <ChevronDown className={cn(open && "rotate-180")} size={16} />
         </div>
         {open && (
            <div className="mt-4">
               <ul className="mb-4 grid grid-cols-1 border-b-[1px] border-b-black/10 pb-4 md:grid-cols-2">
                  {Object.entries(orderDetails).map(
                     ([key, value]) =>
                        value && (
                           <li
                              key={key}
                              className="flex items-center justify-between gap-4 text-sm font-medium leading-22 opacity-60"
                           >
                              {key}: {value}
                           </li>
                        ),
                  )}
               </ul>
               <div className="mb-2 grid">
                  {items?.map((item: OrderItem) => (
                     <ProductCard
                        key={item.productVariantOption.product.id}
                        id={item.productVariantOption.product.id}
                        imageUrl={item.productVariantOption.imageUrl[0]}
                        name={item.productVariantOption.product.name}
                        category={
                           item.productVariantOption.product.productCategory
                              .name
                        }
                        quantity={item.quantity}
                        price={item.price}
                        size={item.size.size}
                     />
                  ))}
               </div>
               <div>
                  <div className="flex justify-between">
                     Price: <span>${totalProductPrice * 0.8}</span>
                  </div>
                  <div className="mb-3 flex justify-between">
                     Delivery: <span>${deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold leading-27 md:text-lg">
                     Total Amount: <span>${totalAmount}</span>
                  </div>
               </div>
            </div>
         )}
      </article>
   );
};
