import { ProductVariantOption, ReviewReply } from "@prisma/client";

export interface ProductWithVariantsAndDetails {
   id: number;
   name: string;
   description?: string | null;
   imageUrl: string;
   price: number;
   oldPrice?: number | null;
   rating?: number | null;
   productCategoryId: number;
   dressStyleId: number;
   categoryId?: number | null;
   createdAt: Date;
   reviews: Review[];
   updatedAt: Date;
   productDetails: ProductDetails[];
   productVariantOptions: ProductVariantOptionWithSizes[];
}

export interface ProductVariantOptionWithSizes {
   id: number;
   productId: number;
   colorId: number;
   price: number;
   oldPrice: number | null;
   imageUrl: string[];
   stockQuantity: number;
   createdAt: Date;
   updatedAt: Date;
   sizes: Size[];
}

interface ProductDetails {
   id: number;
   productId: number;
   name: string;
   value: string;
}

interface Size {
   id: number;
   size: string;
}

export interface ProductVariantWithSizes extends ProductVariantOption {
   sizes: { id: number; size: string }[];
}

export interface Review {
   id: number;
   author: {
      fullName: string;
   };
   rating?: number;
   text: string;
   purchase?: {
      productId: number;
   };
   reviewReplies?: ReviewReply[];
   createdAt: Date;
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
   reviews: Review[];
}
