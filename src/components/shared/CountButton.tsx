"use client";

import { cn } from "@/lib";
import React from "react";
import { CountIconButton } from "./CountIconButton";

export interface CountButtonProps {
   value?: number;
   onClick?: (type: "plus" | "minus") => void;
   minValue?: number;
   className?: string;
}

export const CountButton: React.FC<CountButtonProps> = ({
   onClick,
   value = 1,
   minValue = 0,
   className,
}) => {
   return (
      <div
         className={cn(
            className,
            "flex h-[31px] items-center justify-between gap-5 rounded-full bg-[#F0F0F0] px-4 py-3 md:h-11 lg:justify-center",
         )}
      >
         <CountIconButton
            onClick={() => onClick?.("minus")}
            disabled={value === minValue}
            className={cn(value === minValue && "opacity-30")}
            type="minus"
         />
         <p>{value}</p>
         <CountIconButton onClick={() => onClick?.("plus")} type="plus" />
      </div>
   );
};
