import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
   open: boolean;
   onClose: () => void;
}

export const ReviewModal: React.FC<Props> = ({ open, onClose }) => {
   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent className="bg-white"></DialogContent>
      </Dialog>
   );
};
