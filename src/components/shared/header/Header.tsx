"use client";

import { ShoppingCart } from "lucide-react";
import { Container } from "../../ui/container";
import Link from "next/link";
import { Burger } from "./components/Burger";
import { Menu } from "./components/Menu";
import { TopBanner } from "../TopBanner";
import { SearchInput } from "./components/SearchInput";
import { SearchInputMobile } from "./components/SearchInputMobile";
import { useSession, signIn } from "next-auth/react";
import { AuthModal } from "./components/authModal/AuthModal";
import { useState } from "react";

export const Header: React.FC = () => {
   const [openAuthModal, setOpenAuthModal] = useState(false);

   const { data: session, status } = useSession();

   return (
      <>
         {/* TODO: remove if signed in */}
         {status === "unauthenticated" && <TopBanner />}
         {/* TODO: remove if signed in */}
         <header className="z-50 bg-white py-[22px]">
            <Container className="flex items-center">
               <div className="md:hidden">
                  <Burger />
               </div>
               <Link
                  href="/"
                  className="max-w-[160px] flex-1 -translate-y-1 justify-self-start pl-[24px] font-integral-b text-[26px] font-bold uppercase leading-30 md:pl-0"
               >
                  shop.co
               </Link>
               <Menu />
               <SearchInput />
               <div className="flex flex-1 items-center justify-end gap-4 pl-6 md:flex-none md:gap-5">
                  <SearchInputMobile />
                  <Link href="/cart">
                     <ShoppingCart color={"#000"} size={20} />
                  </Link>
                  <AuthModal
                     open={openAuthModal}
                     onClose={() => setOpenAuthModal(false)}
                  />
               </div>
            </Container>
         </header>
      </>
   );
};
