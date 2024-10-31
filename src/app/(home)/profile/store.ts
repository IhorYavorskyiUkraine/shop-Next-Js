"use client";

import {
   Address,
   User,
   UserAddressBook,
   WishList,
   WishListItem,
} from "@prisma/client";
import { create } from "zustand";

type ProfileStore = {
   user: (User & { usersAddressBook: { address: Address[] } }) | null;
   addressBook: (UserAddressBook & { address: Address[] }) | null;
   wishList: (WishList & { items: WishListItem[] }) | null;
   loading: boolean;
   error: boolean;
   fetchUser: () => void;
   fetchAddressBook: () => void;
   toggleAddressActivity: (id: number) => Promise<void>;
   deleteAddress: (id: number) => Promise<void>;
   fetchWishList: () => void;
   toggleWishList: (id: number) => Promise<void>;
};

export const useProfileStore = create<ProfileStore>(set => ({
   user: null,
   addressBook: null,
   wishList: null,
   loading: true,
   error: false,
   fetchUser: async () => {
      try {
         set({ error: false, loading: true });
         const response = await fetch("/api/user");

         if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
         }

         const user: User & { usersAddressBook: { address: Address[] } } =
            await response.json();
         set({ user, loading: false });
      } catch (e) {
         set({ error: true, loading: false });
         console.error(e);
      }
   },
   fetchAddressBook: async () => {
      try {
         set({ error: false, loading: true });

         const response = await fetch("/api/addressBook");

         if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
         }

         const addressBook = await response.json();

         set({ addressBook, loading: false });
      } catch (e) {
         set({ error: true, loading: false });
         console.error(e);
      }
   },
   toggleAddressActivity: async id => {
      try {
         set({ error: false, loading: true });
         const response = await fetch(`/api/addressBook?id=${id}`, {
            method: "PATCH",
         });

         if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
         }
      } catch (e) {
         console.error(e);
      }
   },
   deleteAddress: async id => {
      try {
         const response = await fetch(`/api/addressBook?id=${id}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
         }
      } catch (e) {
         console.error(e);
      }
   },
   fetchWishList: async () => {
      try {
         set({ error: false, loading: true });
         const response = await fetch("/api/wishList");

         if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
         }

         const wishList: WishList & { items: WishListItem[] } =
            await response.json();

         set({ wishList, loading: false });
      } catch (e) {
         set({ error: true, loading: false });
         console.error(e);
      }
   },
   toggleWishList: async id => {
      try {
         set({ error: false });
         const response = await fetch(`/api/wishList?id=${id}`, {
            method: "POST",
         });

         if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
         }
      } catch (e) {
         set({ error: true, loading: false });
         console.error(e);
      }
   },
}));
