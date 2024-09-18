import { CircleCheck } from "lucide-react";
import { StarRating } from "./StarRating";

interface Props {
   rating: number;
   name: string;
   checked: boolean;
   text: string;
}

export const ReviewCard: React.FC<Props> = ({
   rating,
   name,
   checked,
   text,
}) => {
   return (
      <div className="rounded-[20px] border-[1px] border-black/10 p-6 md:px-8 md:py-7">
         <div className="mb-4 md:mb-5">
            <StarRating readonly rating={rating} />
         </div>
         <div className="mb-3 flex items-center gap-1 md:mb-4 md:text-lg">
            <p className="text-md font-bold leading-22">{name}</p>
            {checked && <CircleCheck color={"green"} size={16} />}
         </div>
         <p className="leading-20 opacity-60 md:text-md md:leading-22">
            "{text}"
         </p>
      </div>
   );
};
