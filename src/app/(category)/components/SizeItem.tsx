import { cn } from "@/lib/utils";

interface Props {
   set: Set<string>;
   size: string;
   toggle: (size: string) => void;
}

export const SizeItem: React.FC<Props> = ({ toggle, set, size }) => {
   return (
      <div
         key={size}
         onClick={() => toggle(size)}
         className={`cursor-pointer rounded-[60px] px-4 py-2 ${set.has(size) ? "bg-black" : "bg-gray"}`}
      >
         <span
            className={cn(
               set.has(size) ? "text-white opacity-100" : "opacity-60",
               "font-semibold leading-19",
            )}
         >
            {size}
         </span>
      </div>
   );
};
