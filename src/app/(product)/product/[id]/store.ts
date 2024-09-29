"use client";

import { create } from "zustand";
import {
   ProductVariantWithSizes,
   ProductWithRelations,
} from "@/@types/ProductWithOptions";

type Review = {};

type ProductStore = {
   product: ProductWithRelations | null;
   variant: ProductVariantWithSizes | null;
   reviews: any[] | null;
   color: string | number;
   size: string;
   quantity: number;
   loading: boolean;
   setProduct: (product: ProductWithRelations) => void;
   fetchReviews: ({
      id,
      orderBy,
   }: {
      id: number;
      orderBy: string;
   }) => Promise<void>;
   postReview: (review: Review) => Promise<void>;
   setColor: (color: string | number) => void;
   setSize: (size: string) => void;
   setVariant: (variant: ProductVariantWithSizes) => void;
   setQuantity: (quantity: number) => void;
};

export const useProductStore = create<ProductStore>(set => ({
   product: null,
   variant: null,
   reviews: [],
   color: "",
   size: "",
   quantity: 0,
   loading: true,
   setProduct: product => set({ product, loading: false }),
   fetchReviews: async ({ id, orderBy }) => {
      try {
         const response = await fetch(
            `/api/reviews?id=${id}&orderBy=${orderBy}`,
         );

         if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
         }

         const reviews: Review[] = await response.json();

         if (reviews) {
            set({ reviews });
         } else {
            console.log("Отзывы не найдены");
            set({ reviews: null });
         }
         set({ loading: false });
      } catch (error) {
         console.log("Ошибка при загрузке отзывов:", error);
         set({ loading: false });
         set({ reviews: null });
      }
   },
   postReview: async review => {},
   setVariant: variant => set({ variant }),
   setColor: color => set({ color }),
   setSize: size => set({ size }),
   setQuantity: quantity => set(quantity <= 0 ? { quantity: 0 } : { quantity }),
}));
