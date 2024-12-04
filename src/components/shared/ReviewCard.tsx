"use client";

import { RepliesModal } from "@/app/(product)/product/[id]/components/RepliesModal";
import { ReviewOptions } from "@/app/(product)/product/[id]/components/ReviewOptions";
import { cn } from "@/lib/utils";
import { ReviewReply } from "@prisma/client";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { ImageViewer } from "./ImageViewer";
import { StarRating } from "./StarRating";

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
   images?: { url: string }[];
}

export const ReviewCard: React.FC<Props> = ({
   reviewId,
   rating,
   name,
   checked,
   text,
   reviewDate,
   replies,
   images,
}) => {
   const [openModal, setOpenModal] = useState(false);

   return (
      <div className="rounded-[20px] border-[1px] border-black/10 p-6 md:px-8 md:py-7">
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
         {images && images?.length > 0 && (
            <div className="mb-1 flex flex-wrap gap-2">
               {images.map((image, index) => (
                  <img
                     key={index}
                     className="size-[80px] cursor-pointer"
                     src={image.url}
                     onClick={() => setOpenModal?.(true)}
                     alt="Product Image"
                  />
               ))}
            </div>
         )}
         {images && (
            <ImageViewer
               open={openModal}
               setOpen={setOpenModal}
               images={images}
               rating={rating}
               name={name}
               checked={checked}
               text={text}
               reviewDate={reviewDate}
               replies={replies}
               reviewId={reviewId}
            />
         )}
         <div className="flex items-center justify-between">
            {reviewDate && (
               <p className="mt-1 text-sm font-bold leading-22 opacity-60 md:text-md">
                  {reviewDate}
               </p>
            )}
            {replies?.length === 0 ? null : <RepliesModal replies={replies} />}
         </div>
      </div>
   );
};
