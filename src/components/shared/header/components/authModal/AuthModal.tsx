import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Login } from "./forms/Login";
import { Register } from "./forms/Register";

interface Props {
   open: boolean;
   onClose: () => void;
   callbackUrl?: string;
   redirect?: boolean;
}

export const AuthModal: React.FC<Props> = ({
   open,
   onClose,
   callbackUrl,
   redirect,
}) => {
   const [type, setType] = useState<"login" | "register">("login");

   const onSwitch = () => {
      setType(type === "login" ? "register" : "login");
   };

   const handleClose = () => {
      onClose();
   };

   return (
      <Dialog open={open} onOpenChange={handleClose}>
         <DialogContent className="bg-white">
            {type === "login" ? (
               <Login onClose={handleClose} />
            ) : (
               <Register onClose={handleClose} />
            )}

            <div className="flex gap-2 p-6">
               <Button
                  onClick={() =>
                     signIn("github", {
                        callbackUrl: callbackUrl,
                        redirect: redirect,
                     })
                  }
                  type="button"
                  className="h-12 flex-1 gap-2 p-2"
               >
                  <Image
                     alt="GitHub"
                     width={24}
                     loading="lazy"
                     height={24}
                     src="https://github.githubassets.com/favicons/favicon.svg"
                  />
                  GitHub
               </Button>
               <Button
                  onClick={() =>
                     signIn("google", {
                        callbackUrl: callbackUrl,
                        redirect: redirect,
                     })
                  }
                  type="button"
                  className="h-12 flex-1 gap-2 p-2"
               >
                  <Image
                     width={24}
                     height={24}
                     loading="lazy"
                     alt="Google"
                     src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                  />
                  Google
               </Button>
            </div>
            <Button variant="black" onClick={onSwitch}>
               {type === "login" ? "Register" : "Login"}
            </Button>
         </DialogContent>
      </Dialog>
   );
};
