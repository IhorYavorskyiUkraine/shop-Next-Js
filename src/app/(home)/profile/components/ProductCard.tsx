import Image from "next/image";
import Link from "next/link";

interface Props {
   id: number;
   imageUrl: string;
   name: string;
   category: string;
   quantity: number;
   price: number;
   size: string;
}

export const ProductCard: React.FC<Props> = ({
   id,
   imageUrl,
   name,
   category,
   quantity,
   price,
   size,
}) => {
   return (
      <div className="grid grid-cols-[90px_1fr_1fr_1fr] items-center border-b-[1px] border-b-black/10 py-4 first:pt-0">
         <Link href={`/product/${id}`}>
            <Image width={90} height={90} src={imageUrl} alt="Product Image" />
         </Link>
         <div className="text-sm font-medium leading-22">
            <Link href={`/product/${id}`}>
               <p>{name}</p>
            </Link>
            <p className="opacity-60">{category}</p>
            <p className="opacity-60">{size}</p>
         </div>
         <p className="text-center">{quantity} qty</p>
         <p className="text-center">${price * 0.8}</p>
      </div>
   );
};
