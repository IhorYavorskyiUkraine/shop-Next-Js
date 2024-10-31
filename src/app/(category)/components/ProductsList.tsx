"use client";

import { ProductsFilterMobile } from "./ProductsFilterMobile";
import { useState } from "react";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductWithVariants } from "../categories/[category]/page";

interface Props {
   category: string;
   products: ProductWithVariants[];
}

export const ProductsList: React.FC<Props> = ({ category, products }) => {
   const [open, setOpen] = useState(false);

   return (
      <div>
         <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <h2 className="text-xl font-bold leading-32 leading-[43px] md:text-2xl">
                  {category}
               </h2>
               <p className="-translate-y-[-4px]">
                  Showing 1-{products.length < 10 ? products.length : 10} of{" "}
                  {products.length}
               </p>
            </div>
            <div className="md:hidden">
               <ProductsFilterMobile
                  products={products}
                  open={open}
                  setOpen={setOpen}
               />
            </div>
         </div>
         <div className="flex flex-wrap justify-center gap-4">
            {products.map(product => (
               <ProductCard
                  categoriesPageSizes
                  key={product.id}
                  {...product}
                  rating={product.rating || 0}
                  oldPrice={product.oldPrice || 0}
               />
            ))}
         </div>
      </div>
   );
};
