"use client";

import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/shared/ProductCard";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useProductStore } from "./store";
import { SkeletonProductCard } from "@/components/shared/SkeletonProductCard";

interface Props {
   title: string;
   categoryId: number;
}

export const ProductsWithCategories: React.FC<Props> = ({
   categoryId,
   title,
}) => {
   const [fetchProducts, products, loading] = useProductStore(state => [
      state.fetchProducts,
      state.products,
      state.loading,
   ]);

   const [limit, setLimit] = useState(4);
   const [offset, setOffset] = useState(0);

   useEffect(() => {
      fetchProducts(categoryId, limit, offset);
   }, [categoryId, limit, offset, fetchProducts]);

   const loadMoreProducts = () => {
      setOffset(prevOffset => prevOffset + limit);
   };

   return (
      <section className="pb-10 pt-12 md:pb-[62px] md:pt-[72px]">
         <Container>
            <Title className="mb-8 text-center md:mb-[56px]" text={title} />
            <div className="flex gap-4 overflow-x-scroll md:flex-wrap md:justify-center md:gap-3 md:overflow-x-hidden md:overflow-y-hidden">
               {loading
                  ? Array.from({ length: limit }).map((_, index) => (
                       <SkeletonProductCard key={index} />
                    ))
                  : products.map(product => (
                       <ProductCard
                          key={product.id}
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
         </Container>
      </section>
   );
};