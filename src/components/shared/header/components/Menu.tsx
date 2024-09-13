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
import { BadgePercent, PackagePlus, ShoppingBasket, Shirt } from "lucide-react";

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

   const menuData = [
      { name: "Shop", drop: true },
      { name: "On Sale", href: "/on_sale", drop: false },
      { name: "New Arrivals", href: "/new_arrivals", drop: false },
      { name: "Brands", href: "/brands", drop: false },
   ];

   const navMenuData = [
      { name: "Shop", href: "/shop", icon: <ShoppingBasket size={20} /> },
      { name: "On Sale", href: "/on_sale", icon: <BadgePercent size={20} /> },
      {
         name: "New Arrivals",
         href: "/new_arrivals",
         icon: <PackagePlus size={20} />,
      },
      { name: "Brands", href: "/brands", icon: <Shirt size={20} /> },
   ];
   return (
      <ul className="hidden gap-6 pr-10 md:flex">
         {menuData.map((item: MenuItem) => (
            <li key={item.name} className="text-md leading-22">
               {item.href ? (
                  <Link href={item.href}>{item.name}</Link>
               ) : (
                  <div
                     onClick={() => setActive(!active)}
                     className="flex cursor-pointer items-center gap-1"
                  >
                     <NavigationMenu>
                        <NavigationMenuList>
                           <NavigationMenuItem>
                              <NavigationMenuTrigger className="text-md leading-22">
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
                                                href={item.href}
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
