import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import Link from "next/link";
import { tablesData } from "../home/home.data";
import { NumberTable } from "../home/components/NumberTable";
import { BrandIcons } from "../home/components/BrandIcons";
import Image from "next/image";

type TableDataItem = {
   number: string;
   text: string;
};

export const Hero: React.FC = () => {
   return (
      <section className="bg-bg pt-10">
         <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
               <div className="flex flex-col justify-center">
                  <Title
                     className="mb-5"
                     size="xl"
                     text="Find Clothes That Matches Your Style"
                  />
                  <p className="mb-6 leading-20 text-black/60 md:text-md">
                     Browse through our diverse range of meticulously crafted
                     garments, designed to bring out your individuality and
                     cater to your sense of style.
                  </p>
                  <Link href="/on_sale">
                     <Button
                        variant="black"
                        className="mb-5 md:mb-10 md:w-[210px]"
                     >
                        Shop Now
                     </Button>
                  </Link>
                  <div className="flex flex-wrap justify-center gap-7">
                     {tablesData.map((table: TableDataItem, index) => (
                        <div
                           key={index}
                           className="flex flex-wrap justify-center gap-7"
                        >
                           <NumberTable
                              number={table.number}
                              text={table.text}
                           />
                           {index !== tablesData.length - 1 && (
                              <div className="w-[1px] bg-black/10"></div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
               <div className="flex items-end justify-end">
                  <Image
                     src="/images/home/bg.png"
                     width={600}
                     height={600}
                     alt=""
                     className="w-full"
                     priority
                  />
               </div>
            </div>
         </Container>
         <BrandIcons />
      </section>
   );
};
