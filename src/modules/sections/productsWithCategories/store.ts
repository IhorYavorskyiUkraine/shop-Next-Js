import { create } from "zustand";
import { Product } from "@prisma/client";

type ProductStore = {
   products: Product[];
   loading: boolean;
   fetchProducts: (
      categoryId: number,
      limit: number,
      offset: number,
   ) => Promise<void>;
};

export const useProductStore = create<ProductStore>(set => ({
   products: [],
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
         set(state => ({
            products: [...state.products, ...products],
            loading: false,
         }));
      } catch (error) {
         console.error("Не удалось получить продукты:", error);
         set({ loading: false });
      }
   },
}));
