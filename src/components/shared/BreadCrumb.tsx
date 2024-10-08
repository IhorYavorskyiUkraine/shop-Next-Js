import { useProductStore } from "@/app/(product)/product/[id]/store";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "../ui/skeleton";

interface Props {
   name?: {
      name: string;
      link: string;
   };
   loading?: boolean;
}

export const BreadCrumb: React.FC<Props> = ({ name, loading }) => {
   const product = !name ? useProductStore(state => state.product) : null;

   return (
      <Breadcrumb>
         <BreadcrumbList className="border-t-[1px] border-black/10 py-5 md:py-6 md:text-md">
            <BreadcrumbItem>
               <BreadcrumbLink className="opacity-60" href="/home">
                  Home
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbPage>
                  {loading && <Skeleton className="h-6 w-[120px] bg-black/5" />}
                  {name ? name.name : product?.name}
               </BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   );
};
