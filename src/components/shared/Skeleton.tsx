import { cn } from "@/lib/utils";
import { Skeleton as SkeletonBar } from "../ui/skeleton";

type Props = {
   productCard?: boolean;
   comment?: boolean;
   productInfo?: boolean;
   reviewDate?: boolean;
   productTabs?: boolean;
   cartList?: boolean;
   cartSummary?: boolean;
   address?: boolean;
   category?: boolean;
   avatar?: boolean;
};

export const Skeleton: React.FC<Props> = ({
   productCard,
   comment,
   productInfo,
   reviewDate,
   productTabs,
   cartList,
   cartSummary,
   address,
   category,
   avatar,
}) => {
   if (productCard) {
      return (
         <div className="flex flex-col space-y-3">
            <SkeletonBar
               className={cn(
                  category ? "size-[174px]" : "size-[200px]",
                  "rounded-[14px] bg-black/5 md:h-[300px] md:w-[300px]",
               )}
            />
            <div className="space-y-2">
               <SkeletonBar className="mb-[10px] h-5 w-[160px] bg-black/5 md:mb-4 md:w-[300px]" />
               <SkeletonBar className="mb-1 h-4 w-[140px] bg-black/5 md:mb-2 md:w-[150px]" />
               <SkeletonBar className="mb-1 h-7 w-[100px] bg-black/5 md:mb-2 md:w-[150px]" />
            </div>
         </div>
      );
   } else if (comment) {
      return (
         <div className="rounded-[20px] border border-black/10 p-6">
            <div className={cn(reviewDate && "flex justify-between", "mb-2")}>
               <SkeletonBar className="h-4 w-[120px] bg-black/5" />
               {reviewDate && <SkeletonBar className="h-2 w-5 bg-black/5" />}
            </div>
            <div className="mb-2 flex items-center gap-1 md:mb-2 md:text-lg">
               <SkeletonBar className="h-4 w-[80px] bg-black/5" />
               <SkeletonBar className="h-4 w-4 rounded-full bg-black/5" />
            </div>
            <SkeletonBar className="mb-2 h-12 w-full bg-black/5" />
            <SkeletonBar className="h-5 w-[200px] bg-black/5" />
         </div>
      );
   } else if (productInfo) {
      return (
         <div className="gap-10 md:mb-5 md:grid md:grid-cols-[610px,_1fr]">
            <div className="mb-5 items-center justify-between md:mb-0 md:flex md:flex-row-reverse">
               <SkeletonBar className="h-[280px] w-full rounded-[20px] bg-black/5 md:h-[530px] md:w-[444px]" />
               <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-1 md:grid-rows-3 md:gap-[14px]">
                  {Array.from({ length: 3 }).map((_, index) => (
                     <SkeletonBar
                        key={index}
                        className="mb-1 h-[120px] w-[120px] rounded-[20px] bg-black/5 md:mb-2 md:h-[162px] md:w-[152px]"
                     />
                  ))}
               </div>
            </div>
            <div>
               <SkeletonBar className="mb-5 h-7 w-full bg-black/5 md:mb-6 md:h-12" />
               <SkeletonBar className="mb-5 h-5 w-full bg-black/5 md:mb-4" />
               <SkeletonBar className="mb-5 h-7 w-full bg-black/5 md:mb-4 md:h-10" />
               <SkeletonBar className="mb-5 h-[100px] w-full bg-black/5 md:mb-9" />
               <SkeletonBar className="mb-12 h-12 w-full bg-black/5" />
               <SkeletonBar className="mb-5 h-12 w-full bg-black/5 md:mb-7" />
               <SkeletonBar className="mb-5 h-12 w-full bg-black/5 md:mb-4" />
            </div>
         </div>
      );
   } else if (productTabs) {
      return (
         <div>
            <SkeletonBar className="mb-5 h-7 w-full bg-black/5 md:mb-6 md:h-12" />
            <SkeletonBar className="mb-12 h-7 w-full bg-black/5 md:mb-6 md:h-12" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
               {Array.from({ length: 6 }).map((_, index) => (
                  <div
                     key={index}
                     className="rounded-[20px] border border-black/10 p-6"
                  >
                     <div
                        className={cn(
                           reviewDate && "flex justify-between",
                           "mb-2",
                        )}
                     >
                        <SkeletonBar className="h-4 w-[120px] bg-black/5" />
                        {reviewDate && (
                           <SkeletonBar className="h-2 w-5 bg-black/5" />
                        )}
                     </div>
                     <div className="mb-2 flex items-center gap-1 md:mb-2 md:text-lg">
                        <SkeletonBar className="h-4 w-[80px] bg-black/5" />
                        <SkeletonBar className="h-4 w-4 rounded-full bg-black/5" />
                     </div>
                     <SkeletonBar className="mb-2 h-12 w-full bg-black/5" />
                     <SkeletonBar className="h-5 w-[200px] bg-black/5" />
                  </div>
               ))}
            </div>
         </div>
      );
   } else if (cartList) {
      return (
         <div className="flex flex-1 flex-col rounded-[20px] border-[1px] border-black/10 px-4 md:px-6">
            {Array.from({ length: 3 }).map((_, index) => (
               <div
                  key={index}
                  className={cn(
                     index < 2 && "border-b border-black/10",
                     "flex gap-3 py-3 md:py-5",
                  )}
               >
                  <SkeletonBar className="size-[100px] rounded-[8px] bg-black/5 md:size-[125px]" />
                  <div className="flex-1">
                     <div className="mb-1 flex items-center justify-between md:mb-3">
                        <SkeletonBar className="h-5 w-[100px] bg-black/5 md:h-6 md:w-[200px]" />
                        <SkeletonBar className="size-6 bg-black/5" />
                     </div>
                     <SkeletonBar className="mb-2 h-4 w-12 bg-black/5 md:mb-3 md:h-4 md:w-12" />
                     <SkeletonBar className="mb-1 h-4 w-12 bg-black/5 md:mb-4 md:h-4 md:w-[100px]" />
                     <div className="flex items-center justify-between">
                        <SkeletonBar className="h-5 w-[80px] bg-black/5 md:h-7 md:w-[100px]" />
                        <SkeletonBar className="h-6 w-[80px] bg-black/5 md:h-9 md:w-[100px]" />
                     </div>
                  </div>
               </div>
            ))}
         </div>
      );
   } else if (cartSummary) {
      return (
         <div className="rounded-[20px] border-[1px] border-black/10 p-5 md:w-[367px] md:p-6">
            <SkeletonBar className="bg-black/5 md:h-7 md:w-[180px]" />
            <div className="border-b-[1px] border-black/10 py-3">
               <SkeletonBar className="w-full bg-black/5 md:mb-2 md:h-7" />
               <SkeletonBar className="w-full bg-black/5 md:mb-2 md:h-7" />
               <SkeletonBar className="w-full bg-black/5 md:mb-2 md:h-7" />
            </div>
            <div className="md:pt-3">
               <SkeletonBar className="w-full bg-black/5 md:mb-3 md:h-7" />
               <SkeletonBar className="w-full bg-black/5 md:mb-3 md:h-12" />
               <SkeletonBar className="w-full bg-black/5 md:mb-3 md:h-12" />
            </div>
         </div>
      );
   } else if (address) {
      return (
         <div className="mb-4 border-b-[1px] border-black/10 pb-4 last:mb-0 last:border-b-0 last:pb-0">
            <div className="mb-2 flex items-center justify-between">
               <SkeletonBar className="h-4 w-[100px] bg-black/5 md:mb-3 md:h-4" />
               <SkeletonBar className="size-4 bg-black/5 md:mb-3 md:h-4" />
            </div>
            <div className="mb-1 flex items-center justify-between">
               <SkeletonBar className="h-4 w-[180px] bg-black/5 md:mb-3 md:h-4" />
               <SkeletonBar className="size-4 bg-black/5 md:mb-3 md:h-4" />
            </div>
            <SkeletonBar className="h-4 w-[100px] bg-black/5 md:mb-3 md:h-4" />
            <SkeletonBar className="h-4 w-[100px] bg-black/5 md:mb-3 md:h-4" />{" "}
            <SkeletonBar className="h-4 w-[100px] bg-black/5 md:mb-3 md:h-4" />
            <SkeletonBar className="h-4 w-[100px] bg-black/5 md:mb-3 md:h-4" />
            <div className="flex items-center justify-between">
               <SkeletonBar className="h-4 w-[100px] bg-black/5 md:mb-3 md:h-4" />
               <SkeletonBar className="h-4 w-6 bg-black/5 md:mb-3 md:h-4" />
            </div>
         </div>
      );
   } else if (avatar) {
      return <SkeletonBar className="size-28 rounded-full bg-black/5" />;
   }
};
