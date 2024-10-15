"use client";

import { User, UserRole } from "@prisma/client";
import { ButtonSignOut } from "../../components/ButtonSignOut";
import { ProfileInfo } from "./ProfileInfo";
import { useState } from "react";
import { ProfileContactInfoTab } from "./ProfileContactInfoTab";
import { ProfileOrderHistoryTab } from "./ProfileOrderHistoryTab";
import { ProfileAddressBookTab } from "./ProfileAddressBookTab";
import { ProfileWishListTab } from "./ProfileWishListTab";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
   user: User | null;
   session: {
      id: string;
      role: UserRole;
      name: string;
      image: string;
   } | null;
   userOrders: any;
}

export const ProfileTabs: React.FC<Props> = ({ user, session, userOrders }) => {
   const [tabIndex, setTabIndex] = useState<number | null>(0);

   const tabs = ["Contact Info", "Order History", "Address Book", "Wish List"];

   const renderTab = (index: number) => {
      switch (index) {
         case 0:
            return <ProfileContactInfoTab />;
         case 1:
            return <ProfileOrderHistoryTab userOrders={userOrders} />;
         case 2:
            return <ProfileAddressBookTab />;
         case 3:
            return <ProfileWishListTab />;
         default:
            return null;
      }
   };

   const toggleTab = (index: number) => {
      const mobile = window.innerWidth < 768;
      setTabIndex(tabIndex === index && mobile ? null : index);
   };

   return (
      <aside className="grid grid-cols-1 gap-12 py-5 md:grid-cols-[200px_1fr] md:py-8">
         <div>
            <ProfileInfo user={user} session={session} />
            <div className="my-4 flex flex-col rounded-[20px] py-4 md:my-5">
               {tabs.map((tab, index) => (
                  <div key={tab} className="mb-4 last:mb-0 md:mb-6">
                     <div
                        onClick={() => toggleTab(index)}
                        className="flex cursor-pointer items-center justify-between"
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
                        <div className="md:hidden">{renderTab(index)}</div>
                     )}
                  </div>
               ))}
            </div>
            <ButtonSignOut />
         </div>
         <div className="hidden md:block">{renderTab(Number(tabIndex))}</div>
      </aside>
   );
};
