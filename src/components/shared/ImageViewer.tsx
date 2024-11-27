"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "../ui/carousel";
import { ReviewReply } from "@prisma/client";
import { ReviewsModal } from "@/app/(product)/product/[id]/components/ReviewsModal";

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
         author: { fullName: string };
         createdAt: Date;
         purchased: boolean;
         text: string;
         images?: { url: string }[];
      }[];
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
}) => {
   return (
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
         <DialogContent className="max-w-[80%] overflow-hidden bg-gray">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
               <Carousel className="flex items-center justify-center gap-4">
                  <CarouselPrevious />
                  <CarouselContent>
                     {images?.map((image, index) => (
                        <CarouselItem key={index}>
                           <div className="flex items-center justify-center">
                              <img src={image.url} alt="" />
                           </div>
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  <CarouselNext />
               </Carousel>
               <div>
                  <ReviewsModal
                     reviewId={reviewId}
                     rating={rating}
                     name={name}
                     checked={checked}
                     text={text}
                     reviewDate={reviewDate}
                     replies={replies}
                  />
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};
