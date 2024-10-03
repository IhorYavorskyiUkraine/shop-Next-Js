import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const CartBtn: React.FC = () => {
   return (
      <Link href="/cart">
         <ShoppingCart color={"#000"} size={20} />
         <span>{0}</span>
      </Link>
   );
};
