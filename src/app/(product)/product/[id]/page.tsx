"use client";

import { Container } from "@/components/ui/container";
import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { ProductInfo } from "@/app/(product)/product/[id]/sections/ProductInfo";
import { ProductTabs } from "./sections/ProductTabs";
import { useProductStore } from "./store";
import { useEffect } from "react";

interface Props {
   params: {
      id: string;
   };
}

const ProductPage = ({ params: { id } }: Props) => {
   const [fetchProduct] = useProductStore(state => [state.fetchProduct]);

   useEffect(() => {
      fetchProduct({ id: Number(id) });
   }, [id]);

   return (
      <Container>
         <BreadCrumb />
         <ProductInfo />
         <ProductTabs />
      </Container>
   );
};

export default ProductPage;
