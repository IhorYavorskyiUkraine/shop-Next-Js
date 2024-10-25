"use client";

import { User } from "@prisma/client";
import { create } from "zustand";

type ProfileStore = {
   user: User | null;
   addressBook: any[] | null;
   loading: boolean;
   error: boolean;
   fetchUser: () => void;
   fetchAddressBook: () => void;
   toggleAddressActivity: (id: number) => Promise<void>;
   deleteAddress: (id: number) => Promise<void>;
};

export const useProfileStore = create<ProfileStore>(set => ({
   user: null,
   addressBook: null,
   loading: true,
   error: false,
   fetchUser: async () => {
      try {
         set({ error: false });
         const response = await fetch("/api/user");

         if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
         }

         const user: User = await response.json();
         set({ user });
         set({ loading: false });
      } catch (e) {
         set({ error: true });
         set({ loading: false });
         console.error(e);
      }
   },
   fetchAddressBook: async () => {
      try {
         set({ error: false });

         const response = await fetch("/api/addressBook");

         if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
         }

         const addressBook = await response.json();

         set({ addressBook });
         set({ loading: false });
      } catch (e) {
         set({ error: true });
         set({ loading: false });
         console.error(e);
      }
   },
   toggleAddressActivity: async id => {
      try {
         set({ error: false });
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
}));
