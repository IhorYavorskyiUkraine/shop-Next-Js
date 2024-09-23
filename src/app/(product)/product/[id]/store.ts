import { create } from "zustand";
import { ProductVariantOption } from "@prisma/client";

type ProductStore = {
   variant: ProductVariantOption | null;
   color: string;
   size: string;
   setColor: (color: string) => void;
   setSize: (size: string) => void;
   setVariant: (variant: ProductVariantOption) => void;
};

export const useProductStore = create<ProductStore>(set => ({
   variant: null,
   color: "",
   size: "",
   setVariant: variant => set({ variant }),
   setColor: color => set({ color }),
   setSize: size => set({ size }),
}));
