import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { DressStyleCard } from "../home/components/DressStyleCard";
import { dressStyleData } from "../home/home.data";

type DressStyle = {
   style: string;
   imageUrl: string;
   className?: string;
};

export const DressStyle: React.FC = () => {
   return (
      <section>
         <Container>
            <div className="rounded-[60px] bg-[#F0F0F0] px-6 py-7 text-center md:px-[64px] md:py-[70px]">
               <Title
                  text="Browse by dress style"
                  className="mb-7 md:mb-[70px]"
                  size="lg"
               />
               <div className="grid grid-cols-1 grid-rows-[repeat(4,190px)] gap-y-4 md:grid-cols-[minmax(200px,_400px)_minmax(134px,_268px)_minmax(200px,_400px)] md:grid-rows-[repeat(2,290px)] md:gap-4">
                  {dressStyleData.map((dressStyle: DressStyle, index) => (
                     <DressStyleCard key={index} {...dressStyle} />
                  ))}
               </div>
            </div>
         </Container>
      </section>
   );
};
