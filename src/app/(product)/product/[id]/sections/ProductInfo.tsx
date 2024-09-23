"use client";

import { ProductAbout } from "../components/ProductAbout";
import { ProductImage } from "../components/ProductImage";
import { useProductStore } from "../store";
import { useEffect } from "react";
import { ProductWithOptions } from "@/@types/ProductWithOptions";

interface Props {
   product: ProductWithOptions;
}

export const ProductInfo: React.FC<Props> = ({ product }) => {
   const [variant, setVariant] = useProductStore(state => [
      state.variant,
      state.setVariant,
   ]);

   useEffect(() => {
      if (product.productVariantOptions.length > 0) {
         setVariant(product.productVariantOptions[0]);
      }
   }, []);

   return (
      <div className="gap-10 md:grid md:grid-cols-[610px,_1fr]">
         <ProductImage imageUrls={variant?.imageUrl || []} />
         <ProductAbout product={product as ProductWithOptions} />
      </div>
   );
};
