import { useEffect, useRef, useState } from "react";
import { useDebounce, useSet } from "react-use";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategoryStore } from "@/app/(category)/store";
import qs from "qs";
import { Brand } from "@/@types/Product";

export const useFilter = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [productFilters, offset] = useCategoryStore(state => [
      state.productFilters,
      state.offset,
   ]);
   const [values, setValues] = useState([0, 0]);
   const [debouncedValue, setDebouncedValue] = useState([0, 0]);
   const [] = useDebounce(
      () => {
         setDebouncedValue(values);
      },
      200,
      [values],
   );
   const [dressStyleId, setDressStyleId] = useState<string | null>(
      searchParams.get("dressStyleId"),
   );
   const [productCategoryId, setProductCategoryId] = useState<string | null>(
      searchParams.get("productCategoryId"),
   );
   const [prevQuery, setPrevQuery] = useState("");
   const [sizes, { toggle: toggleSize, reset: resetSizes }] = useSet(
      new Set<string>(searchParams.getAll("sizes")),
   );
   const [colors, { toggle: toggleColor, reset: resetColors }] = useSet(
      new Set<string>(searchParams.getAll("colors")),
   );
   const [brands, { toggle: toggleBrands, reset: resetBrands }] = useSet(
      new Set<string>(searchParams.getAll("brands")),
   );
   const [tabs, { toggle: toggleTabs }] = useSet(
      new Set<string>(["Price", "Size", "Colors", "Dress Style", "Brands"]),
   );

   const sizesList = productFilters?.sizes;
   const colorsList = productFilters?.colors;
   const brandsList: Brand[] = productFilters?.brands;

   const minPrice = useRef<number | null>(null);
   const maxPrice = useRef<number | null>(null);

   const clearFilters = () => {
      setDressStyleId(null);
      resetSizes();
      resetColors();
      setValues([minPrice.current || 0, maxPrice.current || 0]);
      setProductCategoryId(null);
      resetBrands();
   };

   useEffect(() => {
      minPrice.current = productFilters.minProductPrice;
      maxPrice.current = productFilters.maxProductPrice;

      const initialMinPrice = searchParams.get("minPrice");
      const initialMaxPrice = searchParams.get("maxPrice");

      setValues([
         initialMinPrice ? parseInt(initialMinPrice) : minPrice.current || 0,
         initialMaxPrice ? parseInt(initialMaxPrice) : maxPrice.current || 0,
      ]);
   }, [productFilters]);

   useEffect(() => {
      const getOffset = {
         ...(offset && { offset }),
      };

      const query = qs.stringify(getOffset, { arrayFormat: "comma" });

      if (query !== prevQuery) {
         setPrevQuery(query);
         router.push(`?${query}`, { scroll: false });
      }
   }, [offset]);

   const setFilters = () => {
      const filters: Record<string, any> = {
         ...(debouncedValue[0] > 0 && { minPrice: debouncedValue[0] }),
         ...(debouncedValue[1] > 0 && { maxPrice: debouncedValue[1] }),
         ...(colors.size > 0 && { colors: Array.from(colors) }),
         ...(sizes.size > 0 && { sizes: Array.from(sizes) }),
         ...(dressStyleId && { dressStyleId }),
         ...(productCategoryId && { productCategoryId }),
         ...(offset && { offset }),
         ...(brands.size > 0 && { brands: Array.from(brands) }),
      };

      const query = qs.stringify(filters, { arrayFormat: "comma" });

      if (query !== prevQuery) {
         setPrevQuery(query);
         router.push(`?${query}`, { scroll: false });
      }
   };

   return {
      tabs,
      toggleTabs,
      brandsList,
      brands,
      colors,
      toggleColor,
      colorsList,
      sizes,
      setProductCategoryId,
      toggleSize,
      toggleBrands,
      sizesList,
      values,
      setValues,
      minPrice,
      maxPrice,
      setDressStyleId,
      setFilters,
      clearFilters,
   };
};
