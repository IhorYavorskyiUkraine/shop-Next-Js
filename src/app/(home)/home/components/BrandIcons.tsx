"use client";

import { brandsIcons } from "../home.data";

type Icon = {
   src: string;
};

export const BrandIcons: React.FC = () => {
   return (
      <div className="overflow-hidden bg-black py-11">
         <div className="animate-scroll flex space-x-[106px]">
            {brandsIcons.concat(brandsIcons).map((icon: Icon) => (
               <img src={icon.src} alt="" key={icon.src} className="h-16" />
            ))}
         </div>
      </div>
   );
};
