"use client";

import { signOut } from "next-auth/react";

export const ButtonSignOut: React.FC = () => {
   const onClickSignOut = () => {
      signOut({
         callbackUrl: "/",
      });
   };
   return <button onClick={onClickSignOut}>logout</button>;
};
