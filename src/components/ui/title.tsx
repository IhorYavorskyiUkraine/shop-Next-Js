import { cn } from "@/lib";
import React from "react";

type TitleSize = "lg" | "xl";

interface Props {
   size?: TitleSize;
   className?: string;
   text: string;
}

export const Title: React.FC<Props> = ({ text, size = "lg", className }) => {
   const mapTagBySize = {
      lg: "h2",
      xl: "h1",
   } as const;

   const mapClassNameBySize = {
      lg: "text-[32px] leading-8 sm:leading-[64px] font-integral-b md:text-[58px] uppercase",
      xl: "text-[36px] leading-8 sm:leading-[64px] font-integral-b md:text-[64px] uppercase",
   } as const;

   return React.createElement(
      mapTagBySize[size],
      { className: cn(mapClassNameBySize[size], className) },
      text,
   );
};
