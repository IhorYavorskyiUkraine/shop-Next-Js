import { Footer } from "@/components/shared/footer/Footer";
import { Header } from "@/components/shared/header/Header";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
   title: "SHOP.CO | Category",
   description: "Category Page",
};

export default function HomeLayout({
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
