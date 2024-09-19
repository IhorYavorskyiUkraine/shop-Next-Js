"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useClickAway, useDebounce } from "react-use";
import { useRef, useState } from "react";
import { Product } from "@prisma/client";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const SearchInput: React.FC = () => {
   const [products, setProducts] = useState<Product[]>([]);
   const [searchQuery, setSearchQuery] = useState("");
   const [focused, setFocused] = useState(false);

   const ref = useRef(null);

   useClickAway(ref, () => {
      setFocused(false);
   });

   useDebounce(
      async () => {
         try {
            // TODO
            // Search product
         } catch (error) {
            console.log(error);
         }
      },
      250,
      [searchQuery],
   );

   const onClickItem = () => {
      setProducts([]);
      setSearchQuery("");
      setFocused(false);
   };

   return (
      <>
         {focused && (
            <div className="fixed bottom-0 left-0 right-0 top-0 z-30 bg-black/50" />
         )}
         <Input
            placeholder="Search for products..."
            className={"hidden flex-1 md:flex"}
            iconHidden={true}
            ref={ref}
            onFocus={() => setFocused(true)}
            icon={<Search color={"#00000066"} size={20} />}
         />
         {products.length > 0 && (
            <div
               className={cn(
                  "invisible absolute top-14 z-30 w-full rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200",
                  focused && "visible top-12 opacity-100",
               )}
            >
               {products.map(product => (
                  <Link href={`/product/${product.id}`} key={product.id}>
                     <div
                        onClick={onClickItem}
                        className="hover:bg-primary/10 cursor-pointer px-3 py-2"
                     >
                        {product.name}
                     </div>
                  </Link>
               ))}
            </div>
         )}
      </>
   );
};
