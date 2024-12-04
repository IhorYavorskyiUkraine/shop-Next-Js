"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ProductDetailsTab } from "../components/ProductDetailsTab";
import { ProductReviewsTab } from "../components/ProductReviewsTab";
import { tabs } from "../product.data";
import { useProductStore } from "../store";

export const ProductTabs: React.FC = () => {
   const [product] = useProductStore(state => [state.product]);

   const [activeTab, setActiveTab] = useState(1);

   if (!product) {
      return null;
   }

   return (
      <section>
         <div className="grid grid-cols-2 border-b-[1px] border-black/10 pt-6">
            {tabs.map((tab: string, index: number) => (
               <button
                  className={cn(
                     activeTab === index && "border-b-2 opacity-100",
                     "text-md leading-22 opacity-60",
                  )}
                  key={tab}
                  onClick={() => setActiveTab(index)}
               >
                  <p
                     className={cn(
                        activeTab === index && "font-bold !opacity-100",
                        "pb-3 text-md leading-22 opacity-60",
                     )}
                  >
                     {tab}
                  </p>
               </button>
            ))}
         </div>
         {activeTab === 0 && <ProductDetailsTab />}
         {activeTab === 1 && <ProductReviewsTab />}
      </section>
   );
};
