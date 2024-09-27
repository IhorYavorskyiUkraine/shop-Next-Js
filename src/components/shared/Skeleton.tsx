import { cn } from "@/lib/utils";
import { Skeleton as SkeletonBar } from "../ui/skeleton";

type Props = {
   productCard?: boolean;
   comment?: boolean;
   productImages?: boolean;
   productInfo?: boolean;
   reviewDate?: boolean;
};

export const Skeleton: React.FC<Props> = ({
   productCard,
   comment,
   productImages,
   productInfo,
   reviewDate,
}) => {
   if (productCard) {
      return (
         <div className="flex flex-col space-y-3">
            <SkeletonBar className="h-[200px] w-[200px] rounded-[14px] bg-black/5 md:h-[300px] md:w-[300px]" />
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
   } else if (productImages) {
      return (
         <div className="mb-5 items-center justify-between md:mb-0 md:flex md:flex-row-reverse">
            <SkeletonBar className="h-[280px] w-full rounded-[20px] bg-black/5 md:h-[530px] md:w-[444px]" />
            <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-1 md:grid-rows-3 md:gap-[14px]">
               {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonBar
                     key={index}
                     className="mb-1 rounded-[20px] bg-black/5 md:mb-2 md:h-[162px] md:w-[152px]"
                  />
               ))}
            </div>
         </div>
      );
   } else if (productInfo) {
      return <div></div>;
   }
};