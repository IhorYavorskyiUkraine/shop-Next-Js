import Link from "next/link";
import Image from "next/image";

interface Props {
   item: any;
}

export const BrandCard: React.FC<Props> = ({ item }) => {
   return (
      <Link
         className="relative flex flex-col items-center justify-center border border-gray p-4 transition-all hover:-translate-y-2 hover:shadow-lg"
         href={`/categories/${item.brand?.id}`}
      >
         <div className="flex h-32 w-32 items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
            <Image
               width={200}
               height={200}
               className="object-contain"
               src={`/${item.brand?.image || ""}`}
               alt={item.brand?.name || ""}
            />
         </div>
      </Link>
   );
};
