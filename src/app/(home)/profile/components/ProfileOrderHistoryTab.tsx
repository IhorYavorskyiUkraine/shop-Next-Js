import { useState } from "react";
import { OrderCard } from "./OrderCard";
import { Title } from "@/components/ui/title";

interface Props {
   userOrders: any;
}

export const ProfileOrderHistoryTab: React.FC<Props> = ({ userOrders }) => {
   const [open, setOpen] = useState<number | null>(null);

   const toggleTab = (index: number) => {
      setOpen(open === index ? null : index);
   };

   if (userOrders.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center">
            <Title text="No Orders Yet" className="mb-5 text-center" />
            <p className="text-[64px]">😞</p>
         </div>
      );
   }

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
