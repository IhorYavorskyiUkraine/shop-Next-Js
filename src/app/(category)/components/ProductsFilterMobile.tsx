import { Container } from "@/components/ui/container";
import {
   Drawer,
   DrawerContent,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductFilterTab } from "./ProductFilterTab";
import { ProductFilterItem } from "./ProductFilterItem";
import { Button } from "@/components/ui/button";
import { ProductWithVariants } from "../categories/[category]/page";
import { useSet } from "react-use";
import { SizeItem } from "./SizeItem";
import { useEffect, useRef, useState } from "react";
import { ColorItem } from "./ColorItem";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import {
   dressStyle as dressStyles,
   productCategories,
} from "../../../../prisma/products";
import { useCategoryStore } from "../store";

interface Props {
   open: boolean;
   setOpen: (open: boolean) => void;
}

export const ProductsFilterMobile: React.FC<Props> = ({ open, setOpen }) => {
   const [fetchProducts, productFilters] = useCategoryStore(state => [
      state.fetchProducts,
      state.productFilters,
   ]);
   const [values, setValues] = useState([0, 0]);
   const [dressStyleId, setDressStyleId] = useState<number | null>(null);
   const [sizes, { toggle: toggleSize }] = useSet(new Set<string>([]));
   const [colors, { toggle: toggleColor }] = useSet(new Set<string>([]));
   const [tabs, { toggle: toggleTabs }] = useSet(
      new Set<string>(["Price", "Size", "Colors", "Dress Style"]),
   );
   const sizesList = productFilters?.sizes;
   const colorsList = productFilters?.colors;

   const minPrice = useRef<number | null>(null);
   const maxPrice = useRef<number | null>(null);

   const getFilteredProducts = async () => {
      try {
         const filters = {
            minPrice: values[0],
            maxPrice: values[1],
            colors: Array.from(colors),
            sizes: Array.from(sizes),
            dressStyleId,
         };

         fetchProducts("on_sale", filters);
      } catch (e) {
         console.error(e);
      }

      setOpen(false);
   };

   useEffect(() => {
      if (
         minPrice.current === null &&
         productFilters.minProductPrice !== undefined
      ) {
         minPrice.current = productFilters.minProductPrice;
         maxPrice.current = productFilters.maxProductPrice;
         setValues([minPrice.current, maxPrice.current]);
      }
   }, [productFilters]);

   return (
      <Drawer direction="bottom" open={open}>
         <DrawerTrigger>
            <div className="flex items-center justify-center rounded-[60px] bg-gray p-2">
               <SlidersHorizontal
                  onClick={() => setOpen(!open)}
                  color={"#000"}
                  size={16}
               />
            </div>
         </DrawerTrigger>
         <DrawerContent className="h-[92%] rounded-t-[20px]">
            <div className="hidden">
               <DrawerTitle></DrawerTitle>
            </div>
            <Container className="mx-0 overflow-y-auto p-5">
               <div className="mb-5 flex items-center justify-between border-b-[1px] border-black/10 pb-5">
                  <p className="text-lg font-bold leading-27">Filters</p>
                  <X
                     className="cursor-pointer opacity-40"
                     onClick={() => setOpen(!open)}
                     size={24}
                  />
               </div>
               <div className="border-b-[1px] border-black/10 pb-5">
                  {productCategories.map(item => (
                     <ProductFilterItem key={item.name} name={item.name} />
                  ))}
               </div>
               <div>
                  <ProductFilterTab
                     openTabs={tabs}
                     onClick={() => toggleTabs("Price")}
                     name="Price"
                  >
                     {tabs.has("Price") && (
                        <DualRangeSlider
                           label={value => <span>${value}</span>}
                           labelPosition="bottom"
                           value={values}
                           onValueChange={setValues}
                           min={minPrice.current ?? 0}
                           max={maxPrice.current ?? 0}
                           step={10}
                        />
                     )}
                  </ProductFilterTab>
                  <ProductFilterTab
                     openTabs={tabs}
                     onClick={() => toggleTabs("Colors")}
                     name="Colors"
                  >
                     {tabs.has("Colors") && (
                        <div className="flex flex-wrap gap-2 pt-4">
                           {colorsList?.map(color => (
                              <ColorItem
                                 key={color}
                                 toggle={toggleColor}
                                 set={colors}
                                 color={Number(color)}
                              />
                           ))}
                        </div>
                     )}
                  </ProductFilterTab>
                  <ProductFilterTab
                     openTabs={tabs}
                     name="Size"
                     onClick={() => toggleTabs("Size")}
                  >
                     {tabs.has("Size") && (
                        <div className="flex flex-wrap gap-2 pt-4">
                           {sizesList?.map(size => (
                              <SizeItem
                                 key={size}
                                 toggle={toggleSize}
                                 set={sizes}
                                 size={size}
                              />
                           ))}
                        </div>
                     )}
                  </ProductFilterTab>
                  <ProductFilterTab
                     openTabs={tabs}
                     onClick={() => toggleTabs("Dress Style")}
                     name="Dress Style"
                  >
                     <div className="pt-4">
                        {tabs.has("Dress Style") &&
                           dressStyles.map(item => (
                              <ProductFilterItem
                                 key={item.name}
                                 name={item.name}
                                 onClick={() => setDressStyleId(item.id)}
                              />
                           ))}
                     </div>
                  </ProductFilterTab>
               </div>
               <Button
                  className="w-full flex-1"
                  onClick={getFilteredProducts}
                  variant="black"
               >
                  Apply Filter
               </Button>
            </Container>
         </DrawerContent>
      </Drawer>
   );
};
