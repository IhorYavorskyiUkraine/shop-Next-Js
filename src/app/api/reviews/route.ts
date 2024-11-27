import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id");
   const orderBy = searchParams.get("orderBy");
   const limit = parseInt(req.nextUrl.searchParams.get("limit") || "4", 10);
   const offset = parseInt(req.nextUrl.searchParams.get("offset") || "0", 10);

   if (!id) {
      return NextResponse.json({ message: "ID не указан" }, { status: 400 });
   }

   try {
      const reviews = await prisma.review.findMany({
         where: { productId: Number(id) },
         include: {
            author: true,
            reviewReplies: {
               include: {
                  author: true,
                  images: true,
               },
            },
            images: true,
         },
         take: limit,
         skip: offset,
         orderBy: {
            createdAt: orderBy === "desc" ? "desc" : "asc",
         },
      });

      const authorIds = [
         ...new Set(
            reviews.flatMap(review => [
               review.authorId,
               ...review.reviewReplies.map(reply => reply.authorId),
            ]),
         ),
      ];

      const purchases = await prisma.order.findMany({
         where: {
            userId: { in: authorIds },
            items: {
               some: {
                  productVariantOption: {
                     productId: Number(id),
                  },
               },
            },
         },
         select: {
            userId: true,
         },
      });

      const purchaseMap = new Map(
         purchases.map(purchase => [purchase.userId, true]),
      );

      const reviewsWithPurchaseInfo = reviews.map(review => {
         const repliesWithPurchaseInfo = review.reviewReplies
            .map(reply => ({
               ...reply,
               purchased: purchaseMap.get(reply.authorId) || false,
            }))
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

         return {
            ...review,
            purchased: purchaseMap.get(review.authorId) || false,
            reviewReplies: repliesWithPurchaseInfo,
         };
      });

      return NextResponse.json(reviewsWithPurchaseInfo, { status: 200 });
   } catch (error) {
      console.error("Ошибка при получении отзывов и проверке покупок:", error);
      return NextResponse.json(
         { message: "Ошибка при получении отзывов", error },
         { status: 500 },
      );
   }
}

export async function POST(req: NextRequest) {
   const body = await req.json();

   if (!body) {
      return NextResponse.json(
         { message: "Некорректные данные" },
         { status: 400 },
      );
   }

   const { productId, authorId, rating, text, reply, reviewId, images } = body;

   if (!productId || !authorId || !text) {
      return NextResponse.json(
         { message: "Некорректные данные" },
         { status: 400 },
      );
   }

   if (reply && !reviewId) {
      return NextResponse.json(
         { message: "Отзыв обязателен для ответа " },
         { status: 400 },
      );
   }

   try {
      if (reply) {
         const replyToReview = await prisma.reviewReply.create({
            data: {
               author: {
                  connect: { id: authorId },
               },
               product: {
                  connect: { id: productId },
               },
               review: {
                  connect: { id: reviewId },
               },
               text,
            },
         });

         if (images) {
            await prisma.reviewReply.update({
               where: { id: replyToReview.id },
               data: {
                  images: {
                     create: images.map((image: { url: string }) => ({
                        url: image.url,
                     })),
                  },
               },
            });
         }
         return NextResponse.json({
            message: "Отзыв успешно добавлен",
            replyToReview,
         });
      }

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

      if (images) {
         await prisma.review.update({
            where: { id: review.id },
            data: {
               images: {
                  create: images.map((image: { url: string }) => ({
                     url: image.url,
                  })),
               },
            },
         });
      }

      return NextResponse.json({ message: "Отзыв успешно добавлен", review });
   } catch (error) {
      console.error("Ошибка при создании отзыва:", error);
      return NextResponse.json(
         { message: "Ошибка при создании отзыва", error },
         { status: 500 },
      );
   }
}
