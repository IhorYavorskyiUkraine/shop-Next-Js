import * as React from "react";
import { ArrowLeft, ArrowRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
   <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
   />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
   HTMLUListElement,
   React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
   <ul
      ref={ref}
      className={cn(
         "flex flex-1 flex-row items-center justify-between gap-1",
         className,
      )}
      {...props}
   />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
   HTMLLIElement,
   React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
   <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
   isActive?: boolean;
} & Pick<ButtonProps, "size"> &
   React.ComponentProps<"a">;

const PaginationLink = ({
   className,
   isActive,
   size = "none",
   ...props
}: PaginationLinkProps) => (
   <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
         buttonVariants({
            variant: "none",
            size,
         }),
         className,
      )}
      {...props}
   />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
   className,
   ...props
}: React.ComponentProps<typeof PaginationLink>) => (
   <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
         "!h-[36px] !w-[90px] cursor-pointer gap-3 rounded-[8px] border-[1px] border-black/10 !px-0 !py-0",
         className,
      )}
      {...props}
   >
      <ArrowLeft className="size-4" />
      <span className="text-sm font-medium leading-20">Previous</span>
   </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
   className,
   ...props
}: React.ComponentProps<typeof PaginationLink>) => (
   <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
         "!h-[36px] !w-[73px] cursor-pointer gap-3 rounded-[8px] border-[1px] border-black/10 !px-0 !py-0",
         className,
      )}
      {...props}
   >
      <span className="text-sm font-medium leading-20">Next</span>
      <ArrowRight className="size-4" />
   </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
   className,
   ...props
}: React.ComponentProps<"span">) => (
   <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
   >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
   </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
};
