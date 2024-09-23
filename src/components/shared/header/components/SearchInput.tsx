"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useProductSearch } from "@/hooks/useProductSearch";

export const SearchInput: React.FC = () => {
   const [searchQuery, setSearchQuery] = useState("");
   const [focused, setFocused] = useState(false);

   const ref = useRef(null);

   useClickAway(ref, () => {
      setFocused(false);
   });

   const products = useProductSearch(searchQuery);

   const onClickItem = () => {
      setSearchQuery("");
      setFocused(false);
   };

   return (
      <>
         {focused && (
            <div className="fixed bottom-0 left-0 right-0 top-0 z-30 bg-black/50" />
         )}
         <div className="relative flex-1 md:flex">
            <Input
               placeholder="Search for products..."
               className={cn(
                  focused && "relative z-40",
                  "hidden flex-1 md:flex",
               )}
               iconHidden={true}
               ref={ref}
               value={searchQuery}
               onChange={e => setSearchQuery(e.target.value)}
               onFocus={() => setFocused(true)}
               icon={<Search color={"#00000066"} size={20} />}
            />
            {products.length > 0 && (
               <div
                  className={cn(
                     "invisible absolute top-0 z-30 w-full rounded-[30px] bg-gray py-2 opacity-0 shadow-md transition-all duration-200",
                     focused && "visible top-0 w-full opacity-100 md:pt-[46px]",
                  )}
               >
                  {products.map(product => (
                     <Link
                        onClick={onClickItem}
                        key={product.id}
                        className="flex w-full items-center gap-3 px-3 py-2 hover:bg-black/10"
                        href={`/product/${product.id}`}
                     >
                        <img
                           className="h-8 w-8 rounded-sm"
                           src={product.imageUrl}
                           alt={product.name}
                        />
                        <span>{product.name}</span>
                     </Link>
                  ))}
               </div>
            )}
         </div>
      </>
   );
};
