import { useState } from "react";
import { OrderCard } from "./OrderCard";
import { Title } from "@/components/ui/title";
import { Order } from "@prisma/client";

interface Props {
   userOrders: Order[] | null;
}

export const ProfileOrderHistoryTab: React.FC<Props> = ({ userOrders }) => {
   const [open, setOpen] = useState<number | null>(null);

   if (!userOrders || userOrders.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center">
            <Title text="No Orders Yet" className="mb-5 text-center" />
            <p className="text-[64px]">😞</p>
         </div>
      );
   }

   const toggleTab = (index: number) => {
      setOpen(open === index ? null : index);
   };

   return (
      <div className="rounded-[20px] bg-gray p-4">
         {userOrders?.map(
            (order: Order, index: number) => (
               console.log(order),
               (
                  <OrderCard
                     setOpen={() => toggleTab(index)}
                     open={open === index}
                     key={order.id}
                     {...order}
                  />
               )
            ),
         )}
      </div>
   );
};
