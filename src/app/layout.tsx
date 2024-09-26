import { Providers } from "@/components/shared/Providers";
import "./globals.css";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body>
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}
