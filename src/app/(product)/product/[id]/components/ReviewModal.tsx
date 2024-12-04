import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Session } from "next-auth";
import { ProductReviewForm } from "./ProductReviewForm";

interface Props {
   reviewId?: number;
   open: boolean;
   onClose: () => void;
   session: Session | null;
   reply?: boolean;
}

export const ReviewModal: React.FC<Props> = ({
   reviewId,
   open,
   onClose,
   session,
   reply = false,
}) => {
   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent className="bg-white">
            <div className="hidden">
               <DialogTitle></DialogTitle>
            </div>
            <h2 className="text-lg font-bold md:text-xl">
               {reply ? "Reply" : "Leave a Comment"}
            </h2>
            <ProductReviewForm
               reply={reply}
               reviewId={reviewId}
               session={session}
               onClose={onClose}
            />
         </DialogContent>
      </Dialog>
   );
};
