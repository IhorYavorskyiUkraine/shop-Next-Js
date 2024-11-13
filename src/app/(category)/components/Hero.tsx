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
import { off } from "process";

interface Props {
   category: string;
   crumbName: string;
}

export const Hero: React.FC<Props> = ({ category, crumbName }) => {
   const searchParams = useSearchParams();
   const [fetchProducts, products, totalPages, totalProducts] =
      useCategoryStore(state => [
         state.fetchProducts,
         state.products,
         state.totalPages,
         state.totalProducts,
      ]);
   const [currentPage, setCurrentPage] = useState(1);
   const [offset, setOffset] = useState(0);
   const limit = 10;

   const sortOptions = [
      { id: "popularity", label: "Popularity" },
      { id: "price_asc", label: "Price: Low to High" },
      { id: "price_desc", label: "Price: High to Low" },
   ];
   const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

   useEffect(() => {
      let query = `category=${category === "new_arrivals" ? "1" : category === "top_selling" ? "2" : category}`;

      searchParams.forEach((value, key) => {
         if (key !== "category") {
            query += `&${key}=${value}`;
         }
      });

      query += `&sort=${selectedSort.id}&offset=${offset}`;

      fetchProducts(query);
   }, [offset, searchParams, selectedSort]);

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
      setOffset((page - 1) * limit);
   };

   return (
      <div className="flex items-start md:gap-5">
         <ProductsFilter />
         <div>
            <div className="mb-4 flex items-center justify-between">
               <div className="flex flex-1 items-center justify-between gap-2">
                  <h2 className="text-xl font-bold leading-32 leading-[43px] md:text-2xl">
                     {crumbName}
                  </h2>
                  <div className="flex -translate-y-[-4px] items-center gap-2">
                     <p>
                        {`Showing ${products.length > 1 ? 1 : 0}-${products.length < 10 ? products.length : 10} of
							${totalProducts}`}
                     </p>
                     <div className="flex items-center gap-1">
                        <p>Sort by:</p>
                        <ProductSortBy
                           sortOptions={sortOptions}
                           selectedSort={selectedSort}
                           setSelectedSort={setSelectedSort}
                        />
                     </div>
                  </div>
               </div>
               <ProductsFilterMobile />
            </div>
            <div className="flex flex-wrap justify-center gap-4 border-b-[1px] border-black/10 pb-6">
               {products.length === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                     <Title
                        text="No Products Available"
                        className="mb-2 text-center"
                     />
                     <p className="text-[64px]">😞</p>
                  </div>
               ) : (
                  products.map(product => (
                     <ProductCard
                        categoriesPageSizes
                        key={product.id}
                        {...product}
                        rating={product.rating || 0}
                        oldPrice={product.oldPrice || 0}
                     />
                  ))
               )}
            </div>
            <ProductPagination
               setOffset={setOffset}
               onPageChange={handlePageChange}
               totalPages={totalPages}
               currentPage={currentPage}
            />
         </div>
      </div>
   );
};
