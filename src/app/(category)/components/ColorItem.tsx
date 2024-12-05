import { colors } from "@prisma/products";
import { Check } from "lucide-react";

interface Props {
   color: number;
   set: Set<string>;
   toggle: (size: string) => void;
}

export const ColorItem: React.FC<Props> = ({ toggle, set, color }) => {
   const matchColor = colors.find(c => c.id === color);
   return (
      <button
         style={{
            backgroundColor: matchColor ? matchColor.color : "transparent",
         }}
         onClick={() => toggle(String(color))}
         className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-[1px] border-black/20"
      >
         {set.has(String(color)) && (
            <Check
               size={16}
               color={matchColor?.color === "white" ? "black" : "white"}
            />
         )}
      </button>
   );
};
