import type { Metadata } from "next";
import { Header } from "@/components/shared/header/Header";
import { Footer } from "@/components/shared/footer/Footer";

export async function generateMetadata(): Promise<Metadata> {
   return {
      title: "SHOP.CO | Cart",
      description: "Your Cart",
   };
}

export default function CartLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main>
         <Header hasCart={false} />
         {children}
         <Footer />
      </main>
   );
}
