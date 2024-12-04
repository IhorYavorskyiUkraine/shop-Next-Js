import { ProductCard } from "@/components/shared/ProductCard";
import { Skeleton } from "@/components/shared/Skeleton";
import { Title } from "@/components/ui/title";
import { useEffect } from "react";
import { useProfileStore } from "../store";

export const ProfileWishListTab: React.FC = () => {
   const [wishList, fetchWishList, toggleWishList, loading] = useProfileStore(
      state => [
         state.wishList,
         state.fetchWishList,
         state.toggleWishList,
         state.loading,
      ],
   );

   useEffect(() => {
      fetchWishList();
   }, []);

   const deleteFromWishList = async (id: number) => {
      await toggleWishList(id);
      fetchWishList();
   };

   if (wishList?.items?.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center">
            <Title text="No Wishlisted Products" className="mb-5 text-center" />
            <p className="text-[64px]">😞</p>
         </div>
      );
   }

   return (
      <div className="flex gap-4 overflow-x-scroll md:grid md:grid-cols-2 md:overflow-x-hidden lg:grid-cols-3">
         {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                 <Skeleton productCard key={index} />
              ))
            : wishList?.items?.map((product, index) => (
                 <ProductCard
                    key={index}
                    id={product.productId}
                    imageUrl={product.imageUrl}
                    name={product.name}
                    rating={product.rating || 0}
                    price={product.price}
                    oldPrice={product.oldPrice || 0}
                    toggleList={() => deleteFromWishList(product.productId)}
                    wishList
                 />
              ))}
      </div>
   );
};
