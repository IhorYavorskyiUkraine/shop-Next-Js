import { CircleCheck } from "lucide-react";

interface Props {
   name: string;
   checked?: boolean;
   text: string;
   reviewDate?: string;
}

export const ReplyCard: React.FC<Props> = ({
   name,
   text,
   reviewDate,
   checked,
}) => {
   return (
      <div className="mb-4 rounded-[20px] border-[1px] border-black/10 p-6 last:mb-0 md:px-8 md:py-7">
         <div className="mb-1 flex items-center gap-1 md:mb-2 md:text-lg">
            <p className="text-md font-bold leading-22">{name}</p>{" "}
            {checked && <CircleCheck color={"green"} size={16} />}
         </div>
         <p className="leading-20 opacity-60 md:text-md md:leading-22">
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
   );
};
