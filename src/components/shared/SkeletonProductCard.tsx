import { Skeleton } from "../ui/skeleton";

export const SkeletonProductCard: React.FC = () => {
   return (
      <div className="flex flex-col space-y-3">
         <Skeleton className="h-[200px] w-[200px] rounded-[14px] bg-black/10 md:h-[300px] md:w-[300px]" />
         <div className="space-y-2">
            <Skeleton className="mb-[10px] h-5 w-[200px] bg-black/10 md:mb-4 md:w-[300px]" />
            <Skeleton className="mb-1 h-4 w-[100px] bg-black/10 md:mb-2 md:w-[150px]" />
            <Skeleton className="mb-1 h-7 w-[100px] bg-black/10 md:mb-2 md:w-[150px]" />
         </div>
      </div>
   );
};
