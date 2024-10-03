import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface IconButtonProps {
   disabled?: boolean;
   type?: "plus" | "minus";
   onClick?: () => void;
   className?: string;
}

export const CountIconButton: React.FC<IconButtonProps> = ({
   disabled,
   type,
   onClick,
   className,
}) => {
   return (
      <button
         disabled={disabled}
         className={cn(className, "inline-flex items-center")}
         onClick={onClick}
         type="button"
      >
         {type === "plus" ? <Plus size={16} /> : <Minus size={16} />}
      </button>
   );
};
