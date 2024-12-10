"use client";

import { ProductCard } from "@/components/shared/ProductCard";
import { Skeleton } from "@/components/shared/Skeleton";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { useEffect, useState } from "react";
import { useProductStore } from "./store";

interface Props {
   title: string;
   categoryId: number;
}

export const ProductsWithCategories: React.FC<Props> = ({
   categoryId,
   title,
}) => {
   const [
      fetchProducts,
      hasMoreNewArrivals,
      hasMoreTopSelling,
      topSelling,
      newArrivals,
   ] = useProductStore(state => [
      state.fetchProducts,
      state.hasMoreNewArrivals,
      state.hasMoreTopSelling,
      state.topSelling,
      state.newArrivals,
   ]);
   const [loading, setLoading] = useState(true);
   const [limit, setLimit] = useState(4);
   const [offset, setOffset] = useState(0);

   useEffect(() => {
      const loadProducts = async () => {
         setLoading(true);
         await fetchProducts(categoryId, limit, offset);
         setLoading(false);
      };

      loadProducts();
   }, [limit, offset]);

   const loadMoreProducts = () => {
      setOffset(prevOffset => prevOffset + limit);
   };

   const products = categoryId === 1 ? newArrivals : topSelling;
   const hasMore = categoryId === 1 ? hasMoreNewArrivals : hasMoreTopSelling;

   return (
      <>
         <section className="pb-10 pt-12 md:pb-[62px] md:pt-[72px]">
            <Title
               size="lg"
               className="mb-8 text-center md:mb-[56px]"
               text={title}
            />
            <div className="flex gap-4 overflow-x-scroll md:flex-wrap md:justify-center md:gap-3 md:overflow-x-hidden md:overflow-y-hidden xl:justify-start">
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
            {hasMore && (
               <div className="mt-4 flex justify-center">
                  {products.length > 0 && (
                     <Button onClick={loadMoreProducts}>View More</Button>
                  )}
               </div>
            )}
         </section>
         {products === newArrivals && (
            <div className="border-[1px] border-black/5"></div>
         )}
      </>
   );
};
