import { ProductVariantOption } from "@prisma/client";

export type CartItem = {
   id: number;
   cartId: number;
   productId: number;
   productVariantOptionId: number;
   quantity: number;
   sizeId: number;
   createdAt: Date;
   updatedAt: Date;
   productVariantOption?: ProductVariantOption & {
      color: {
         id: number;
         color: string;
      };
   };

   size: {
      id: number;
      size: string;
   };
   product: {
      id: number;
      name: string;
      description?: string | null;
      imageUrl: string;
      price: number;
      color?: {
         id: number;
         color: string;
      };
   };
};

export type Cart = {
   id: number;
   userId?: number | null;
   token?: string | null;
   totalAmount?: number;
   createdAt: Date;
   updatedAt: Date;
   items: CartItem[];
};
