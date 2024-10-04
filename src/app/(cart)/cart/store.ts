"use client";

import { Cart, CartItem } from "@/@types/Cart";
import { create } from "zustand";

type addToCartItem = Omit<
   CartItem,
   "id" | "product" | "createdAt" | "cartId" | "updatedAt" | "size"
>;

type CartStore = {
   cart: Cart | null;
   newQuantity: number;
   loading: boolean;
   error: boolean;
   updateItemQuantity: (id: number, quantity: number) => Promise<void>;
   fetchCart: () => Promise<void>;
   addToCart: (item: addToCartItem) => Promise<void>;
   removeFromCart: (id: number) => Promise<void>;
};

export const useCartStore = create<CartStore>(set => ({
   cart: null,
   newQuantity: 0,
   loading: true,
   error: false,
   updateItemQuantity: async (id: number, quantity: number) => {
      try {
         const response = await fetch(
            `/api/cart?id=${id}&quantity=${quantity}`,
            {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ quantity }),
            },
         );

         if (!response.ok) {
            throw new Error(
               `Ошибка при изменении количества: ${response.status} ${response.statusText}`,
            );
         }

         set(state => ({
            cart: {
               ...state.cart!,
               items:
                  state.cart?.items.map((item: CartItem) =>
                     item.id === id ? { ...item, quantity } : item,
                  ) || [],
            },
            newQuantity: quantity,
         }));
      } catch (error) {
         console.error(error);
         set({ error: true });
      } finally {
         set({ loading: false });
      }
   },
   fetchCart: async () => {
      try {
         set({ loading: true, error: false });
         const data = await fetch("/api/cart");
         set({ cart: await data.json() });
      } catch (error) {
         console.error(error);
         set({ error: true });
      } finally {
         set({ loading: false });
      }
   },
   addToCart: async item => {
      try {
         set({ loading: true, error: false });
         const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
         });

         const addedItem: CartItem = await response.json();

         if (!response.ok) {
            throw new Error(
               `Ошибка при добавлении товара в корзину: ${response.status} ${response.statusText}`,
            );
         }

         set(state => ({
            cart: {
               ...state.cart!,
               items: [...(state.cart?.items || []), addedItem],
            },
         }));
      } catch (error) {
         console.error(error);
         set({ error: true });
      } finally {
         set({ loading: false });
      }
   },
   removeFromCart: async productId => {
      try {
         const response = await fetch(`/api/cart?id=${productId}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw new Error(
               `Ошибка при удалении товара из корзины: ${response.status} ${response.statusText}`,
            );
         }

         set(state => ({
            cart: {
               ...state.cart!,
               items:
                  state.cart?.items.filter(item => item.id !== productId) || [],
            },
         }));
      } catch (error) {
         console.error(error);
         set({ error: true });
      } finally {
         set({ loading: false });
      }
   },
}));
