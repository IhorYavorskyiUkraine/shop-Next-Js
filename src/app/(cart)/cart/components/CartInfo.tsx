import { cn } from "@/lib";

interface Props {
   text: string;
   price: number;
   discount?: boolean;
}

export const CartInfo: React.FC<Props> = ({ text, price, discount }) => {
   return (
      <div className="mb-1 flex items-center justify-between md:mb-2">
         <span className="text-md leading-22 opacity-60 md:text-lg md:leading-27">
            {text}
         </span>
         <span
            className={cn(
               discount && "text-red-500",
               "text-md font-bold leading-22 md:text-lg md:leading-27",
            )}
         >
            {discount && "-"}${price}
         </span>
      </div>
   );
};
