import { useState } from "react";
import { OrderCard } from "./OrderCard";

interface Props {
   userOrders: any;
}

export const ProfileOrderHistoryTab: React.FC<Props> = ({ userOrders }) => {
   const [open, setOpen] = useState<number | null>(null);

   const toggleTab = (index: number) => {
      setOpen(open === index ? null : index);
   };

   return (
      <div className="rounded-[20px] bg-gray p-4">
         {userOrders?.map((order: any, index: number) => (
            <OrderCard
               setOpen={() => toggleTab(index)}
               open={open === index}
               key={order.id}
               {...order}
            />
         ))}
      </div>
   );
};
