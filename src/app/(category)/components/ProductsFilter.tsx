import { useFilter } from "@/hooks/useFilter";
import { dressStyle, productCategories } from "../../../../prisma/products";
import { ProductFilterItem } from "./ProductFilterItem";
import { ProductFilterTab } from "./ProductFilterTab";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { ColorItem } from "./ColorItem";
import { SizeItem } from "./SizeItem";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Trash } from "lucide-react";

export const ProductsFilter: React.FC = () => {
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

   return (
      <aside className="hidden rounded-[20px] border-[1px] border-black/10 p-5 md:block md:min-w-[295px] md:max-w-[295px]">
         <div className="mb-5 flex items-center justify-between border-b-[1px] border-black/10 pb-5">
            <p className="text-lg font-bold leading-27">Filters</p>
            <SlidersHorizontal className="rotate-90 opacity-40" size={20} />
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
                  <div className="flex flex-wrap gap-[10px] pt-4">
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
                  <div className="flex flex-wrap gap-[10px] pt-4">
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
                     dressStyle.map(item => (
                        <ProductFilterItem
                           key={item.name}
                           name={item.name}
                           onClick={() => setDressStyleId(String(item.id))}
                        />
                     ))}
               </div>
            </ProductFilterTab>
         </div>
         <div className="flex items-center gap-4">
            <Button
               onClick={setFilters}
               className="w-full flex-1"
               variant="black"
            >
               Apply Filter
            </Button>
            <Trash
               className="cursor-pointer opacity-40"
               onClick={clearFilters}
               size={20}
            />
         </div>
      </aside>
   );
};
