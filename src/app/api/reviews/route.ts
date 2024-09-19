import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";

export async function GET() {
   try {
      const reviews = await prisma.review.findMany();

      return NextResponse.json(reviews);
   } catch (error) {
      return NextResponse.json(
         { message: "Ошибка при получении отзывов", error },
         { status: 500 },
      );
   }
}
