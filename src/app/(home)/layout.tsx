import type { Metadata } from "next";
import { Header } from "@/components/shared/header/Header";
import { Footer } from "@/components/shared/footer/Footer";

export const metadata: Metadata = {
   title: "SHOP.CO | Home",
   description: "Home Page",
};

export default function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main>
         <Header />
         {children}
         <Footer />
      </main>
   );
}
