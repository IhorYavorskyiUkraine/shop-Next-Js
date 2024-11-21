import { cn } from "@/lib/utils";
import { useState } from "react";
import { useProductStore } from "../store";
import Image from "next/image";

export const ProductImage: React.FC = () => {
   const [variant] = useProductStore(state => [state.variant]);

   const [image, setImage] = useState(0);

   return (
      <div className="mb-5 items-center justify-between md:mb-0 md:flex md:flex-row-reverse">
         <div className="relative flex h-[280px] w-full justify-center rounded-[20px] bg-[#F0EEED] md:h-[530px] md:w-[444px]">
            <Image
               className="absolute h-full md:w-full"
               src={variant?.imageUrl[image] || ""}
               width={444}
               height={530}
               alt=""
            />
         </div>
         <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-1 md:grid-rows-3 md:gap-[14px]">
            {variant?.imageUrl.map((url: string, index) => (
               <div
                  className={cn(
                     index === image && "border-[1px]",
                     "cursor-pointer rounded-[20px] bg-[#F0EEED] md:h-[170px] md:w-[152px]",
                  )}
                  key={index}
                  onClick={() => setImage(index)}
               >
                  <Image
                     width={152}
                     height={170}
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
