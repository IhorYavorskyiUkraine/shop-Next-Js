import { Footer } from "@/components/shared/footer/Footer";
import { Header } from "@/components/shared/header/Header";
import type { Metadata } from "next";
import { Suspense } from "react";

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
         <Suspense>
            <Header hasCart={false} />
         </Suspense>
         {children}
         <Footer />
      </main>
   );
}
