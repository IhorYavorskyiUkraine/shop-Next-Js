import Image from "next/image";
import Link from "next/link";

interface Props {
   item: {
      brand: {
         id: number;
         name: string;
         image: string;
      };
   };
}

export const BrandCard: React.FC<Props> = ({ item }) => {
   return (
      <Link
         className="relative flex flex-col items-center justify-center border border-gray p-4 transition-all hover:-translate-y-2 hover:shadow-lg"
         href={`/categories/all_products?brands=${item.brand?.id}`}
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
