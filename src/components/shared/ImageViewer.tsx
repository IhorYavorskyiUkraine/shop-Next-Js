"use client";

import { ReviewsModal } from "@/app/(product)/product/[id]/components";
import { ReviewReply } from "@prisma/client";
import { Carousel, Dialog } from "../ui";
import {
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "../ui/carousel";
import { DialogContent } from "../ui/dialog";

interface Props {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   images: { url: string }[];
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

export const ImageViewer: React.FC<Props> = ({
   open,
   setOpen,
   reviewId,
   rating,
   name,
   checked,
   text,
   reviewDate,
   replies,
   images,
   userImage,
}) => {
   return (
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
         <DialogContent className="max-w-[80%] overflow-hidden bg-gray">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
               <Carousel className="flex items-center justify-center gap-4">
                  {images?.length > 1 && <CarouselPrevious />}
                  <CarouselContent>
                     {images?.map((image, index) => (
                        <CarouselItem key={index}>
                           <div className="flex h-full items-center justify-center">
                              <img src={image.url} alt="" />
                           </div>
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  {images?.length > 1 && <CarouselNext />}
               </Carousel>
               <ReviewsModal
                  reviewId={reviewId}
                  rating={rating}
                  name={name}
                  checked={checked}
                  text={text}
                  reviewDate={reviewDate}
                  replies={replies}
                  userImage={userImage}
               />
            </div>
         </DialogContent>
      </Dialog>
   );
};
