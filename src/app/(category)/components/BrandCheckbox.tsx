import { Checkbox } from "@/components/ui/checkbox";

interface Props {
   set: Set<string>;
   name: string;
   brandId: number;
   toggle: (size: string) => void;
}

export const BrandCheckbox: React.FC<Props> = ({
   name,
   toggle,
   brandId,
   set,
}) => {
   return (
      <div
         onClick={() => toggle(String(brandId))}
         className="flex cursor-pointer items-center gap-2"
      >
         <Checkbox checked={set.has(String(brandId))} id={String(brandId)} />
         <p className="text-md leading-22 opacity-60">{name}</p>
      </div>
   );
};
