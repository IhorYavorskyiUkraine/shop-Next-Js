import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

export const ReviewOptions: React.FC = () => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Ellipsis size={20} className="text-black/40" />
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuItem>Report</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
