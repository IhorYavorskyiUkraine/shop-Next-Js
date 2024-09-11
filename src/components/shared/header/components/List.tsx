"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export const List: React.FC = () => {
   const menuData = [
      { name: "Shop", drop: true },
      { name: "On Sale", href: "/on_sale", drop: false },
      { name: "New Arrivals", href: "/new_arrivals", drop: false },
      { name: "Brands", href: "/brands", drop: false },
   ];
   return (
      <ul className="hidden gap-6 pr-10 md:flex">
         {menuData.map(item => (
            <li key={item.name} className="text-md leading-22">
               {item.href ? (
                  <Link href={item.href}>{item.name}</Link>
               ) : (
                  <div className="flex cursor-pointer items-center gap-1">
                     <span>{item.name}</span>
                     {item.drop && <ChevronDown size={20} />}
                  </div>
               )}
            </li>
         ))}
      </ul>
   );
};
