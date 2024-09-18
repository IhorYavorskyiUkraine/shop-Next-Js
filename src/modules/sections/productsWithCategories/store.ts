import { create } from "zustand";
import { Product } from "@prisma/client";

type ProductStore = {
   newArrivals: Product[];
   topSelling: Product[];
   loading: boolean;
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
   fetchProducts: async (categoryId: number, limit: number, offset: number) => {
      set({ loading: true });
      try {
         const response = await fetch(
            `/api/products?categoryId=${categoryId}&limit=${limit}&offset=${offset}`,
         );
         if (!response.ok) {
            throw new Error("Сетевая ошибка");
         }
         const products = await response.json();
         if (categoryId === 1) {
            set(state => ({
               newArrivals: [...state.newArrivals, ...products],
               loading: false,
            }));
         } else if (categoryId === 2) {
            set(state => ({
               topSelling: [...state.topSelling, ...products],
               loading: false,
            }));
         }
      } catch (error) {
         console.error("Не удалось получить продукты:", error);
         set({ loading: false });
      }
   },
}));
