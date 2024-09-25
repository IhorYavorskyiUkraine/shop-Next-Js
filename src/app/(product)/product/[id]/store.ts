"use client";

import { create } from "zustand";
import {
   ProductVariantWithSizes,
   ProductWithRelations,
} from "@/@types/ProductWithOptions";

type ProductStore = {
   product: ProductWithRelations | null;
   variant: ProductVariantWithSizes | null;
   color: string | number;
   size: string;
   quantity: number;
   loading: boolean;
   fetchProduct: ({ id }: { id: number }) => Promise<void>;
   setColor: (color: string | number) => void;
   setSize: (size: string) => void;
   setVariant: (variant: ProductVariantWithSizes) => void;
   setQuantity: (quantity: number) => void;
};

export const useProductStore = create<ProductStore>(set => ({
   product: null,
   variant: null,
   color: "",
   size: "",
   quantity: 0,
   loading: true,
   fetchProduct: async ({ id }) => {
      set({ product: null });
      try {
         const response = await fetch(`/api/product?id=${id}`);

         if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
         }

         const product: ProductWithRelations = await response.json();

         if (product) {
            set({ product });
         } else {
            console.log("Продукт не найден");
            set({ product: null });
         }
         set({ loading: false });
      } catch (error) {
         console.log("Ошибка при загрузке продукта:", error);
         set({ loading: false });
         set({ product: null });
      }
   },
   setVariant: variant => set({ variant }),
   setColor: color => set({ color }),
   setSize: size => set({ size }),
   setQuantity: quantity => set(quantity <= 0 ? { quantity: 0 } : { quantity }),
}));
