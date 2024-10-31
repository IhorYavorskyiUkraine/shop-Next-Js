"use client";

import { create } from "zustand";
import { ProductVariantOption } from "@prisma/client";
import { ProductWithVariantsAndDetails, Review } from "@/@types/Product";

type ReviewInput = Omit<Review, "id" | "author" | "createdAt">;

type ProductStore = {
   product: ProductWithVariantsAndDetails | null;
   variant: ProductVariantOption | null;
   reviews: Review[];
   color: string | number;
   size: {
      id: number;
      size: string;
   };
   quantity: number;
   hasMoreReviews: boolean;
   limit: number;
   offset: number;
   loading: boolean;
   error: boolean;
   setLimit: (limit: number, offset?: number) => void;
   setProduct: (product: ProductWithVariantsAndDetails) => void;
   fetchReviews: ({
      id,
      orderBy,
      limit,
      offset,
   }: {
      id: number;
      orderBy: string;
      limit: number;
      offset: number;
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
   hasMoreReviews: true,
   limit: 6,
   offset: 0,
   orderBy: "desc",
   loading: true,
   error: false,
   setProduct: product => set({ product, loading: false, error: false }),
   setLimit: (limit, offset = 0) => set({ limit, offset }),
   fetchReviews: async ({ id, orderBy, limit, offset }) => {
      set({ error: false });
      try {
         const response = await fetch(
            `/api/reviews?id=${id}&orderBy=${orderBy}&limit=${limit}&offset=${offset}`,
         );

         if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
         }

         const reviews: Review[] = await response.json();

         if (reviews.length < limit) {
            set({ hasMoreReviews: false });
         }

         if (reviews) {
            set({ reviews });
         } else {
            set({ reviews: [] });
         }
         set({ loading: false });
      } catch (error) {
         set({ error: true });
         console.error("Ошибка при загрузке отзывов:", error);
         set({ loading: false });
         set({ reviews: [] });
      }
   },
   postReview: async (review, productId: number) => {
      try {
         set({ error: false });
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
