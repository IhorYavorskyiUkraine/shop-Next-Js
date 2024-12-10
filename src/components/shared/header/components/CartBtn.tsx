import { Cart } from "@/@types/Cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Props {
   cart: Cart | null;
}

export const CartBtn: React.FC<Props> = ({ cart }) => {
   return (
      <Link className="relative" href="/cart">
         <ShoppingCart color={"#000"} size={20} />
         <span className="absolute -bottom-2">
            {cart?.items?.length || null}
         </span>
      </Link>
   );
};
