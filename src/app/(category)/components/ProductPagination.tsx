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

interface Props {
   totalPages: number;
   currentPage: number;
   setOffset: (offset: number) => void;
   onPageChange: (page: number) => void;
}

export const ProductPagination: React.FC<Props> = ({
   totalPages,
   currentPage,
   setOffset,
   onPageChange,
}) => {
   const handlePageClick = (page: number) => {
      onPageChange(page);
      setOffset((page - 1) * 10);
   };

   const handleNextPage = () => {
      if (currentPage && currentPage < totalPages) {
         handlePageClick(currentPage + 1);
      }
   };

   const handlePrevPage = () => {
      if (currentPage && currentPage > 1) {
         handlePageClick(currentPage - 1);
      }
   };
   const getPageNumbers = () => {
      const pages: number[] = [];
      const maxPagesToShow = 6;
      const halfWindowSize = Math.floor(maxPagesToShow / 2);

      const leftEdge = Math.max(1, currentPage - halfWindowSize);
      const rightEdge = Math.min(totalPages, currentPage + halfWindowSize);

      for (let i = leftEdge; i <= rightEdge; i++) {
         pages.push(i);
      }

      if (leftEdge > 1) {
         pages.unshift(-1);
      }

      if (rightEdge < totalPages) {
         pages.push(-2);
      }

      return pages;
   };

   return (
      <Pagination className="mb-12 mt-5">
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious onClick={handlePrevPage} />
            </PaginationItem>
            <div className="flex items-center gap-1">
               {getPageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                     {page === -1 ? (
                        <PaginationEllipsis />
                     ) : page === -2 ? (
                        <PaginationEllipsis />
                     ) : (
                        <PaginationLink
                           className={cn(
                              currentPage === page ? "bg-gray" : "",
                              "!h-[36px] !w-[36px] rounded-[8px]",
                           )}
                           href="#"
                           onClick={() => handlePageClick(page)}
                        >
                           <span
                              className={cn(
                                 currentPage === page
                                    ? "opacity-100"
                                    : "opacity-60",
                                 "text-sm font-medium leading-20",
                              )}
                           >
                              {page}
                           </span>
                        </PaginationLink>
                     )}
                  </PaginationItem>
               ))}
            </div>
            <PaginationItem>
               <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
};
