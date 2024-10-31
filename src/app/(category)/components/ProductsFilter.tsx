import { Product } from "@prisma/client";

interface Props {
   products: Product[];
}

export const ProductsFilter: React.FC<Props> = ({ products }) => {
   return <aside className="hidden md:block"></aside>;
};
