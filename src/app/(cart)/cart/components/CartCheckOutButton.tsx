import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Props {
   contactOpen: boolean;
   isSubmitting: boolean;
   setContactOpen: (value: boolean) => void;
}

export const CartCheckOutButton: React.FC<Props> = ({
   setContactOpen,
   contactOpen,
   isSubmitting,
}) => {
   return contactOpen ? (
      <Button
         loading={isSubmitting}
         type="submit"
         className="group !w-full"
         variant="black"
      >
         <div className="flex items-center gap-1">
            <span>Buy</span>
            <ArrowRight
               className="transition group-hover:translate-x-1"
               size={16}
            />
         </div>
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
