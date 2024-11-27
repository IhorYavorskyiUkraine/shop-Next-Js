"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { cn } from "@/lib/utils";

interface Props {
   className?: string;
}

export const ImageViewer: React.FC<Props> = ({ className }) => {
   return (
      <Swiper spaceBetween={0} slidesPerView={1} className={cn("", className)}>
         <SwiperSlide>Slide 1</SwiperSlide>
         <SwiperSlide>Slide 2</SwiperSlide>
         <SwiperSlide>Slide 3</SwiperSlide>
         <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
   );
};
