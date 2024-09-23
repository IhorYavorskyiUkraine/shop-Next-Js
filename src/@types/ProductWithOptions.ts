import { ProductVariantOption } from "@prisma/client";

export interface ProductWithOptions {
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
   productVariantOptions: ProductVariantOption[];
}
