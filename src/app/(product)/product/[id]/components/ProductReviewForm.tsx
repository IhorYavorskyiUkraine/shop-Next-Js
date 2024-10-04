"use client";

import { ErrorText } from "@/components/shared/ErrorText";
import { StarRating } from "@/components/shared/StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { useProductStore } from "../store";

interface Props {
   onClose: () => void;
   session: Session | null;
}

export const ProductReviewForm: React.FC<Props> = ({ onClose, session }) => {
   const [product, postReview] = useProductStore(state => [
      state.product,
      state.postReview,
   ]);

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
      if (values.rating === 0) {
         setError("rating", {
            type: "manual",
            message: "Please select a rating",
         });
         return;
      }

      if (!product) {
         return;
      }

      const review = {
         rating: values.rating,
         text: values.textarea,
         authorId: Number(session?.user.id),
         productId: product?.id,
      };

      await postReview(review, product?.id);

      onClose();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {ratingError && <ErrorText text={ratingError} className="mt-2" />}
         </div>
         <div className="md:mb-6">
            <p className="mb-1 text-md font-medium">Text</p>
            <Textarea
               {...register("textarea", {
                  required: "This field is required",
                  minLength: {
                     value: 5,
                     message: "The minimum length must be 5",
                  },
               })}
               className="h-[180px]"
            />
            {textareaError && (
               <ErrorText text={textareaError} className="mt-2" />
            )}
         </div>
         <div className="flex">
            <Button variant="black" type="submit" className="flex-1">
               Submit
            </Button>
         </div>
      </form>
   );
};
