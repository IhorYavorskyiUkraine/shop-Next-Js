import { CircleUserRound, Search, ShoppingCart } from "lucide-react";
import { Input } from "../../ui/input";
import { Container } from "../../ui/container";
import Link from "next/link";
import { Burger } from "./components/Burger";
import { Menu } from "./components/Menu";
import { TopBanner } from "../TopBanner";

export const Header: React.FC = () => {
   return (
      <>
         {/* TODO: remove if signed in */}
         <TopBanner />
         {/* TODO: remove if signed in */}
         <header className="bg-white py-[22px]">
            <Container className="flex items-center">
               <Burger />
               <Link
                  href="/"
                  className="max-w-[160px] flex-1 -translate-y-1 justify-self-start pl-[24px] font-integral-b text-[26px] font-bold uppercase leading-30 md:pl-0"
               >
                  shop.co
               </Link>
               <Menu />
               <Input
                  placeholder="Search for products..."
                  className={"hidden flex-1 md:flex"}
                  icon={<Search color={"#00000066"} size={20} />}
               />
               <div className="flex flex-1 items-center justify-end gap-4 pl-6 md:flex-none md:gap-5">
                  <Search color={"#000"} size={20} className="md:hidden" />
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
