import { Product } from "@prisma/client";
import { create } from "zustand";

type ProductStore = {
   newArrivals: Product[];
   topSelling: Product[];
   hasMoreNewArrivals: boolean;
   hasMoreTopSelling: boolean;
   error: boolean;
   fetchProducts: (
      categoryId: number,
      limit: number,
      offset: number,
   ) => Promise<void>;
};

export const useProductStore = create<ProductStore>(set => ({
   newArrivals: [],
   topSelling: [],
   loading: false,
   hasMoreNewArrivals: true,
   hasMoreTopSelling: true,
   error: false,
   fetchProducts: async (categoryId, limit, offset) => {
      try {
         set({ error: false });

         const response = await fetch(
            `/api/products?categoryId=${categoryId}&limit=${limit}&offset=${offset}`,
         );

         if (!response.ok) {
            throw new Error("Something went wrong");
         }

         const products = await response.json();

         if (products.length < limit) {
            categoryId === 1
               ? set({ hasMoreNewArrivals: false })
               : set({ hasMoreTopSelling: false });
         }

         set(state => {
            const existingIds = new Set(
               categoryId === 1
                  ? state.newArrivals.map(product => product.id)
                  : state.topSelling.map(product => product.id),
            );

            const uniqueProducts = products.filter(
               (product: Product) => !existingIds.has(product.id),
            );

            return {
               newArrivals:
                  categoryId === 1
                     ? [...state.newArrivals, ...uniqueProducts]
                     : state.newArrivals,
               topSelling:
                  categoryId === 2
                     ? [...state.topSelling, ...uniqueProducts]
                     : state.topSelling,
            };
         });
      } catch (error) {
         console.error("Error fetching products", error);
         set({ error: true });
      }
   },
}));
