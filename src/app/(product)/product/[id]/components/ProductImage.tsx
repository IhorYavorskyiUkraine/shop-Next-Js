"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
   imageUrls: string[];
}

export const ProductImage: React.FC<Props> = ({ imageUrls }) => {
   const [image, setImage] = useState(0);

   return (
      <div className="items-center justify-between md:flex md:flex-row-reverse">
         <div className="relative flex h-[280px] w-full justify-center rounded-[20px] bg-[#F0EEED] md:h-[530px] md:w-[444px]">
            <img className="absolute h-full" src={imageUrls[image]} alt={""} />
         </div>
         <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-1 md:grid-rows-3 md:gap-[14px]">
            {imageUrls.map((url: string, index) => (
               <div
                  className={cn(
                     index === image && "border-[1px]",
                     "cursor-pointer rounded-[20px] bg-[#F0EEED] md:h-[170px] md:w-[152px]",
                  )}
                  key={index}
                  onClick={() => setImage(index)}
               >
                  <img
                     key={url}
                     src={url}
                     alt={url}
                     className="h-full w-full object-cover"
                  />
               </div>
            ))}
         </div>
      </div>
   );
};
