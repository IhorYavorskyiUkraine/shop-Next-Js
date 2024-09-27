import { useProductStore } from "@/app/(product)/product/[id]/store";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const BreadCrumb: React.FC = () => {
   const [product] = useProductStore(state => [state.product]);

   return (
      <Breadcrumb>
         <BreadcrumbList className="border-t-[1px] border-black/10 py-5 md:py-8 md:text-md">
            <BreadcrumbItem>
               <BreadcrumbLink className="opacity-60" href="/home">
                  Home
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbPage>{product?.name}</BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   );
};
