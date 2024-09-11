import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import { Input } from "../../ui/input";
import { Container } from "../../ui/container";
import { List } from "./components/List";
import Link from "next/link";

export const Header: React.FC = () => {
   return (
      <header className="bg-white py-[22px]">
         <Container className="flex items-center">
            <Menu color={"#000"} size={24} className="md:hidden" />
            <Link
               href="/"
               className="leading-30 max-w-[160px] flex-1 -translate-y-1 justify-self-start pl-[24px] font-integral-b text-[26px] font-bold uppercase md:pl-0"
            >
               shop.co
            </Link>
            <List />
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
   );
};
