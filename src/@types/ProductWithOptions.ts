import { ProductVariantOption } from "@prisma/client";

export interface ProductVariantWithSizes extends ProductVariantOption {
   sizes: { id: number; size: string }[];
}

interface Review {
   id: number;
   author: {
      fullName: string;
   };
   rating: number;
   text: string;
   createdAt: Date;
   purchase: {
      productId: number;
      createdAt: Date; // Обязательно
   } | null;
}

export interface ProductWithRelations {
   id: number;
   name: string;
   description: string | null;
   imageUrl: string;
   price: number;
   oldPrice: number | null;
   rating: number | null;
   productCategoryId: number;
   dressStyleId: number;
   createdAt: Date;
   updatedAt: Date;
   categoryId: number | null;
   productVariantOptions: ProductVariantWithSizes[];
   productDetails: {
      name: string;
      value: string;
   }[];
   reviews: {
      id: number;
      author: {
         fullName: string;
      };
      rating: number;
      text: string;
      createdAt: Date;
      purchase: {
         productId: number;
      } | null;
   }[];
}
