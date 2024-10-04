"use client";

import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { Skeleton } from "@/components/shared/Skeleton";
import { Container } from "@/components/ui/container";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { useProductStore } from "../store";
import { ProductWithVariantsAndDetails } from "@/@types/ProductWithOptions";
import { useEffect, useState } from "react";
import { ProductsWithCategories } from "@/modules";

interface Props {
   product: ProductWithVariantsAndDetails;
}

export const Hero: React.FC<Props> = ({ product }) => {
   const [setProduct, fetchReviews, orderBy, loading] = useProductStore(
      state => [
         state.setProduct,
         state.fetchReviews,
         state.orderBy,
         state.loading,
      ],
   );

   useEffect(() => {
      setProduct(product);
   }, [product, setProduct]);

   useEffect(() => {
      fetchReviews({ id: product.id, orderBy });
   }, [orderBy]);

   return (
      <Container>
         <BreadCrumb />
         {loading ? <Skeleton productInfo /> : <ProductInfo />}
         {loading ? <Skeleton productTabs /> : <ProductTabs />}
         <ProductsWithCategories categoryId={2} title="you might also like" />
      </Container>
   );
};
