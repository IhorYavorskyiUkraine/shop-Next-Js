import { Skeleton } from "@/components/shared/Skeleton";
import { ProductAbout } from "../components/ProductAbout";
import { ProductImage } from "../components/ProductImage";
import { useProductStore } from "../store";
import { useEffect } from "react";

export const ProductInfo: React.FC = () => {
   const [product, setVariant, setColor, setSize, setQuantity, loading] =
      useProductStore(state => [
         state.product,
         state.setVariant,
         state.setColor,
         state.setSize,
         state.setQuantity,
         state.loading,
      ]);

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
         {/* TODO: Skeleton for both  */}
         {loading ? <Skeleton productImages /> : <ProductImage />}
         {loading ? <Skeleton /> : <ProductAbout />}
      </div>
   );
};
