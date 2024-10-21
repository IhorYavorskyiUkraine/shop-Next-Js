"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const ButtonSignOut: React.FC = () => {
   const onClickSignOut = () => {
      signOut({
         callbackUrl: "/",
      });
   };
   return (
      <Button
         className="text-md font-medium leading-19 text-black md:leading-19"
         variant="none"
         size="none"
         onClick={onClickSignOut}
      >
         Log Out
      </Button>
   );
};
