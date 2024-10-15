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
      <Button variant="black" className="!w-full" onClick={onClickSignOut}>
         Log Out
      </Button>
   );
};
