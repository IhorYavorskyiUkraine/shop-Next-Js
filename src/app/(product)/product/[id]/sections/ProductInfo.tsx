"use client";

import { ProductAbout } from "../components/ProductAbout";
import { ProductImage } from "../components/ProductImage";
import { useProductStore } from "../store";
import { useEffect } from "react";

export const ProductInfo: React.FC = () => {
   const [product, setVariant, setColor, setSize, setQuantity] =
      useProductStore(state => [
         state.product,
         state.setVariant,
         state.setColor,
         state.setSize,
         state.setQuantity,
      ]);

   if (!product) {
      return;
   }

   useEffect(() => {
      if (!product) {
         return;
      }

      if (product.productVariantOptions.length > 0) {
         setVariant(product.productVariantOptions[0]);
         setColor(product.productVariantOptions[0].colorId);
         setSize(product.productVariantOptions[0].sizes[0].size);
         setQuantity(0);
      }
   }, [product]);

   return (
      <div className="gap-10 md:grid md:grid-cols-[610px,_1fr]">
         <ProductImage />
         <ProductAbout product={product} />
      </div>
   );
};
