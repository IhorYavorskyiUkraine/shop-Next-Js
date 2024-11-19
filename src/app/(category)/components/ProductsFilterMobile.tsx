import { Container } from "@/components/ui/container";
import {
   Drawer,
   DrawerContent,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";
import { SlidersHorizontal, Trash, X } from "lucide-react";
import { ProductFilterTab } from "./ProductFilterTab";
import { ProductFilterItem } from "./ProductFilterItem";
import { Button } from "@/components/ui/button";
import { SizeItem } from "./SizeItem";
import { ColorItem } from "./ColorItem";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import {
   dressStyle as dressStyles,
   productCategories,
} from "../../../../prisma/products";
import { useFilter } from "@/hooks/useFilter";
import { useState } from "react";

export const ProductsFilterMobile: React.FC = () => {
   const [open, setOpen] = useState(false);

   const {
      tabs,
      toggleTabs,
      toggleColor,
      toggleSize,
      colors,
      sizes,
      values,
      setValues,
      minPrice,
      maxPrice,
      clearFilters,
      sizesList,
      colorsList,
      setDressStyleId,
      setProductCategoryId,
      setFilters,
   } = useFilter();

   const applyFilters = () => {
      setFilters();
      setOpen(false);
   };

   return (
      <Drawer direction="bottom" open={open}>
         <DrawerTrigger>
            <div className="flex items-center justify-center rounded-[60px] bg-gray p-2 md:hidden">
               <SlidersHorizontal
                  onClick={() => setOpen(!open)}
                  color={"#000"}
                  className="rotate-90"
                  size={16}
               />
            </div>
         </DrawerTrigger>
         <DrawerContent className="h-[92%] rounded-t-[20px] md:hidden">
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
                     <ProductFilterItem
                        key={item.name}
                        name={item.name}
                        onClick={() => setProductCategoryId(String(item.id))}
                     />
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
                                 onClick={() =>
                                    setDressStyleId(String(item.id))
                                 }
                              />
                           ))}
                     </div>
                  </ProductFilterTab>
               </div>
               <div className="flex items-center gap-4">
                  <Button
                     className="w-full flex-1"
                     onClick={applyFilters}
                     variant="black"
                  >
                     Apply Filter
                  </Button>
                  <Trash onClick={clearFilters} size={20} />
               </div>
            </Container>
         </DrawerContent>
      </Drawer>
   );
};
