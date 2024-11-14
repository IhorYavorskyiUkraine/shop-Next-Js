import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { useCategoryStore } from "../store";
import { useClickAway } from "react-use";

export const ProductSortBy: React.FC = () => {
   const [sortBy, setSortBy] = useCategoryStore(state => [
      state.sortBy,
      state.setSortBy,
   ]);
   const [open, setOpen] = useState(false);
   const ref = useRef(null);

   useClickAway(ref, () => {
      setOpen(false);
   });

   const sortOptions = [
      { id: "popularity", label: "Popularity" },
      { id: "price_asc", label: "Price: Low to High" },
      { id: "price_desc", label: "Price: High to Low" },
   ];

   const handleSelect = (option: (typeof sortOptions)[0]) => {
      setSortBy(option);
      setOpen(false);
   };

   return (
      <div ref={ref} className="flex items-center">
         <DropdownMenu open={open}>
            <DropdownMenuTrigger
               onClick={() => setOpen(!open)}
               className="flex -translate-y-[-2px] items-center justify-center gap-1 pb-1"
            >
               <span className="text-medium font-bold leading-22">
                  {sortBy.label}
               </span>
               <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               {sortOptions.map(option => (
                  <DropdownMenuItem
                     key={option.id}
                     onClick={() => handleSelect(option)}
                  >
                     {option.label}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};
