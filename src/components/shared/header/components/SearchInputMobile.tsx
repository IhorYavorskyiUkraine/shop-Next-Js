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

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useProductSearch } from "@/hooks/useProductSearch";

export const SearchInputMobile: React.FC = () => {
   const [open, setOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");

   const products = useProductSearch(searchQuery);

   const onClickItem = () => {
      setOpen(false);
      setSearchQuery("");
   };

   return (
      <Drawer direction="bottom" open={open}>
         <DrawerTrigger className="-translate-y-[2px] md:hidden">
            <Search
               onClick={() => setOpen(!open)}
               color={"#000"}
               size={20}
               className="translate-y-[2px] md:hidden"
            />
         </DrawerTrigger>
         <DrawerContent>
            <Container className="mx-0 justify-between">
               <DrawerHeader className="flex justify-between py-6">
                  <div className="hidden">
                     <DrawerTitle>Search</DrawerTitle>
                  </div>
                  <Input
                     placeholder="Search for products..."
                     className="flex-1 md:flex"
                     iconHidden={false}
                     value={searchQuery}
                     onChange={e => setSearchQuery(e.target.value)}
                     icon={<Search color={"#00000066"} size={20} />}
                  />
                  <DrawerClose className="flex items-center justify-center">
                     <X onClick={() => setOpen(false)} size={20} />
                  </DrawerClose>
               </DrawerHeader>
               {products.length > 0 &&
                  products.map(product => (
                     <Link
                        onClick={onClickItem}
                        key={product.id}
                        className="flex w-full items-center gap-3 px-3 py-2 hover:bg-black/10"
                        href={`/product/${product.id}`}
                     >
                        <img
                           className="h-12 w-12 rounded-sm"
                           src={product.imageUrl}
                           alt={product.name}
                        />
                        <span className="text-md">{product.name}</span>
                     </Link>
                  ))}
            </Container>
         </DrawerContent>
      </Drawer>
   );
};
