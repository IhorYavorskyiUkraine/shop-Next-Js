import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
   totalPages: number;
}

export const ProductPagination: React.FC<Props> = () => {
   const [totalPages, setTotalPages] = useState([]);
   const [currentPage, setCurrentPage] = useState<null | number>(null);
   const [isActive, setIsActive] = useState(false);

   return (
      <Pagination className="mt-5">
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious href="#" />
            </PaginationItem>
            <div className="flex items-center gap-1">
               <PaginationItem>
                  <PaginationLink
                     className={cn(
                        isActive ? "bg-gray" : "",
                        "!h-[36px] !w-[36px] rounded-[8px]",
                     )}
                     href="#"
                  >
                     <span
                        className={cn(
                           isActive ? "opacity-100" : "opacity-60",
                           "text-sm font-medium leading-20",
                        )}
                     >
                        1
                     </span>
                  </PaginationLink>
               </PaginationItem>
               <PaginationItem>
                  <PaginationEllipsis />
               </PaginationItem>
            </div>
            <PaginationItem>
               <PaginationNext href="#" />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
};
