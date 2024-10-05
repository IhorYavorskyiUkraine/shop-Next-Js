"use client";

import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { Container } from "@/components/ui/container";
import { CartList } from "./components/CartList";
import { CartOrderSummary } from "./components/CartOrderSummary";
import { Title } from "@/components/ui/title";
import { useCartStore } from "./store";
import { useEffect } from "react";
import { Skeleton } from "@/components/shared/Skeleton";

const CartPage = () => {
   const [cart, fetchCart, loading] = useCartStore(state => [
      state.cart,
      state.fetchCart,
      state.loading,
   ]);

   useEffect(() => {
      fetchCart();
   }, [fetchCart]);

   try {
      if (!cart || cart.items?.length === 0) {
         return (
            <Container className="flex h-[400px] flex-col items-center justify-center">
               <Title text="Your cart is empty" className="mb-5" />
               <p className="text-[64px]">😞</p>
            </Container>
         );
      }

      return (
         <Container>
            <BreadCrumb name={{ name: "Cart", link: "/cart" }} />
            <Title
               className="mb-5 text-2xl md:mb-6 md:-translate-y-1 md:!text-4xl"
               text="Your Cart"
            />
            <div className="flex flex-col gap-5 pb-12 md:flex-row md:items-start md:pb-[80px]">
               {loading ? (
                  <Skeleton cartList />
               ) : (
                  <CartList cartItems={cart.items} />
               )}
               <CartOrderSummary cartItems={cart.items} />
            </div>
         </Container>
      );
   } catch (error) {
      console.error("Error fetching product:", error);
   }
};

export default CartPage;
