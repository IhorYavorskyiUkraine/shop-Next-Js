import { CircleCheck } from "lucide-react";
import { StarRating } from "./StarRating";
import { cn } from "@/lib/utils";
import { ReviewOptions } from "@/app/(product)/product/[id]/components/ReviewOptions";

interface Props {
   rating: number;
   name: string;
   checked: boolean;
   text: string;
   reviewDate?: string;
}

export const ReviewCard: React.FC<Props> = ({
   rating,
   name,
   checked,
   text,
   reviewDate,
}) => {
   return (
      <div className="rounded-[20px] border-[1px] border-black/10 p-6 md:px-8 md:py-7">
         <div className={cn(reviewDate && "flex justify-between", "mb-1")}>
            <StarRating readonly rating={rating} />
            {reviewDate && <ReviewOptions />}
         </div>
         <div className="mb-1 flex items-center gap-1 md:mb-2 md:text-lg">
            <p className="text-md font-bold leading-22">{name}</p>
            {checked && <CircleCheck color={"green"} size={16} />}
         </div>
         <p className="leading-20 opacity-60 md:text-md md:leading-22">
            "{text}"
         </p>
         {reviewDate && (
            <p className="mt-1 text-sm font-bold leading-22 opacity-60 md:text-md">
               {reviewDate}
            </p>
         )}
      </div>
   );
};
