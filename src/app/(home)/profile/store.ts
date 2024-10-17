"use client";

import { User } from "@prisma/client";
import { create } from "zustand";

type ProfileStore = {
   user: User | null;
   loading: boolean;
   error: boolean;
   fetchUser: () => void;
};

export const useProfileStore = create<ProfileStore>(set => ({
   user: null,
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
}));
