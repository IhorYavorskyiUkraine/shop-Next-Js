import { Footer } from "@/components/shared/footer/Footer";
import { Header } from "@/components/shared/header/Header";
import type { Metadata } from "next";
import { prisma } from "@prisma/PrismaClient";

interface LayoutProps {
   children: React.ReactNode;
   params: {
      id: string;
   };
}

export async function generateMetadata({
   params: { id },
}: LayoutProps): Promise<Metadata> {
   const product = await prisma.product.findFirst({
      where: { id: Number(id) },
   });

   return {
      title: product
         ? `SHOP.CO | ${product.name}`
         : "SHOP.CO | Product Not Found",
      description: product ? product.name : "Product not found",
   };
}

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
