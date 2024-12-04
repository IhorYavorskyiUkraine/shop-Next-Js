import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface ImageUploaderProps {
   images: string[];
   setImages: (images: string[]) => void;
}

export const DropArea: React.FC<ImageUploaderProps> = ({
   images,
   setImages,
}) => {
   const inputFileRef = useRef<HTMLInputElement>(null);

   const handleImagesChange = () => {
      if (inputFileRef.current?.files?.length) {
         setImages(
            Array.from(inputFileRef.current.files).map(file =>
               URL.createObjectURL(file),
            ),
         );
      }
   };

   return (
      <div>
         <div className="relative mb-1 flex h-[200px] w-full cursor-pointer items-center justify-center rounded-md border border-black/30 bg-gray">
            <div className="flex flex-col items-center">
               <Upload size={40} color={"#000"} />
               <p className="mb-1 text-md font-medium">Upload images</p>
            </div>
            <input
               ref={inputFileRef}
               type="file"
               className="pointer-events-auto absolute inset-0 h-full w-full cursor-pointer opacity-0"
               multiple
               onChange={handleImagesChange}
            />
         </div>
         <div className="mb-1 flex gap-2 overflow-x-auto">
            {images.map(image => (
               <Image
                  key={image}
                  width={80}
                  height={80}
                  src={image}
                  alt="Product Preview"
               />
            ))}
         </div>
      </div>
   );
};
