import { cn } from "@/lib";
import * as React from "react";

export interface TextareaProps
   extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
   ({ className, ...props }, ref) => {
      return (
         <textarea
            className={cn(
               "ring-offset-background placeholder:text-muted-foreground flex min-h-[80px] w-full resize-none rounded-md border border-black/30 !bg-gray bg-transparent px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:placeholder:text-md md:placeholder:leading-22",
               className,
            )}
            ref={ref}
            {...props}
         />
      );
   },
);
Textarea.displayName = "Textarea";

export { Textarea };
