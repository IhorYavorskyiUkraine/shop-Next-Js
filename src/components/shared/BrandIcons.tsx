"use client";

type Icon = {
   src: string;
};

export const BrandIcons: React.FC = () => {
   const brandsIcons = [
      {
         src: "/images/home/1.svg",
      },
      {
         src: "/images/home/2.svg",
      },
      {
         src: "/images/home/3.svg",
      },
      {
         src: "/images/home/4.svg",
      },
      {
         src: "/images/home/5.svg",
      },
   ];

   return (
      <div className="bg-black py-11">
         <div className="mx-auto flex max-w-[1264px] flex-wrap justify-center gap-x-[106px] gap-y-5 px-3">
            {brandsIcons.map((icon: Icon) => (
               <img src={icon.src} alt="" key={icon.src} />
            ))}
         </div>
      </div>
   );
};
