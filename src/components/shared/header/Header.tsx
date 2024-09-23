import { CircleUserRound, Search, ShoppingCart } from "lucide-react";
import { Container } from "../../ui/container";
import Link from "next/link";
import { Burger } from "./components/Burger";
import { Menu } from "./components/Menu";
import { TopBanner } from "../TopBanner";
import { SearchInput } from "./components/SearchInput";
import { SearchInputMobile } from "./components/SearchInputMobile";

export const Header: React.FC = () => {
   return (
      <>
         {/* TODO: remove if signed in */}
         <TopBanner />
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
                  <Link href="/account">
                     <CircleUserRound color={"#000"} size={20} />
                  </Link>
               </div>
            </Container>
         </header>
      </>
   );
};
