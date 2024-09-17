import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";

export async function GET(req: NextRequest) {
   try {
      const categoryId = req.nextUrl.searchParams.get("categoryId");
      const limit = parseInt(req.nextUrl.searchParams.get("limit") || "4", 10);
      const offset = parseInt(
         req.nextUrl.searchParams.get("offset") || "0",
         10,
      );

      if (!categoryId || isNaN(Number(categoryId))) {
         return NextResponse.json(
            { message: "Неверный идентификатор категории" },
            { status: 400 },
         );
      }

      const products = await prisma.product.findMany({
         where: { categoryId: Number(categoryId) },
         include: { productCategory: true },
         take: limit,
         skip: offset,
      });

      return NextResponse.json(products);
   } catch (error) {
      return NextResponse.json(
         { message: "Ошибка при получении продуктов", error },
         { status: 500 },
      );
   }
}
