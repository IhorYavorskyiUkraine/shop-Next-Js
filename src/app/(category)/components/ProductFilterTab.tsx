import { ChevronDown } from "lucide-react";

interface Props {
   name: string;
   openTabs: string[];
   children: React.ReactNode;
   onClick: () => void;
}

export const ProductFilterTab: React.FC<Props> = ({
   onClick,
   name,
   openTabs,
   children,
}) => {
   return (
      <div className="cursor-pointer border-b-[1px] border-black/10 py-5 last:border-b-0">
         <div onClick={onClick} className="flex items-center justify-between">
            <p className="text-lg font-bold leading-27">{name}</p>
            <ChevronDown
               className={openTabs.includes(name) ? "rotate-180" : ""}
               size={16}
            />
         </div>
         {children}
      </div>
   );
};
