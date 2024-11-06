"use client";

import { useEffect } from "react";
import { ProductsFilter } from "./ProductsFilter";
import { ProductsList } from "./ProductsList";
import { useCategoryStore } from "../store";

interface Props {
   category: string;
   crumbName: string;
}

export const Hero: React.FC<Props> = ({ category, crumbName }) => {
   const [fetchProducts, products] = useCategoryStore(state => [
      state.fetchProducts,
      state.products,
   ]);

   useEffect(() => {
      const categoryToFetch =
         category === "new_arrivals"
            ? "1"
            : category === "top_selling"
              ? "2"
              : category;
      fetchProducts(categoryToFetch);
   }, []);

   return (
      <div>
         <ProductsFilter products={products} />
         <ProductsList category={crumbName} products={products} />
      </div>
   );
};
