"use client";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { ReviewModal } from "./ReviewModal";
import { AuthModal } from "@/components/shared/header/components/authModal/AuthModal";
import { useClickAway } from "react-use";

export const ReviewOptions: React.FC = () => {
   const { data: session } = useSession();
   const [open, setOpen] = useState(false);

   const ref = useRef(null);

   useClickAway(ref, () => {
      setOpen(false);
   });

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Ellipsis size={20} className="text-black/40" />
         </DropdownMenuTrigger>
         <DropdownMenuContent ref={ref}>
            <div onClick={() => setOpen(true)}>
               <DropdownMenuItem>Reply</DropdownMenuItem>
            </div>
            {session ? (
               <ReviewModal
                  session={session}
                  open={open}
                  onClose={() => setOpen(false)}
               />
            ) : (
               <AuthModal
                  redirect={false}
                  open={open}
                  onClose={() => setOpen(false)}
               />
            )}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
