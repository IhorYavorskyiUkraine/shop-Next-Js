import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
   style: string;
   imageUrl: string;
   className?: string;
}

export const DressStyleCard: React.FC<Props> = ({
   className,
   style,
   imageUrl,
}) => {
   return (
      <Link
         href={`category/${style.toLocaleLowerCase()}`}
         className={cn(
            "relative rounded-[20px] bg-white transition hover:scale-[1.01] hover:shadow-xl",
            className,
         )}
      >
         <h4 className="absolute left-6 top-4 z-10 text-xl font-bold leading-32 md:left-9 md:top-6 md:text-3xl md:leading-[49px]">
            {style}
         </h4>
         <img
            className="absolute right-0 h-full rounded-[20px]"
            src={imageUrl}
            alt=""
            loading="lazy"
         />
      </Link>
   );
};
