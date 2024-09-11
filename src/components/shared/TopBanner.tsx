"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "../ui/container";
import { X } from "lucide-react";

export const TopBanner: React.FC = () => {
   const [showPopup, setShowPopup] = useState(true);

   const closePopup = () => {
      setShowPopup(false);
   };
   return (
      showPopup && (
         <div className="bg-black py-[10px] text-white">
            <Container>
               <div className="flex items-center justify-between">
                  <p className="flex-1 text-center">
                     Sign up and get 20% off your first order.
                     <Link href="/" className="ml-1 underline">
                        Sign Up Now
                     </Link>
                  </p>
                  <button onClick={closePopup} className="ml-4 hidden md:block">
                     <X size={20} />
                  </button>
               </div>
            </Container>
         </div>
      )
   );
};
