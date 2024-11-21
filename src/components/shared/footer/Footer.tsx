import Link from "next/link";
import { Container } from "../../ui/container";
import { TopFooter } from "./components/TopFooter";
import { cn } from "@/lib/utils";
import { menuData, payments, socialLogos } from "./footer.data";
import Image from "next/image";

export const Footer: React.FC = () => {
   return (
      <footer className="bg-[#F0F0F0]">
         <TopFooter />
         <Container className="py-[50px] md:pb-[80px]">
            <div className="border-b-[1px] border-black/10 pb-10 md:flex md:justify-between md:gap-[110px] md:pb-[50px]">
               <div className="mb-8 md:mb-0 md:max-w-[250px]">
                  <Link
                     href="/home"
                     className="mb-1 inline-block max-w-[160px] flex-1 font-integral-b text-[26px] font-bold uppercase leading-30 md:mb-2"
                  >
                     shop.co
                  </Link>
                  <p className="mb-5 md:mb-9">
                     We have clothes that suits your style and which you’re
                     proud to wear. From women to men.
                  </p>
                  <div className="flex gap-3">
                     {socialLogos.map(logo => (
                        <Link
                           key={logo.name}
                           className={cn(
                              logo.name === "facebook"
                                 ? "bg-black"
                                 : "bg-white",
                              "flex size-7 items-center justify-center rounded-full border-[1px] border-black/20",
                           )}
                           href={logo.href}
                        >
                           <div className="flex items-center justify-center">
                              {logo.logo}
                           </div>
                        </Link>
                     ))}
                  </div>
               </div>
               <ul className="flex flex-1 flex-wrap justify-between gap-6">
                  {menuData.map(item => (
                     <li className="list-none" key={item.title}>
                        <h4 className="mb-3 font-satoshi-b font-medium uppercase leading-[18px] tracking-[3px] md:mb-5 md:text-md">
                           {item.title}
                        </h4>
                        <ul>
                           {item.name.map(item => (
                              <li className="mb-1 md:mb-2" key={item.name}>
                                 <Link
                                    className="leading-[16px] opacity-60 md:text-md md:leading-[19px]"
                                    href={item.link}
                                 >
                                    {item.name}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </li>
                  ))}
               </ul>
            </div>
            <div className="flex flex-col gap-4 pt-4 md:flex-row md:justify-between md:pt-5">
               <p className="text-center leading-19 opacity-60 md:text-start">
                  Shop.co © 2000-2023, All Rights Reserved
               </p>
               <div className="flex justify-center gap-3 md:justify-end">
                  {payments.map(payment => (
                     <div
                        className="flex items-center justify-center rounded-[6px] border-[0.22px] border-[#D6DCE5] p-2"
                        key={payment.name}
                     >
                        <Image
                           loading="lazy"
                           width={24}
                           height={24}
                           src={payment.image}
                           alt={payment.name}
                        />
                     </div>
                  ))}
               </div>
            </div>
         </Container>
      </footer>
   );
};
