"use client";

import { cn } from "@/lib";
import { UserOrdersType } from "@/lib/getUserOrders";
import { User, UserRole } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { tabs } from "../profile.data";
import { ProfileAddressBookTab } from "./ProfileAddressBookTab";
import { ProfileContactInfoTab } from "./ProfileContactInfoTab";
import { ProfileOrderHistoryTab } from "./ProfileOrderHistoryTab";
import { ProfileWishListTab } from "./ProfileWishListTab";

interface Props {
   user: User | null;
   session: {
      id: string;
      role: UserRole;
      name: string;
      image: string;
   } | null;
   userOrders: UserOrdersType | null;
}

export const ProfileTabs: React.FC<Props> = ({ user, session, userOrders }) => {
   const [tabIndex, setTabIndex] = useState<number | null>(0);

   const renderTab = (index: number) => {
      switch (index) {
         case 0:
            return <ProfileContactInfoTab user={user} session={session} />;
         case 1:
            return <ProfileOrderHistoryTab userOrders={userOrders} />;
         case 2:
            return <ProfileAddressBookTab user={user} />;
         case 3:
            return <ProfileWishListTab />;
         default:
            return 0;
      }
   };

   const toggleTab = (index: number) => {
      const mobile = window.innerWidth < 768;
      setTabIndex(tabIndex === index && mobile ? null : index);
   };

   return (
      <aside className="grid grid-cols-1 py-5 md:grid-cols-[144px_1fr] md:py-8">
         <div>
            <div className="flex flex-1 flex-col rounded-[20px]">
               {tabs.map((tab, index) => (
                  <div key={tab} className="mb-4 last:mb-0 md:mb-6">
                     <div
                        onClick={() => toggleTab(index)}
                        className={cn(
                           tabIndex === index &&
                              "md:border-r-[1px] md:border-r-black",
                           "flex cursor-pointer items-center justify-between",
                        )}
                     >
                        <h3 className="text-xl font-bold leading-27 md:text-lg">
                           {tab}
                        </h3>
                        <div className="visible md:hidden">
                           <ChevronDown
                              className={cn(index === tabIndex && "rotate-180")}
                              size={16}
                           />
                        </div>
                     </div>
                     {index === tabIndex && (
                        <div className="py-5 md:hidden">{renderTab(index)}</div>
                     )}
                  </div>
               ))}
            </div>
         </div>
         <div className="hidden md:block md:border-l-[1px] md:border-l-black/10 md:pl-6">
            {renderTab(Number(tabIndex))}
         </div>
      </aside>
   );
};
