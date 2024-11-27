"use client";

import { ErrorText } from "@/components/shared/ErrorText";
import { StarRating } from "@/components/shared/StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { useProductStore } from "../store";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { useDropArea } from "react-use";
import Image from "next/image";
import { Upload } from "lucide-react";
import { ReviewImage } from "@/@types/Product";

interface Props {
   onClose: () => void;
   session: Session | null;
   reply?: boolean;
   reviewId?: number;
}

export const ProductReviewForm: React.FC<Props> = ({
   onClose,
   session,
   reply,
   reviewId,
}) => {
   const [product, postReview, fetchReviews, limit, offset, orderBy] =
      useProductStore(state => [
         state.product,
         state.postReview,
         state.fetchReviews,
         state.limit,
         state.offset,
         state.orderBy,
      ]);
   const [submitting, setSubmitting] = useState(false);
   const [images, setImages] = useState<string[]>([]);
   const maxFiles = 4;
   const [bond] = useDropArea({
      onFiles: droppedFiles => {
         if (inputFileRef.current) {
            const dataTransfer = new DataTransfer();
            droppedFiles.forEach(file => {
               dataTransfer.items.add(file);
            });
            const files = Array.from(dataTransfer.files);
            if (files.length > maxFiles) {
               toast.error(`You can select no more than ${maxFiles} files.`);
               files.length = maxFiles;
            }
            inputFileRef.current.files = dataTransfer.files;
            setImages(files.map(file => URL.createObjectURL(file)));
         }
      },
   });

   const inputFileRef = useRef<HTMLInputElement>(null);

   const {
      handleSubmit,
      register,
      watch,
      setValue,
      setError,
      clearErrors,
      formState: { errors },
   } = useForm({
      defaultValues: {
         rating: 0,
         textarea: "",
      },
   });

   const ratingValue = watch("rating");

   const textareaError = errors["textarea"]?.message as string;
   const ratingError = errors["rating"]?.message as string;

   const onSubmit = async (values: { rating: number; textarea: string }) => {
      if (submitting) return;

      if (!reply && values.rating === 0) {
         setError("rating", {
            type: "manual",
            message: "Please select a rating",
         });
         return;
      }

      if (!product || !session?.user.id) {
         toast.error("Missing required data for review submission.");
         return;
      }

      setSubmitting(true);

      try {
         const files = inputFileRef.current?.files
            ? Array.from(inputFileRef.current.files)
            : [];

         if (files.length > maxFiles) {
            files.length = maxFiles;
         }

         setImages(files.map(file => URL.createObjectURL(file)));

         const uploadedImages: ReviewImage[] = [];

         for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const newBlob = await upload(file.name, file, {
               access: "public",
               handleUploadUrl: "/api/uploadReviewImages",
            }).catch(err => {
               console.error("File upload failed:", err);
               throw new Error("Failed to upload file");
            });

            if (!newBlob) {
               throw new Error("Failed to upload file");
            }

            uploadedImages.push({
               url: newBlob.url,
            });
         }

         const reviewData = reply
            ? {
                 productId: product.id,
                 authorId: Number(session.user.id),
                 reviewId,
                 reply,
                 rating: 0,
                 images: uploadedImages,
                 text: values.textarea,
              }
            : {
                 rating: values.rating,
                 text: values.textarea,
                 authorId: Number(session.user.id),
                 productId: product.id,
                 images: uploadedImages,
                 reply,
              };

         await postReview(reviewData, product.id);

         await fetchReviews({ id: product.id, orderBy, limit, offset });

         toast.success(`Thank you for your ${reply ? "reply" : "review"}`, {
            icon: "✅",
         });
      } catch (e: unknown) {
         console.error("Error:", e);
         toast.error(
            `Something went wrong while submitting your review. ${(e as Error)?.message || ""}`,
            { icon: "❌" },
         );
      } finally {
         setSubmitting(false);
      }

      onClose();
   };

   const handleImagesChange = () => {
      const files = inputFileRef.current?.files;

      if (files?.length) {
         if (files.length > maxFiles) {
            toast.error(`You can select no more than ${maxFiles} files.`);
            const allowedFiles = Array.from(files).slice(0, maxFiles);
            setImages(allowedFiles.map(file => URL.createObjectURL(file)));
         } else {
            setImages(Array.from(files).map(file => URL.createObjectURL(file)));
         }
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
            <div
               {...bond}
               className="relative mb-1 flex h-[200px] w-full cursor-pointer items-center justify-center rounded-md border border-black/30 bg-gray"
            >
               <div className="flex flex-col items-center">
                  <Upload size={40} color={"#000"} />
                  <p className="text-md font-medium">Upload images</p>
                  {images.length > 0 && <p>{images.length}/4</p>}
               </div>
               <input
                  ref={inputFileRef}
                  onChange={handleImagesChange}
                  className="pointer-events-auto absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  accept="image/*"
                  type="file"
                  multiple
               />
            </div>
            <div className="mb-1 flex gap-2">
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
         {reply ? null : (
            <div>
               <p className="mb-1 text-md font-medium">Rating</p>
               <StarRating
                  rating={ratingValue}
                  onRatingChange={(rate: number) => {
                     setValue("rating", rate);
                     if (rate > 0) {
                        clearErrors("rating");
                     }
                  }}
                  className="mb-2"
                  readonly={false}
                  size={26}
               />
               <input
                  type="hidden"
                  {...register("rating", {
                     required: "Rating is required",
                  })}
               />
               {ratingError && (
                  <ErrorText text={ratingError} className="mt-2" />
               )}
            </div>
         )}
         <div className="md:mb-6">
            <p className="mb-1 text-md font-medium">Text</p>
            <Textarea
               {...register("textarea", {
                  required: "This field is required",
                  minLength: {
                     value: 5,
                     message: "The minimum length must be 5",
                  },
                  validate: value =>
                     value.trim().length > 0 || "Review cannot be empty",
               })}
               placeholder="Write your review"
               className="h-[100px]"
            />
            {textareaError && (
               <ErrorText text={textareaError} className="mt-2" />
            )}
         </div>
         <div className="flex">
            <Button
               variant="black"
               loading={submitting}
               type="submit"
               className="flex-1"
            >
               Submit
            </Button>
         </div>
      </form>
   );
};
