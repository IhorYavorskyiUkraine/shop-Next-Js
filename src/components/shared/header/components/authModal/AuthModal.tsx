import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { CircleUserRound } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Login } from "./forms/login";

interface Props {
   open: boolean;
   onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
   const [type, setType] = useState<"login" | "register">("login");

   const onSwitch = () => {
      setType(type === "login" ? "register" : "login");
   };

   const handleClose = () => {
      onClose();
   };
   return (
      <Dialog onOpenChange={handleClose}>
         <DialogTrigger>
            <CircleUserRound
               className="cursor-pointer"
               color={"#000"}
               size={20}
            />
         </DialogTrigger>
         <DialogContent className="bg-[#F0F0F0]">
            {type === "login" ? (
               <Login onClose={handleClose} />
            ) : (
               <h1>Register</h1>
            )}

            <div className="flex gap-2 p-6">
               <Button
                  onClick={() =>
                     signIn("github", {
                        callbackUrl: "/",
                        redirect: true,
                     })
                  }
                  type="button"
                  className="h-12 flex-1 gap-2 p-2"
               >
                  <img
                     className="h-6 w-6"
                     src="https://github.githubassets.com/favicons/favicon.svg"
                  />
                  GitHub
               </Button>
               <Button
                  onClick={() =>
                     signIn("google", {
                        callbackUrl: "/",
                        redirect: true,
                     })
                  }
                  type="button"
                  className="h-12 flex-1 gap-2 p-2"
               >
                  <img
                     className="h-6 w-6"
                     src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                  />
                  Google
               </Button>
            </div>
            <Button onClick={onSwitch}>
               {type === "login" ? "Register" : "Login"}
            </Button>
         </DialogContent>
      </Dialog>
   );
};
