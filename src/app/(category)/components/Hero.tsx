"use client";

import { useEffect, useState } from "react";
import { useCategoryStore } from "../store";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductPagination } from "./ProductPagination";
import { ProductsFilterMobile } from "./ProductsFilterMobile";
import { Title } from "@/components/ui/title";
import { ProductsFilter } from "./ProductsFilter";
import { ProductSortBy } from "./ProductSortBy";
import { Skeleton } from "@/components/shared/Skeleton";

interface Props {
   category: string;
   crumbName: string;
}

export const Hero: React.FC<Props> = ({ category, crumbName }) => {
   const searchParams = useSearchParams();
   const [
      fetchProducts,
      products,
      sortBy,
      setOffset,
      totalPages,
      totalProducts,
      loading,
   ] = useCategoryStore(state => [
      state.fetchProducts,
      state.products,
      state.sortBy,
      state.setOffset,
      state.totalPages,
      state.totalProducts,
      state.loading,
   ]);
   const [currentPage, setCurrentPage] = useState(1);
   const limit = 12;
   const offset = Number(
      searchParams.has("offset") ? Number(searchParams.get("offset")) : 0,
   );

   useEffect(() => {
      let query = `category=${category === "new_arrivals" ? "1" : category === "top_selling" ? "2" : category}`;

      searchParams.forEach((value, key) => {
         if (key !== "category") {
            query += `&${key}=${value}`;
         }
      });

      setOffset(offset);
      const page = Math.floor(offset / limit) + 1;
      setCurrentPage(page);

      fetchProducts(query, sortBy.id);
   }, [searchParams, sortBy.id]);

   return (
      <div className="flex items-start md:gap-5">
         <ProductsFilter />
         <div>
            <div className="mb-4 flex items-center justify-between gap-4 md:gap-0">
               <div className="flex flex-1 items-center justify-between gap-2">
                  <h2 className="text-xl font-bold leading-32 leading-[43px] md:text-2xl">
                     {crumbName}
                  </h2>
                  <div className="flex -translate-y-[-4px] items-center gap-2">
                     <p>
                        {`Showing ${products.length > 1 ? 1 : 0}-${products.length < 12 ? products.length : 12} of
							${totalProducts} Products`}
                     </p>
                     <div className="hidden items-center gap-1 md:flex">
                        <p>Sort by:</p>
                        <ProductSortBy />
                     </div>
                  </div>
               </div>
               <ProductsFilterMobile />
            </div>
            <div className="flex flex-wrap justify-center gap-3 border-b-[1px] border-black/10 pb-6">
               {loading
                  ? Array.from({ length: limit }).map((_, index) => (
                       <Skeleton category key={index} productCard />
                    ))
                  : products.map(product => (
                       <ProductCard
                          categoriesPageSizes
                          key={product.id}
                          {...product}
                          rating={product.rating || 0}
                          oldPrice={product.oldPrice || 0}
                       />
                    ))}
               {products.length === 0 && (
                  <div className="flex flex-col items-center justify-center">
                     <Title
                        text="No Products Available"
                        className="mb-2 text-center"
                     />
                     <p className="text-[64px]">😞</p>
                  </div>
               )}
            </div>
            <ProductPagination
               setOffset={setOffset}
               setCurrentPage={(page: number) => setCurrentPage(page)}
               totalPages={totalPages}
               currentPage={currentPage}
            />
         </div>
      </div>
   );
};
