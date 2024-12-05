"use client";

import { Brand } from "@/@types/Product";
import { create } from "zustand";
import { ProductWithVariants } from "./categories/[category]/page";

type CartStore = {
   products: ProductWithVariants[];
   totalPages: number;
   totalProducts: number;
   productFilters: {
      sizes: string[];
      colors: string[];
      minProductPrice: number;
      maxProductPrice: number;
      brands: Brand[];
   };
   offset: number;
   sortBy: {
      id: string;
      label: string;
   };
   loading: boolean;
   filterLoading: boolean;
   error: boolean;
   fetchProducts: (query?: string, sortBy?: string) => Promise<void>;
   setOffset: (offset: number) => void;
   setSortBy: (sortBy: { id: string; label: string }) => void;
};

export const useCategoryStore = create<CartStore>(set => ({
   products: [],
   totalPages: 0,
   productFilters: {
      sizes: [],
      colors: [],
      minProductPrice: 0,
      maxProductPrice: 0,
      brands: [],
   },
   totalProducts: 0,
   offset: 0,
   sortBy: {
      id: "popularity",
      label: "Popularity",
   },
   loading: true,
   filterLoading: true,
   error: false,
   fetchProducts: async (query, sortBy) => {
      set({ loading: true, error: false });
      try {
         const response = await fetch(
            `/api/categoryProducts?${query}&sortBy=${sortBy}`,
         );

         if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
         }

         const { products, totalPages, totalProducts, productFilters } =
            await response.json();

         set({
            products,
            totalPages,
            totalProducts,
            productFilters,
            loading: false,
            error: false,
            filterLoading: false,
         });
      } catch (e) {
         console.error(e);
      }
   },
   setOffset: offset => set({ offset }),
   setSortBy: sortBy => set({ sortBy }),
}));
