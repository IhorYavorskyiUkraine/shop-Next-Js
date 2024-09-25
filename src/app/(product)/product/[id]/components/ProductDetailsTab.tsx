import { ProductWithRelations } from "@/@types/ProductWithOptions";

interface Props {
   product: ProductWithRelations;
}

type Detail = {
   name: string;
   value: string;
};

export const ProductDetailsTab: React.FC<Props> = ({ product }) => {
   return (
      <section className="py-6">
         <h2 className="mb-2 text-lg font-bold md:mb-4 md:text-xl">
            Product Details
         </h2>
         <div className="flex flex-col">
            {product.productDetails?.map((detail: Detail, index: number) => (
               <div key={index} className="flex text-md opacity-60 md:text-lg">
                  <p>{detail.name}</p>
                  <div className="relative bottom-2 flex-1 border-b-2 border-dotted border-black"></div>
                  <p>{detail.value}</p>
               </div>
            ))}
         </div>
      </section>
   );
};
