"use client";

import React from "react";
import { CountIconButton } from "./CountIconButton";
import { cn } from "@/lib/utils";

export interface CountButtonProps {
   value?: number;
   onClick?: (type: "plus" | "minus") => void;
}

export const CountButton: React.FC<CountButtonProps> = ({
   onClick,
   value = 1,
}) => {
   return (
      <div className="flex h-[31px] items-center justify-between gap-5 rounded-full bg-[#F0F0F0] px-4 py-3 md:h-11 lg:justify-center">
         <CountIconButton
            onClick={() => onClick?.("minus")}
            disabled={value === 1}
            className={cn(value === 1 && "opacity-30")}
            type="minus"
         />
         <p>{value}</p>
         <CountIconButton onClick={() => onClick?.("plus")} type="plus" />
      </div>
   );
};
