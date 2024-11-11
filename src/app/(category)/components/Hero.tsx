"use client";

import { useEffect, useState } from "react";
import { ProductsFilter } from "./ProductsFilter";
import { ProductsList } from "./ProductsList";
import { useCategoryStore } from "../store";
import { ProductPagination } from "./ProductPagination";

interface Props {
   category: string;
   crumbName: string;
}

export const Hero: React.FC<Props> = ({ category, crumbName }) => {
   const [fetchProducts, products, totalPages, totalProducts] =
      useCategoryStore(state => [
         state.fetchProducts,
         state.products,
         state.totalPages,
         state.totalProducts,
      ]);
   const [currentPage, setCurrentPage] = useState(1);
   const [limit, setLimit] = useState(10);
   const [offset, setOffset] = useState(0);

   useEffect(() => {
      const categoryToFetch =
         category === "new_arrivals"
            ? "1"
            : category === "top_selling"
              ? "2"
              : category;
      fetchProducts(categoryToFetch, {}, limit, offset);
   }, [offset]);

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
      setOffset((page - 1) * limit);
   };

   return (
      <div>
         <ProductsFilter products={products} />
         <ProductsList
            totalProducts={totalProducts}
            category={crumbName}
            products={products}
         />
         <ProductPagination
            setOffset={setOffset}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            currentPage={currentPage}
         />
      </div>
   );
};
