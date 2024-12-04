import { AuthModal } from "@/components/shared/header/components/authModal/AuthModal";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { useProductStore } from "../store";
import { ReviewModal } from "./ReviewModal";

export const ProductReviewsTabOptions: React.FC = () => {
   const setOrderBy = useProductStore(state => state.setOrderBy);

   const ref = useRef(null);

   useClickAway(ref, () => {
      setOpen(false);
   });

   const { data: session } = useSession();
   const [open, setOpen] = useState(false);

   return (
      <div className="flex items-center">
         <DropdownMenu>
            <DropdownMenuTrigger className="flex w-[120px] items-center justify-center gap-1 pb-1">
               <span className="text-medium font-bold leading-22">Sort By</span>
               <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent ref={ref}>
               <DropdownMenuItem onClick={() => setOrderBy("desc")}>
                  Newest First
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setOrderBy("asc")}>
                  Oldest First
               </DropdownMenuItem>
            </DropdownMenuContent>
            {session ? (
               <ReviewModal
                  session={session}
                  open={open}
                  onClose={() => setOpen(false)}
               />
            ) : (
               <AuthModal
                  redirect={false}
                  open={open}
                  onClose={() => setOpen(false)}
               />
            )}
            <Button
               className="h-10 w-[81px] text-xs md:h-[52px] md:w-[166px] md:text-md"
               onClick={() => setOpen(true)}
               variant="black"
            >
               Write a Review
            </Button>
         </DropdownMenu>
      </div>
   );
};
