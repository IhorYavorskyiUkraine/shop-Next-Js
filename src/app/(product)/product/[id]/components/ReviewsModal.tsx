import { StarRating } from "@/components/shared/StarRating";
import { cn, getDataReview } from "@/lib";
import { ReviewReply } from "@prisma/client";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { ReplyCard } from "./ReplyCard";
import { ReviewOptions } from "./ReviewOptions";

interface Props {
   reviewId?: number;
   rating: number;
   name: string;
   checked: boolean;
   text: string;
   reviewDate?: string;
   replies?: ReviewReply &
      {
         author: { fullName: string; imageUrl: string | null };
         createdAt: Date;
         purchased: boolean;
         text: string;
         images?: { url: string }[];
      }[];
   userImage: string | null;
}

export const ReviewsModal: React.FC<Props> = ({
   reviewId,
   rating,
   name,
   checked,
   text,
   reviewDate,
   replies,
   userImage,
}) => {
   return (
      <div>
         <div className="mb-4 rounded-[20px] border-[1px] border-black/10 p-6 last:mb-0 md:px-8 md:py-7">
            <div className="flex items-start gap-2">
               <Image
                  src={userImage || "/images/user/userImagePlaceholder.png"}
                  width={40}
                  height={40}
                  className="rounded-full border-[1px] border-black/10"
                  alt="User Image"
               />
               <div className="w-full">
                  <div className="flex items-center justify-between md:text-lg">
                     <div className="flex items-center gap-1">
                        <p className="text-md font-bold leading-22">{name}</p>
                        {checked && <CircleCheck color={"green"} size={16} />}
                     </div>
                     {reviewDate && <ReviewOptions reviewId={reviewId} />}
                  </div>
                  <div
                     className={cn(
                        reviewDate && "flex justify-between",
                        "mb-1",
                     )}
                  >
                     <StarRating readonly rating={rating} />
                  </div>
                  <p className="mb-1 break-all leading-20 opacity-60 md:text-md md:leading-22">
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
                     reviewDate={getDataReview(reply?.createdAt)}
                     userImage={reply.author.imageUrl}
                  />
               ))}
         </div>
      </div>
   );
};
