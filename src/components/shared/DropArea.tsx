import { Upload } from "lucide-react";
import { useDropArea } from "react-use";
import Image from "next/image";
import React, { useImperativeHandle, forwardRef } from "react";

interface Props {
   data: string[];
   setData: (data: string[]) => void;
}

export const DropArea = forwardRef<HTMLInputElement, Props>(
   ({ data, setData }, ref) => {
      const [bond] = useDropArea({
         onFiles: images =>
            setData(images.map(file => URL.createObjectURL(file))),
      });

      const handleImagesChange = () => {
         if (
            ref &&
            (ref as React.RefObject<HTMLInputElement>).current?.files?.length
         ) {
            setData(
               Array.from(
                  (ref as React.RefObject<HTMLInputElement>).current.files,
               ).map(file => URL.createObjectURL(file)),
            );
         }
      };

      return (
         <div>
            <p className="mb-1 text-md font-medium">Upload images</p>
            <div
               {...bond}
               className="relative mb-1 flex h-[200px] w-full cursor-pointer items-center justify-center rounded-md border border-black/30 bg-gray"
            >
               <Upload size={40} color={"#000"} />
               <input
                  ref={ref}
                  type="file"
                  className="pointer-events-auto absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  multiple
                  onChange={handleImagesChange}
               />
            </div>
            <div className="mb-1 flex gap-2 overflow-x-auto">
               {data.map(data => (
                  <Image
                     key={data}
                     width={80}
                     height={80}
                     src={data}
                     alt="Product Preview"
                  />
               ))}
            </div>
         </div>
      );
   },
);
