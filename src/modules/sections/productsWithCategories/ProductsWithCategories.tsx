"use client";

import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/shared/ProductCard";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useProductStore } from "./store";
import { Skeleton } from "@/components/shared/Skeleton";

interface Props {
   title: string;
   categoryId: number;
}

export const ProductsWithCategories: React.FC<Props> = ({
   categoryId,
   title,
}) => {
   const [fetchProducts, topSelling, newArrivals, loading] = useProductStore(
      state => [
         state.fetchProducts,
         state.topSelling,
         state.newArrivals,
         state.loading,
      ],
   );

   const [limit, setLimit] = useState(4);
   const [offset, setOffset] = useState(0);

   useEffect(() => {
      fetchProducts(categoryId, limit, offset);
   }, [limit, offset]);

   const loadMoreProducts = () => {
      setOffset(prevOffset => prevOffset + limit);
   };

   const products = categoryId === 1 ? newArrivals : topSelling;

   return (
      <>
         <section className="pb-10 pt-12 md:pb-[62px] md:pt-[72px]">
            <Title
               size="lg"
               className="mb-8 text-center md:mb-[56px]"
               text={title}
            />
            <div className="flex justify-center gap-4 overflow-x-scroll md:flex-wrap md:gap-3 md:overflow-x-hidden md:overflow-y-hidden xl:justify-start">
               {loading
                  ? Array.from({ length: limit }).map((_, index) => (
                       <Skeleton productCard key={index} />
                    ))
                  : products.map((product, index) => (
                       <ProductCard
                          key={index}
                          id={product.id}
                          imageUrl={product.imageUrl}
                          name={product.name}
                          rating={product.rating || 0}
                          price={product.price}
                          oldPrice={product.oldPrice || 0}
                       />
                    ))}
            </div>
            <div className="mt-4 flex justify-center">
               {products.length > 0 && (
                  <Button onClick={loadMoreProducts}>View More</Button>
               )}
            </div>
         </section>
         {products === newArrivals && (
            <div className="border-[1px] border-black/5"></div>
         )}
      </>
   );
};
