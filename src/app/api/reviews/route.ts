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
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id");
   const { author, purchase, rating, text } = await req.json();

   if (!id) {
      return NextResponse.json({ message: "ID не указан" }, { status: 400 });
   }

   try {
      const review = await prisma.review.create({
         data: {
            author: {
               connect: { id: author },
            },
            product: {
               connect: { id: Number(id) },
            },
            purchase: {
               connect: { id: purchase },
            },
            rating: Number(rating),
            text,
         },
      });

      return NextResponse.json({ message: "Отзыв успешно добавлен", review });
   } catch (error) {
      return NextResponse.json(
         { message: "Ошибка при получении отзывов", error },
         { status: 500 },
      );
   }
}
