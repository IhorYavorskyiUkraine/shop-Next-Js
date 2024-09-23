import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
   name: string;
}

export const BreadCrumb: React.FC<Props> = ({ name }) => {
   return (
      <Breadcrumb>
         <BreadcrumbList className="border-t-[1px] border-black/10 py-5 md:py-8 md:text-md">
            <BreadcrumbItem>
               <BreadcrumbLink className="opacity-60" href="/">
                  Home
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   );
};
