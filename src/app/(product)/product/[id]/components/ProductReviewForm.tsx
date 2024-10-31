"use client";

import { ErrorText } from "@/components/shared/ErrorText";
import { StarRating } from "@/components/shared/StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { useProductStore } from "../store";
import toast from "react-hot-toast";
import { useState } from "react";

interface Props {
   onClose: () => void;
   session: Session | null;
}

export const ProductReviewForm: React.FC<Props> = ({ onClose, session }) => {
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

      setSubmitting(true);

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

      try {
         await postReview(review, product?.id);

         await fetchReviews({ id: product?.id, orderBy, limit, offset });

         toast.success(`Thank you for your review`, {
            icon: "✅",
         });
      } catch (e) {
         console.error("Error:", e);
         toast.error(
            "Something went wrong while submitting your review. Please try again.",
            {
               icon: "❌",
            },
         );
      } finally {
         setTimeout(() => setSubmitting(false), 1000);
      }

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
