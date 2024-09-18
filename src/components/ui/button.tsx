import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
   {
      variants: {
         variant: {
            default:
               "bg-white border-[1px] w-full md:w-auto border-black/10 font-medium text-md leading-19 rounded-full md:leading-19 py-4 px-[54px] text-black hover:bg-black/5",
            black: "bg-black w-full md:w-auto font-medium text-md leading-19 md:leading-19 rounded-full py-4 px-[54px] text-white hover:bg-black/80",
            none: "",
         },
         size: {
            default: "h-[52px] py-4 px-[54px]",
            none: "",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   },
);

export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant, size, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : "button";
      return (
         <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
         />
      );
   },
);
Button.displayName = "Button";

export { Button, buttonVariants };
