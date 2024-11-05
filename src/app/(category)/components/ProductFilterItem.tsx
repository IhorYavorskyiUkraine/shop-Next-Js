import { ChevronRight } from "lucide-react";

interface Props {
   name: string;
   onClick?: () => void;
}

export const ProductFilterItem: React.FC<Props> = ({ name, onClick }) => {
   return (
      <div
         onClick={onClick}
         className="mb-2 flex items-center justify-between opacity-60 last:mb-0"
      >
         <p className="text-md leading-22">{name}</p>
         <ChevronRight size={16} />
      </div>
   );
};
