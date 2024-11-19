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
import { burgerMenuData } from "../footer.data";

export const Burger: React.FC = () => {
   const [open, setOpen] = useState(false);

   return (
      <Drawer direction="left" open={open}>
         <DrawerTrigger>
            <Menu onClick={() => setOpen(!open)} color={"#000"} size={24} />
         </DrawerTrigger>
         <DrawerContent>
            <Container className="mx-0 justify-between pt-6">
               <DrawerHeader className="flex justify-between border-b-2 border-black/10 pb-6">
                  <DrawerTitle className="-translate-y-1 font-integral-b text-2xl">
                     Catalog
                  </DrawerTitle>
                  <DrawerClose>
                     <X onClick={() => setOpen(false)} size={32} />
                  </DrawerClose>
               </DrawerHeader>
               <ul className="flex flex-col gap-4 pt-6">
                  {burgerMenuData.map((item: MenuItem) => (
                     <li key={item.name}>
                        <Link
                           className="text-2xl font-medium"
                           href={`/categories/${item.href}` || ""}
                        >
                           <button onClick={() => setOpen(false)}>
                              {item.name}
                           </button>
                        </Link>
                     </li>
                  ))}
               </ul>
            </Container>
         </DrawerContent>
      </Drawer>
   );
};
