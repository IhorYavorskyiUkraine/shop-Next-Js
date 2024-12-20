import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/PrismaClient";

export async function GET(req: NextRequest) {
   try {
      const code = "";

      if (!code) {
         return NextResponse.json(
            { message: "Code not found" },
            { status: 404 },
         );
      }

      const verificationCode = await prisma.verificationCode.findFirst({
         where: {
            code,
         },
      });

      if (!verificationCode) {
         return NextResponse.json({ message: "Цrong code" }, { status: 404 });
      }

      await prisma.user.update({
         where: {
            id: verificationCode.userId,
         },
         data: {
            verified: new Date(),
         },
      });

      await prisma.verificationCode.delete({
         where: {
            id: verificationCode.id,
         },
      });

      return NextResponse.redirect(new URL("/?verified", req.url));
   } catch (e) {
      console.error(e);
   }
}
