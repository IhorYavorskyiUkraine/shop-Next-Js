"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getDataReview } from "@/lib";
import { ReviewReply } from "@prisma/client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { ReplyCard } from "./ReplyCard";

interface Props {
   replies?: ReviewReply &
      {
         author: { fullName: string; imageUrl: string };
         createdAt: Date;
         purchased: boolean;
         text: string;
         images?: { url: string }[];
      }[];
}

export const RepliesModal: React.FC<Props> = ({ replies }) => {
   const [open, setOpen] = useState(false);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger onClick={() => setOpen(true)}>
            <p className="mt-1 text-sm font-bold leading-22 opacity-60 md:text-md">
               {`${replies?.length} ${replies?.length === 1 ? "reply" : "replies"}`}
            </p>
         </DialogTrigger>
         <DialogContent className="bg-white">
            <div className="hidden">
               <DialogTitle></DialogTitle>
            </div>
            <div>
               <h2 className="text-lg font-bold md:text-xl">Replies</h2>
            </div>
            <div>
               {replies?.map((reply, index) => (
                  <ReplyCard
                     key={index}
                     name={reply.author.fullName}
                     checked={reply.purchased}
                     text={reply.text}
                     reviewDate={getDataReview(reply?.createdAt)}
                     images={reply.images}
                     userImage={reply.author.imageUrl}
                  />
               ))}
            </div>
         </DialogContent>
      </Dialog>
   );
};
