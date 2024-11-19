"use client";

import { brandsIcons } from "../home.data";

type Icon = {
   src: string;
};

export const BrandIcons: React.FC = () => {
   return (
      <div className="bg-black py-11">
         <div className="mx-auto flex max-w-[1268px] flex-wrap justify-center gap-x-[106px] gap-y-5 px-3">
            {brandsIcons.map((icon: Icon) => (
               <img src={icon.src} alt="" key={icon.src} />
            ))}
         </div>
      </div>
   );
};
