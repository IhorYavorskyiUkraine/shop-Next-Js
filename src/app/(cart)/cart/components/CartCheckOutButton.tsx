import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Props {
   contactOpen: boolean;
   isSubmitting: boolean;
   setContactOpen: (value: boolean) => void;
   triggerSubmit: () => void;
}

export const CartCheckOutButton: React.FC<Props> = ({
   setContactOpen,
   contactOpen,
   isSubmitting,
   triggerSubmit,
}) => {
   return contactOpen ? (
      <Button
         onClick={triggerSubmit}
         loading={isSubmitting}
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
         type="button"
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
