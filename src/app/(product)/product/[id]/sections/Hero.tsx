"use client";

import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { Skeleton } from "@/components/shared/Skeleton";
import { Container } from "@/components/ui/container";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { useProductStore } from "../store";
import { ProductWithVariantsAndDetails } from "@/@types/ProductWithOptions";
import { useEffect } from "react";
import { ProductsWithCategories } from "@/modules";

interface Props {
   product: ProductWithVariantsAndDetails;
}

export const Hero: React.FC<Props> = ({ product }) => {
   const [setProduct, fetchReviews, orderBy, limit, offset, loading] =
      useProductStore(state => [
         state.setProduct,
         state.fetchReviews,
         state.orderBy,
         state.limit,
         state.offset,
         state.loading,
      ]);

   useEffect(() => {
      setProduct(product);
   }, [product, setProduct]);

   useEffect(() => {
      fetchReviews({ id: product.id, orderBy, limit, offset });
   }, [orderBy, limit, offset]);

   return (
      <Container>
         <BreadCrumb />
         {loading ? <Skeleton productInfo /> : <ProductInfo />}
         {loading ? <Skeleton productTabs /> : <ProductTabs />}
         <ProductsWithCategories categoryId={2} title="you might also like" />
      </Container>
   );
};
