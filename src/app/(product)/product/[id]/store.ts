"use client";

import { create } from "zustand";
import { ProductVariantOption } from "@prisma/client";
import {
   ProductWithVariantsAndDetails,
   Review,
} from "@/@types/ProductWithOptions";

type ReviewInput = Omit<Review, "id" | "author" | "createdAt">;

type ProductStore = {
   product: ProductWithVariantsAndDetails | null;
   variant: ProductVariantOption | null;
   reviews: Review[] | null;
   color: string | number;
   size: {
      id: number;
      size: string;
   };
   quantity: number;
   loading: boolean;
   error: boolean;
   setProduct: (product: ProductWithVariantsAndDetails) => void;
   fetchReviews: ({
      id,
      orderBy,
   }: {
      id: number;
      orderBy: string;
   }) => Promise<void>;
   orderBy: string;
   setOrderBy: (orderBy: string) => void;
   postReview: (review: ReviewInput, productId: number) => Promise<void>;
   setColor: (color: string | number) => void;
   setSize: (size: { id: number; size: string }) => void;
   setVariant: (variant: ProductVariantOption) => void;
   setQuantity: (quantity: number) => void;
};

export const useProductStore = create<ProductStore>(set => ({
   product: null,
   variant: null,
   reviews: [],
   color: "",
   size: { id: 0, size: "" },
   quantity: 0,
   orderBy: "desc",
   loading: true,
   error: false,
   setProduct: product => set({ product, loading: false, error: false }),
   fetchReviews: async ({ id, orderBy }) => {
      set({ error: false });
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
         set({ error: true });
         console.log("Ошибка при загрузке отзывов:", error);
         set({ loading: false });
         set({ reviews: null });
      }
   },
   postReview: async (review, productId: number) => {
      try {
         set({ loading: true, error: false });
         const response = await fetch(`/api/reviews?id=${productId}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
         });

         const addedReview = await response.json();

         if (!response.ok) {
            throw new Error(
               `Ошибка при добавлении отзыва к товару: ${response.status} ${response.statusText}`,
            );
         }

         set(state => ({
            reviews: [...state.reviews, addedReview],
         }));
      } catch (error) {
         console.error(error);
         set({ error: true });
      } finally {
         set({ loading: false });
      }
   },
   setVariant: variant => set({ variant }),
   setColor: color => set({ color }),
   setSize: size => set({ size }),
   setOrderBy: orderBy => set({ orderBy }),
   setQuantity: quantity => set(quantity <= 0 ? { quantity: 0 } : { quantity }),
}));
