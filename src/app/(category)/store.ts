"use client";

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
   };
   loading: boolean;
   error: boolean;
   fetchProducts: (
      category?: string,
      filters?: {
         minPrice?: number;
         maxPrice?: number;
         colors?: string[];
         sizes?: string[];
         dressStyleId?: number | null;
      },
      limit?: number,
      offset?: number,
   ) => Promise<void>;
};

export const useCategoryStore = create<CartStore>(set => ({
   products: [],
   totalPages: 0,
   productFilters: {
      sizes: [],
      colors: [],
      minProductPrice: 0,
      maxProductPrice: 0,
   },
   totalProducts: 0,
   loading: true,
   error: false,
   fetchProducts: async (category, filters, limit = 10, offset = 0) => {
      set({ loading: true, error: false });
      try {
         const { minPrice, maxPrice, colors, sizes, dressStyleId } =
            filters || {};

         let queryParams = `?categoryId=${category}`;

         if (sizes && sizes.length > 0) {
            queryParams += `&sizes=${sizes.join(",")}`;
         }

         if (colors && colors.length > 0) {
            queryParams += `&colors=${colors.join(",")}`;
         }

         if (dressStyleId) {
            queryParams += `&dressStyleId=${dressStyleId}`;
         }

         if (minPrice && minPrice >= 0) {
            queryParams += `&minPrice=${minPrice}`;
         }

         if (maxPrice) {
            queryParams += `&maxPrice=${maxPrice}`;
         }

         const response = await fetch(
            `/api/categoryProducts${queryParams}&limit=${limit}&offset=${offset}`,
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
         });
      } catch (e) {
         console.error(e);
      }
   },
}));
