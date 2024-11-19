"use client";

import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { useState } from "react";
import Link from "next/link";
import { menuData, navMenuData } from "../footer.data";

export type MenuItem = {
   name: string;
   href?: string;
   drop?: boolean;
};

export type NavMenuItem = {
   name: string;
   href: string;
   icon: React.ReactNode;
};

export const Menu: React.FC = () => {
   const [active, setActive] = useState(false);

   return (
      <ul className="hidden gap-6 pr-10 md:flex">
         {menuData.map((item: MenuItem) => (
            <li key={item.name} className="text-md leading-22">
               {item.href ? (
                  <Link href={`/categories/${item.href}`}>{item.name}</Link>
               ) : (
                  <div
                     onClick={() => setActive(!active)}
                     className="flex cursor-pointer items-center gap-1"
                  >
                     <NavigationMenu>
                        <NavigationMenuList>
                           <NavigationMenuItem>
                              <NavigationMenuTrigger
                                 arrow
                                 className="text-md leading-22"
                              >
                                 {item.name}
                              </NavigationMenuTrigger>
                              <NavigationMenuContent className="border-none bg-white">
                                 <ul className="grid gap-1 p-2 md:w-[200px] lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
                                    {navMenuData.map((item: NavMenuItem) => (
                                       <li
                                          key={item.name}
                                          className="rounded-md border-[1px] border-black/10 p-1 transition hover:bg-black/5"
                                       >
                                          <NavigationMenuLink asChild>
                                             <Link
                                                href={`/categories/${item.href}`}
                                                className="flex items-center gap-1"
                                             >
                                                {item.icon}
                                                {item.name}
                                             </Link>
                                          </NavigationMenuLink>
                                       </li>
                                    ))}
                                 </ul>
                              </NavigationMenuContent>
                           </NavigationMenuItem>
                        </NavigationMenuList>
                     </NavigationMenu>
                  </div>
               )}
            </li>
         ))}
      </ul>
   );
};
