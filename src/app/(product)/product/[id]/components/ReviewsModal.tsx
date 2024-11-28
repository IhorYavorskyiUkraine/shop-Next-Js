import { ReviewReply } from "@prisma/client";
import { CircleCheck } from "lucide-react";
import { ReviewOptions } from "./ReviewOptions";
import { StarRating } from "@/components/shared/StarRating";
import { cn } from "@/lib/utils";
import { formatCreatedAt } from "@/lib/getDataReview";
import { ReplyCard } from "./ReplyCard";

interface Props {
   reviewId?: number;
   rating: number;
   name: string;
   checked: boolean;
   text: string;
   reviewDate?: string;
   replies?: ReviewReply &
      {
         author: { fullName: string };
         createdAt: Date;
         purchased: boolean;
         text: string;
         images?: { url: string }[];
      }[];
}

export const ReviewsModal: React.FC<Props> = ({
   reviewId,
   rating,
   name,
   checked,
   text,
   reviewDate,
   replies,
}) => {
   return (
      <div>
         <div className="mb-4 rounded-[20px] border-[1px] border-black/10 p-6 last:mb-0 md:px-8 md:py-7">
            <div className={cn(reviewDate && "flex justify-between", "mb-1")}>
               <StarRating readonly rating={rating} />
               {reviewDate && <ReviewOptions reviewId={reviewId} />}
            </div>
            <div className="mb-1 flex items-center gap-1 md:mb-2 md:text-lg">
               <p className="text-md font-bold leading-22">{name}</p>
               {checked && <CircleCheck color={"green"} size={16} />}
            </div>
            <p className="mb-1 leading-20 opacity-60 md:text-md md:leading-22">
               "{text?.replace(/\s+/g, " ").trim()}"
            </p>
            <div className="flex items-center justify-between">
               {reviewDate && (
                  <p className="mt-1 text-sm font-bold leading-22 opacity-60 md:text-md">
                     {reviewDate}
                  </p>
               )}
            </div>
         </div>
         <div className="pl-8">
            {replies &&
               replies.length > 0 &&
               replies.map((reply, index) => (
                  <ReplyCard
                     key={index}
                     name={reply.author.fullName}
                     checked={reply.purchased}
                     text={reply.text}
                     reviewDate={formatCreatedAt(reply?.createdAt)}
                  />
               ))}
         </div>
      </div>
   );
};
