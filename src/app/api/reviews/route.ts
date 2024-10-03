import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id");
   const orderBy = searchParams.get("orderBy");

   if (!id) {
      return NextResponse.json({ message: "ID не указан" }, { status: 400 });
   }

   try {
      const reviews = await prisma.review.findMany({
         where: { productId: Number(id) },
         include: {
            author: true,
            purchase: true,
         },
         orderBy: {
            createdAt: orderBy === "desc" ? "desc" : "asc",
         },
      });

      return NextResponse.json(reviews);
   } catch (error) {
      return NextResponse.json(
         { message: "Ошибка при получении отзывов", error },
         { status: 500 },
      );
   }
}

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { productId, authorId, rating, text } = body;

   if (!productId || !authorId || !rating || !text) {
      return NextResponse.json(
         { message: "Некорректные данные" },
         { status: 400 },
      );
   }

   try {
      const review = await prisma.review.create({
         data: {
            author: {
               connect: { id: authorId },
            },
            product: {
               connect: { id: productId },
            },
            rating: Number(rating),
            text,
         },
      });

      return NextResponse.json({ message: "Отзыв успешно добавлен", review });
   } catch (error) {
      console.error("Ошибка при создании отзыва:", error); // Лог ошибки
      return NextResponse.json(
         { message: "Ошибка при создании отзыва", error },
         { status: 500 },
      );
   }
}
