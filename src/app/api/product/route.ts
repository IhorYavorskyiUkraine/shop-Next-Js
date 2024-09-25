import { NextRequest, NextResponse } from "next/server"; // Убедитесь, что вы импортируете вашу инстанцию Prisma
import { prisma } from "../../../../prisma/PrismaClient";

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id");

   if (!id) {
      return NextResponse.json({ message: "ID не указан" }, { status: 400 });
   }

   try {
      const product = await prisma.product.findFirst({
         where: { id: Number(id) },
         include: {
            productVariantOptions: {
               include: {
                  sizes: true,
               },
            },
            productDetails: true,
            reviews: {
               include: {
                  author: true,
                  purchase: true,
               },
               orderBy: {
                  createdAt: "desc",
               },
            },
         },
      });

      return NextResponse.json(product);
   } catch (error) {
      return NextResponse.json(
         { message: "Ошибка при получении продукта", error },
         { status: 500 },
      );
   }
}
