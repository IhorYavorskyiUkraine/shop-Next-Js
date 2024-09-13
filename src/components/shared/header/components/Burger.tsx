"use client";

import { Container } from "@/components/ui/container";
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MenuItem } from "./Menu";

export const Burger: React.FC = () => {
   const [open, setOpen] = useState(false);

   const menuData = [
      { name: "Shop", href: "/shop" },
      { name: "On Sale", href: "/on_sale" },
      { name: "New Arrivals", href: "/new_arrivals" },
      { name: "Brands", href: "/brands" },
   ];

   return (
      <Drawer direction="left" open={open}>
         <DrawerTrigger>
            <Menu
               onClick={() => setOpen(!open)}
               color={"#000"}
               size={24}
               className="md:hidden"
            />
         </DrawerTrigger>
         <DrawerContent>
            <Container className="mx-0 justify-between">
               <DrawerHeader className="flex justify-between border-b-2 border-black/10 pb-6">
                  <DrawerTitle className="-translate-y-1 font-integral-b text-2xl">
                     Catalog
                  </DrawerTitle>
                  <DrawerClose>
                     <X onClick={() => setOpen(false)} size={20} />
                  </DrawerClose>
               </DrawerHeader>
               <ul className="flex flex-col gap-4 pt-6">
                  {menuData.map((item: MenuItem) => (
                     <li key={item.name}>
                        <Link
                           className="text-2xl font-medium"
                           href={item.href ?? ""}
                        >
                           {item.name}
                        </Link>
                     </li>
                  ))}
               </ul>
            </Container>
         </DrawerContent>
      </Drawer>
   );
};
