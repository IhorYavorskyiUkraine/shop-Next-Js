import { Button } from "@/components/ui/button";
import { useProductStore } from "../store";
import { useCartStore } from "@/app/(cart)/cart/store";
import { ProductWithVariantsAndDetails } from "@/@types/Product";
import toast from "react-hot-toast";
import { CountButton } from "@/components/shared/CountButton";
import { ProductVariantOption } from "@prisma/client";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
   product: ProductWithVariantsAndDetails;
   variant: ProductVariantOption;
}

export const ProductAddToCart: React.FC<Props> = ({ product, variant }) => {
   const [quantity, setQuantity, size] = useProductStore(state => [
      state.quantity,
      state.setQuantity,
      state.size,
   ]);
   const [addToCart, loading] = useCartStore(state => [
      state.addToCart,
      state.loading,
   ]);

   const [needToAdd, setNeedToAdd] = useState(true);

   const onClickCountButton = (quantity: number, type: "plus" | "minus") => {
      setNeedToAdd(false);
      const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
      setQuantity(newQuantity);
   };

   const handleAddToCart = () => {
      if (loading) {
         return;
      }

      needToAdd && setQuantity(quantity + 1);

      const item = {
         productId: product.id,
         productVariantOptionId: variant.id,
         quantity: quantity || 1,
         sizeId: size.id,
      };

      addToCart(item);

      toast.success(`${product.name} added to your cart`, {
         icon: "✅",
      });

      setNeedToAdd(true);
   };

   return (
      <div className="grid grid-cols-[112px,_1fr] items-center gap-3 py-6 md:grid-cols-1 lg:grid-cols-[112px,_1fr]">
         <CountButton
            className="!h-full"
            value={quantity}
            onClick={type => onClickCountButton(quantity, type)}
         />
         <Button
            className={cn(loading && "opacity-50", "md:w-full")}
            onClick={handleAddToCart}
            variant="black"
            loading={loading}
         >
            Add to Cart
         </Button>
      </div>
   );
};
