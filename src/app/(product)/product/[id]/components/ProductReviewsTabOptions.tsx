import { Review } from "@/@types/Author";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type Props = {
   setOrderBy: (orderBy: string) => void;
};

export const ProductReviewsTabOptions: React.FC<Props> = ({ setOrderBy }) => {
   return (
      <div className="flex items-center">
         <DropdownMenu>
            <DropdownMenuTrigger className="flex w-[120px] items-center justify-center gap-1 pb-1">
               <span className="text-medium font-bold leading-22">Sort By</span>
               <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               <DropdownMenuItem onClick={() => setOrderBy("desc")}>
                  Newest First
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setOrderBy("asc")}>
                  Oldest First
               </DropdownMenuItem>
            </DropdownMenuContent>
            <Button variant="black">Write a Review</Button>
         </DropdownMenu>
      </div>
   );
};