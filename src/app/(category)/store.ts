"use client";

import { create } from "zustand";
import { Product } from "@prisma/client";

type CartStore = {
   filteredProducts: Product[];
   loading: boolean;
   error: boolean;
   setFilteredProducts: (filteredProducts: Product[]) => void;
};

export const useCategoryStore = create<CartStore>(set => ({
   filteredProducts: [],
   loading: true,
   error: false,
   //next14
   setFilteredProducts: filteredProducts =>
      set({ filteredProducts, loading: false, error: false }),
}));
