"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { Mail } from "lucide-react";
import { useState } from "react";

export const TopFooter: React.FC = () => {
   const [mail, setMail] = useState("");
   return (
      <div className="relative">
         <div className="absolute inset-0 bottom-1/2 left-0 z-10 h-1/2 w-full bg-[#FFF]"></div>
         <Container>
            <div className="relative z-10 rounded-[20px] bg-black px-6 py-8 md:grid md:grid-cols-[minmax(400px,_550px),_minmax(200px,_350px)] md:justify-between md:px-[64px] md:py-10">
               <Title
                  size="lg"
                  text="Stay Upto Date About Our Latest Offers"
                  className="mb-8 text-white md:mb-0 md:!text-[40px]"
               />
               <div className="flex flex-col items-center justify-center">
                  <Input
                     className="mb-3 !w-full !bg-white"
                     onChange={e => setMail(e.target.value)}
                     value={mail}
                     iconHidden={false}
                     placeholder="Enter your email address"
                     icon={<Mail size={16} color={"#00000066"} />}
                  />
                  <Button className="!w-full hover:bg-white/80">
                     Subscribe to Newsletter
                  </Button>
               </div>
            </div>
         </Container>
      </div>
   );
};
