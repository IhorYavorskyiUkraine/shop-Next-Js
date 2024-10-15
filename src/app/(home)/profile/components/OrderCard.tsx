import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { MutableRefObject } from "react";

interface Props {
   ref: MutableRefObject<null>;
   id: number;
   open: boolean;
   address: string;
   status: string;
   comment: string;
   phone: string;
   totalAmount: number;
   items: any[];
   setOpen: (open: boolean) => void;
}

export const OrderCard: React.FC<Props> = ({
   ref,
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

   const productName = items
      .map((item: any) => item.productVariantOption.product.name)
      .join(", ");

   return (
      <article
         ref={ref}
         className="mb-4 border-b-[1px] border-black/10 pb-4 last:mb-0 last:border-b-0 last:pb-0"
         onClick={() => setOpen(!open)}
      >
         <div className="flex cursor-pointer items-center justify-between">
            <h3 className="text-xl font-bold leading-27 md:text-lg">
               Order#{id}
            </h3>
            <ChevronDown className={cn(open && "rotate-180")} size={16} />
         </div>
         {open && (
            <div className="mt-4">
               <ul className="mb-4 grid grid-cols-1 md:grid-cols-2">
                  {Object.entries(orderDetails).map(([key, value]) => (
                     <li
                        key={key}
                        className="flex items-center justify-between gap-4 text-sm font-medium leading-22 opacity-60"
                     >
                        {key}: {value}
                     </li>
                  ))}
               </ul>
               <div>
                  <div className="flex gap-2">
                     {items?.map(item => (
                        <Link
                           href={`/product/${item.productVariantOption.product.id}`}
                        >
                           <img
                              className="h-20 w-20"
                              src={item.productVariantOption.imageUrl[0]}
                              alt="Product Image"
                           />
                        </Link>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </article>
   );
};
