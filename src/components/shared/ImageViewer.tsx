"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "../ui/carousel";

interface Props {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   images: { url: string }[];
}

export const ImageViewer: React.FC<Props> = ({ open, setOpen, images }) => {
   return (
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
         <DialogContent className="bg-gray">
            <Carousel className="flex items-center justify-center">
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
         </DialogContent>
      </Dialog>
   );
};
