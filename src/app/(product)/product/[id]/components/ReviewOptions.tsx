"use client";

import { AuthModal } from "@/components/shared/header/components/authModal/AuthModal";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ReviewModal } from "./ReviewModal";

interface Props {
   reviewId?: number;
}

export const ReviewOptions: React.FC<Props> = ({ reviewId }) => {
   const { data: session } = useSession();
   const [reviewOpen, setReviewOpen] = useState(false);
   const [authOpen, setAuthOpen] = useState(false);

   const handleReplyClick = () => {
      if (session) {
         setReviewOpen(true);
      } else {
         setAuthOpen(true);
      }
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Ellipsis size={20} className="text-black/40" />
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <div onClick={handleReplyClick}>
               <DropdownMenuItem>Reply</DropdownMenuItem>
            </div>
         </DropdownMenuContent>
         <ReviewModal
            reviewId={reviewId}
            reply={true}
            session={session}
            open={reviewOpen}
            onClose={() => setReviewOpen(false)}
         />
         <AuthModal
            redirect={false}
            open={authOpen}
            onClose={() => setAuthOpen(false)}
         />
      </DropdownMenu>
   );
};
