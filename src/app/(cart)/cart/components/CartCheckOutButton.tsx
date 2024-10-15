import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
   contactOpen: boolean;
   setContactOpen: (value: boolean) => void;
}

export const CartCheckOutButton: React.FC<Props> = ({
   setContactOpen,
   contactOpen,
}) => {
   return contactOpen ? (
      <Button
         className="group !w-full"
         onClick={() => setContactOpen(true)}
         variant="black"
      >
         <Link href="/checkout" className="flex items-center gap-1">
            <span>Create Order</span>
            <ArrowRight
               className="transition group-hover:translate-x-1"
               size={16}
            />
         </Link>
      </Button>
   ) : (
      <Button
         className="group !w-full"
         onClick={() => setContactOpen(true)}
         variant="black"
      >
         <div className="flex items-center gap-1">
            <span>Go to Checkout</span>
            <ArrowRight
               className="transition group-hover:translate-x-1"
               size={16}
            />
         </div>
      </Button>
   );
};
