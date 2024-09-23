import { useState } from "react";
import { useDebounce } from "react-use";
import { Product } from "@prisma/client";

export const useProductSearch = (searchQuery: string) => {
   const [products, setProducts] = useState<Product[]>([]);

   useDebounce(
      async () => {
         if (!searchQuery.trim()) {
            setProducts([]);
            return;
         }

         try {
            const response = await fetch(
               `/api/products/search?query=${searchQuery}`,
            );
            const data = await response.json();
            setProducts(data);
         } catch (error) {
            console.log(error);
            setProducts([]);
         }
      },
      250,
      [searchQuery],
   );

   return products;
};
