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
import { useDebounce, useSet } from "react-use";
import { SizeItem } from "./SizeItem";
import { useState } from "react";
import { ColorItem } from "./ColorItem";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

interface Props {
   open: boolean;
   products: ProductWithVariants[];
   setOpen: (open: boolean) => void;
}

export const ProductsFilterMobile: React.FC<Props> = ({
   products,
   open,
   setOpen,
}) => {
   const [openTabs, setOpenTabs] = useState<string[]>([
      "Price",
      "Size",
      "Colors",
      "Dress Style",
   ]);
   const maxValue = products
      .map(product => product.price)
      .sort((a, b) => b - a)[0];
   const [values, setValues] = useState([0, maxValue]);
   const [debouncedValues, setDebouncedValues] = useState(values);
   const [set, { toggle }] = useSet(new Set<string>([]));
   const [colors, { toggle: toggleColor }] = useSet(new Set<string>([]));

   const handleToggleTab = (tabName: string) => {
      setOpenTabs(prev =>
         prev.includes(tabName)
            ? prev.filter(tab => tab !== tabName)
            : [...prev, tabName],
      );
   };

   useDebounce(
      () => {
         setDebouncedValues(values);

         //TODO: Fetching products
      },
      250,
      [values],
   );

   const filterItems = [
      {
         name: "T-shirts",
      },
      {
         name: "Shorts",
      },
      {
         name: "Shirts",
      },
      {
         name: "Hoodie",
      },
      {
         name: "Jeans",
      },
   ];

   const dressStyleItems = [
      {
         name: "Casual",
      },
      {
         name: "Formal",
      },
      {
         name: "Party",
      },
      {
         name: "Gym",
      },
   ];

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
                  {filterItems.map(item => (
                     <ProductFilterItem key={item.name} name={item.name} />
                  ))}
               </div>
               <div>
                  <ProductFilterTab
                     openTabs={openTabs}
                     onClick={() => handleToggleTab("Price")}
                     name="Price"
                  >
                     {openTabs.includes("Price") && (
                        <DualRangeSlider
                           label={value => <span>${value}</span>}
                           labelPosition="bottom"
                           value={values}
                           onValueChange={setValues}
                           min={0}
                           max={maxValue}
                           step={1}
                        />
                     )}
                  </ProductFilterTab>
                  <ProductFilterTab
                     openTabs={openTabs}
                     onClick={() => handleToggleTab("Colors")}
                     name="Colors"
                  >
                     {openTabs.includes("Colors") && (
                        <div className="flex flex-wrap gap-2 pt-4">
                           {[
                              ...new Set(
                                 products.flatMap(product =>
                                    product.productVariantOptions.flatMap(
                                       variantOption => variantOption.colorId,
                                    ),
                                 ),
                              ),
                           ].map(color => (
                              <ColorItem
                                 key={color}
                                 toggle={toggleColor}
                                 set={colors}
                                 color={color}
                              />
                           ))}
                        </div>
                     )}
                  </ProductFilterTab>
                  <ProductFilterTab
                     name="Size"
                     openTabs={openTabs}
                     onClick={() => handleToggleTab("Size")}
                  >
                     {openTabs.includes("Size") && (
                        <div className="flex flex-wrap gap-2 pt-4">
                           {[
                              ...new Set(
                                 products.flatMap(product =>
                                    product.productVariantOptions.flatMap(
                                       variantOption =>
                                          variantOption.sizes.map(
                                             ({ size }) => size,
                                          ),
                                    ),
                                 ),
                              ),
                           ].map(size => (
                              <SizeItem
                                 key={size}
                                 toggle={toggle}
                                 set={set}
                                 size={size}
                              />
                           ))}
                        </div>
                     )}
                  </ProductFilterTab>
                  <ProductFilterTab
                     openTabs={openTabs}
                     onClick={() => handleToggleTab("Dress Style")}
                     name="Dress Style"
                  >
                     <div className="pt-4">
                        {openTabs.includes("Dress Style") &&
                           dressStyleItems.map(item => (
                              <ProductFilterItem
                                 key={item.name}
                                 name={item.name}
                              />
                           ))}
                     </div>
                  </ProductFilterTab>
               </div>
               <Button className="w-full flex-1" variant="black">
                  Apply Filter
               </Button>
            </Container>
         </DrawerContent>
      </Drawer>
   );
};
