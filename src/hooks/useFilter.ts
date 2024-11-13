import { useEffect, useRef, useState } from "react";
import { useDebounce, useSet } from "react-use";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategoryStore } from "@/app/(category)/store";
import qs from "qs";

export const useFilter = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const productFilters = useCategoryStore(state => state.productFilters);
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
      searchParams.get("dressStyleId") || null,
   );
   const [prevQuery, setPrevQuery] = useState("");
   const [sizes, { toggle: toggleSize, reset: resetSizes }] = useSet(
      new Set<string>(searchParams.getAll("sizes") || []),
   );
   const [colors, { toggle: toggleColor, reset: resetColors }] = useSet(
      new Set<string>(searchParams.getAll("colors") || []),
   );
   const [tabs, { toggle: toggleTabs }] = useSet(
      new Set<string>(["Price", "Size", "Colors", "Dress Style"]),
   );

   const sizesList = productFilters?.sizes;
   const colorsList = productFilters?.colors;

   const minPrice = useRef<number | null>(null);
   const maxPrice = useRef<number | null>(null);

   const clearFilters = () => {
      setDressStyleId(null);
      resetSizes();
      resetColors();
      setValues([minPrice.current || 0, maxPrice.current || 0]);
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
      const filters: Record<string, any> = {
         ...(debouncedValue[0] > 0 && { minPrice: debouncedValue[0] }),
         ...(debouncedValue[1] > 0 && { maxPrice: debouncedValue[1] }),
         ...(colors.size > 0 && { colors: Array.from(colors) }),
         ...(sizes.size > 0 && { sizes: Array.from(sizes) }),
         ...(dressStyleId && { dressStyleId }),
      };

      const query = qs.stringify(filters, { arrayFormat: "comma" });

      if (query !== prevQuery) {
         setPrevQuery(query);
         router.push(`?${query}`, { scroll: false });
      }
   }, [debouncedValue, sizes, colors, dressStyleId, searchParams]);

   return {
      tabs,
      toggleTabs,
      colors,
      toggleColor,
      colorsList,
      sizes,
      toggleSize,
      sizesList,
      values,
      setValues,
      minPrice,
      maxPrice,
      setDressStyleId,
      clearFilters,
   };
};
