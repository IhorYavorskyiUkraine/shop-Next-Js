import type { Metadata } from "next";
import { Header } from "@/components/shared/header/Header";
import { Footer } from "@/components/shared/footer/Footer";
import { prisma } from "../../../../../prisma/PrismaClient";

interface LayoutProps {
   children: React.ReactNode;
   params: Promise<{
      id: string;
   }>;
}

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
   const params = await props.params;

   const {
      id
   } = params;

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
