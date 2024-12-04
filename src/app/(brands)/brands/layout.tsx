import { Footer } from "@/components/shared/footer/Footer";
import { Header } from "@/components/shared/header/Header";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
   return {
      title: "SHOP.CO | Brands",
      description: "Brands Page",
   };
}

export default function BrandsLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main>
         <Suspense>
            <Header />
         </Suspense>
         {children}
         <Footer />
      </main>
   );
}
