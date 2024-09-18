"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TopFooter: React.FC = () => {
   const [mail, setMail] = useState("");
   return (
      <div className="rounded-[20px] bg-black px-6 py-8 md:grid md:grid-cols-[minmax(400px,_550px),_minmax(200px,_350px)] md:justify-between md:px-[64px] md:py-10">
         <Title
            size="lg"
            text="Stay Upto Date About Our Latest Offers"
            className="mb-8 text-white md:mb-0 md:!text-[40px]"
         />
         <div className="flex flex-col items-center justify-center">
            <Input
               className="mb-3 !w-full"
               onChange={e => setMail(e.target.value)}
               value={mail}
               placeholder="Enter your email address"
               icon={<Mail size={16} color={"#00000066"} />}
            />
            <Button className="!w-full">Subscribe to Newsletter</Button>
         </div>
      </div>
   );
};
