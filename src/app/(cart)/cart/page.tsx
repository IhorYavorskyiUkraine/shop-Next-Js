"use client";

import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { Container } from "@/components/ui/container";
import { CartList } from "./components/CartList";
import { CartOrderSummary } from "./components/CartOrderSummary";
import { Title } from "@/components/ui/title";
import { useCartStore } from "./store";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/shared/Skeleton";
import { ContactForm } from "./components/ContactForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema } from "@/lib/constants";
import toast from "react-hot-toast";
import { createOrder } from "@/app/actions";

const CartPage = () => {
   const [cart, fetchCart, loading] = useCartStore(state => [
      state.cart,
      state.fetchCart,
      state.loading,
   ]);

   const [isSubmitting, setIsSubmitting] = useState(false);

   const form = useForm({
      resolver: zodResolver(checkoutFormSchema),
      defaultValues: {
         firstName: "",
         lastName: "",
         email: "",
         phone: "",
         address: "",
         comment: "",
      },
   });

   const [contactOpen, setContactOpen] = useState(false);

   useEffect(() => {
      fetchCart();
   }, [fetchCart]);

   const onSubmit = async (data: any) => {
      try {
         setIsSubmitting(true);
         if (!data) {
            return;
         }

         const url = await createOrder(data);

         toast.success("Order created", {
            icon: "✅",
         });

         if (url) {
            window.location.href = url;
         }

         setIsSubmitting(false);
      } catch (e) {
         console.error(e);
         toast.error("Something went wrong", {
            icon: "❌",
         });
      }
   };

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
            <BreadCrumb
               name={
                  contactOpen
                     ? { name: "Contact Form", link: "/contact" }
                     : { name: "Cart", link: "/cart" }
               }
            />
            <Title
               className="mb-5 text-2xl md:mb-6 md:-translate-y-1 md:!text-4xl"
               text={contactOpen ? "Contact Form" : "Your Cart"}
            />
            <FormProvider {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-5 pb-12 md:flex-row md:items-start md:pb-[80px]">
                     {loading ? (
                        <Skeleton cartList />
                     ) : contactOpen ? (
                        <ContactForm setContactOpen={setContactOpen} />
                     ) : (
                        <CartList cartItems={cart.items} />
                     )}
                     <CartOrderSummary
                        isSubmitting={isSubmitting}
                        setContactOpen={setContactOpen}
                        contactOpen={contactOpen}
                        cartItems={cart.items}
                     />
                  </div>
               </form>
            </FormProvider>
         </Container>
      );
   } catch (error) {
      console.error("Error fetching product:", error);
   }
};

export default CartPage;
