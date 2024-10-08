import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductReviewForm } from "./ProductReviewForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Session } from "next-auth";

interface Props {
   open: boolean;
   onClose: () => void;
   session: Session | null;
}

export const ReviewModal: React.FC<Props> = ({ open, onClose, session }) => {
   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent className="bg-white">
            <div className="hidden">
               <DialogTitle></DialogTitle>
            </div>
            <h2 className="text-lg font-bold md:text-xl">Leave a Comment</h2>
            <ProductReviewForm session={session} onClose={onClose} />
         </DialogContent>
      </Dialog>
   );
};
