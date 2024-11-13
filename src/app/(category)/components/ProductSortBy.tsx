import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
   selectedSort: {
      id: string;
      label: string;
   };
   setSelectedSort: React.Dispatch<
      React.SetStateAction<{
         id: string;
         label: string;
      }>
   >;
   sortOptions: { id: string; label: string }[];
}

export const ProductSortBy: React.FC<Props> = ({
   selectedSort,
   setSelectedSort,
   sortOptions,
}) => {
   const [open, setOpen] = useState(false);

   const handleSelect = (option: (typeof sortOptions)[0]) => {
      setSelectedSort(option);
      setOpen(false);
   };

   return (
      <div className="flex items-center">
         <DropdownMenu open={open}>
            <DropdownMenuTrigger
               onClick={() => setOpen(!open)}
               className="flex -translate-y-[-2px] items-center justify-center gap-1 pb-1"
            >
               <span className="text-medium font-bold leading-22">
                  {selectedSort.label}
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
