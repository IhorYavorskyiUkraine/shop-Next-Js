import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
   extends React.InputHTMLAttributes<HTMLInputElement> {
   icon?: React.ReactNode;
   iconHidden: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, icon, iconHidden = true, type, ...props }, ref) => {
      return (
         <div
            className={cn(
               className,
               iconHidden || "flex",
               "items-center rounded-full bg-gray px-4 py-3 md:flex",
            )}
         >
            {icon && <div className="flex items-center">{icon}</div>}
            <input
               type={type}
               className={cn(
                  "ring-offset-background placeholder:text-muted-foreground flex h-5 w-full rounded-md bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm placeholder:leading-19 placeholder:text-black/40 focus:border-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:h-[22px] md:placeholder:text-md md:placeholder:leading-22",
               )}
               ref={ref}
               {...props}
            />
         </div>
      );
   },
);
Input.displayName = "Input";

export { Input };
