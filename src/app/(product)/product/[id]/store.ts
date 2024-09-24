import { create } from "zustand";
import { ProductVariantOption } from "@prisma/client";

type ProductStore = {
   variant: ProductVariantOption | null;
   color: string | number;
   size: string;
   quantity: number;
   setColor: (color: string | number) => void;
   setSize: (size: string) => void;
   setVariant: (variant: ProductVariantOption) => void;
   setQuantity: (quantity: number) => void;
};

export const useProductStore = create<ProductStore>(set => ({
   variant: null,
   color: "",
   size: "",
   quantity: 0,
   setVariant: variant => set({ variant }),
   setColor: color => set({ color }),
   setSize: size => set({ size }),
   setQuantity: quantity => set(quantity <= 0 ? { quantity: 0 } : { quantity }),
}));
