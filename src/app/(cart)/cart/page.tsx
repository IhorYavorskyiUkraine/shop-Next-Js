"use client";

import { useProfileStore } from "@/app/(home)/profile/store";
import { createOrder, isFirstOrder } from "@/app/actions";
import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { Skeleton } from "@/components/shared/Skeleton";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { checkoutFormSchema, CheckoutFormValues } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CartList } from "./components/CartList";
import { CartOrderSummary } from "./components/CartOrderSummary";
import { ContactForm } from "./components/ContactForm";
import { useCartStore } from "./store";

const CartPage = () => {
   const [cart, fetchCart, setIsFirstOrder, firstOrder, loading] = useCartStore(
      state => [
         state.cart,
         state.fetchCart,
         state.setFirstOrder,
         state.firstOrder,
         state.loading,
      ],
   );
   const [user, fetchUser] = useProfileStore(state => [
      state.user,
      state.fetchUser,
   ]);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [contactOpen, setContactOpen] = useState(false);
   const userAddress =
      user?.usersAddressBook?.address?.filter(address => address.active) || [];

   const [firstName = "", lastName = ""] =
      userAddress[0]?.fullName.split(" ") || [];

   const form = useForm<CheckoutFormValues>({
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

   useEffect(() => {
      fetchCart();
      fetchUser();
      try {
         async function checkFirstOrder() {
            const result = await isFirstOrder();
            setIsFirstOrder(result);
         }
         checkFirstOrder();
      } catch (e) {
         console.error(e);
      }
   }, [fetchCart]);

   useEffect(() => {
      if (userAddress && userAddress.length > 0) {
         const address = [
            userAddress[0].city ? `m. ${userAddress[0].city}` : "",
            userAddress[0].street ? `vul. ${userAddress[0].street}` : "",
            userAddress[0].house ? `${userAddress[0].house}` : "",
            userAddress[0].apartment ? `kv. ${userAddress[0].apartment}` : "",
            userAddress[0].postcode ? `${userAddress[0].postcode}` : "",
         ]
            .filter(Boolean)
            .join(", ");

         if (user) {
            form.reset({
               firstName: firstName || "",
               lastName: lastName || "",
               phone: userAddress[0].phone || "",
               address: address || "",
               email: user.email || "",
            });
         }
      }
   }, [user]);

   const onSubmit = async (data: CheckoutFormValues) => {
      try {
         setIsSubmitting(true);
         if (!data) {
            return;
         }

         const fullName = `${data.firstName} ${data.lastName}`;

         const url = await createOrder(data, fullName, firstOrder);

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

   const triggerSubmit = () => {
      form.handleSubmit(onSubmit)();
   };

   if (!cart || cart.items?.length === 0) {
      return (
         <Container className="flex h-[400px] flex-col items-center justify-center">
            <Title text="Your cart is empty" className="mb-5 text-center" />
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
         <div className="flex flex-col gap-5 pb-12 md:flex-row md:items-start md:pb-[80px]">
            <FormProvider {...form}>
               {loading ? (
                  <Skeleton cartList />
               ) : contactOpen ? (
                  <ContactForm
                     onSubmit={onSubmit}
                     setContactOpen={setContactOpen}
                  />
               ) : (
                  <CartList cartItems={cart.items} />
               )}
               <CartOrderSummary
                  isSubmitting={isSubmitting}
                  setContactOpen={setContactOpen}
                  contactOpen={contactOpen}
                  triggerSubmit={triggerSubmit}
                  cartItems={cart.items}
                  firstOrder={firstOrder}
               />
            </FormProvider>
         </div>
      </Container>
   );
};

export default CartPage;
