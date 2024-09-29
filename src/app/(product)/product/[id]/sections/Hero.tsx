"use client";

import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { Skeleton } from "@/components/shared/Skeleton";
import { Container } from "@/components/ui/container";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { useProductStore } from "../store";
import { ProductWithRelations } from "@/@types/ProductWithOptions";
import { useEffect } from "react";

interface Props {
   product: ProductWithRelations;
}

export const Hero: React.FC<Props> = ({ product }) => {
   const [setProduct, loading] = useProductStore(state => [
      state.setProduct,
      state.loading,
   ]);

   useEffect(() => {
      setProduct(product);
   }, [product.id, setProduct]);

   return (
      <Container>
         <BreadCrumb />
         {loading ? <Skeleton productInfo /> : <ProductInfo />}
         {loading ? <Skeleton productTabs /> : <ProductTabs />}
      </Container>
   );
};
