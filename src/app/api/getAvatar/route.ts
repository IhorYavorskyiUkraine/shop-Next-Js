import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";

export async function GET(req: NextRequest) {
   const userId = req.nextUrl.searchParams.get("userId");

   if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
   }

   try {
      const user = await prisma.user.findUnique({
         where: { id: Number(userId) },
         select: { imageUrl: true },
      });

      if (user?.imageUrl) {
         return NextResponse.json({ avatarUrl: user.imageUrl });
      } else {
         return NextResponse.json({ avatarUrl: null });
      }
   } catch (error) {
      console.error("Error fetching avatar:", error);
      return NextResponse.json(
         { error: "Error fetching avatar" },
         { status: 500 },
      );
   }
}
