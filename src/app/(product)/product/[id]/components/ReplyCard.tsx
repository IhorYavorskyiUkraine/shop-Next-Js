import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

interface Props {
   className?: string;
   name: string;
   checked?: boolean;
   text: string;
   reviewDate?: string;
   images?: { url: string }[];
   openModal?: boolean;
}

export const ReplyCard: React.FC<Props> = ({
   className,
   name,
   text,
   reviewDate,
   checked,
   images,
}) => {
   return (
      <div
         className={cn(
            className,
            "mb-4 rounded-[20px] border-[1px] border-black/10 p-6 last:mb-0 md:px-8 md:py-7",
         )}
      >
         <div className="mb-1 flex items-center gap-1 md:mb-2 md:text-lg">
            <p className="text-md font-bold leading-22">{name}</p>{" "}
            {checked && <CircleCheck color={"green"} size={16} />}
         </div>
         <p className="leading-20 opacity-60 md:text-md md:leading-22">
            "{text?.replace(/\s+/g, " ").trim()}"
         </p>
         {images && images?.length > 0 && (
            <div className="mb-1 flex flex-wrap gap-2">
               {images.map((image, index) => (
                  <img
                     key={index}
                     className="size-[80px]"
                     src={image.url}
                     alt="Product Image"
                  />
               ))}
            </div>
         )}
         <div className="flex items-center justify-between">
            {reviewDate && (
               <p className="mt-1 text-sm font-bold leading-22 opacity-60 md:text-md">
                  {reviewDate}
               </p>
            )}
         </div>
      </div>
   );
};
