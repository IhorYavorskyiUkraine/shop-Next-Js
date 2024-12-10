import { prisma } from "@prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id");
   const orderBy = searchParams.get("orderBy");
   const limit = parseInt(req.nextUrl.searchParams.get("limit") || "4", 10);
   const offset = parseInt(req.nextUrl.searchParams.get("offset") || "0", 10);

   if (!id) {
      return NextResponse.json(
         { message: "Id not specified" },
         { status: 400 },
      );
   }

   try {
      const reviews = await prisma.review.findMany({
         where: { productId: Number(id) },
         include: {
            author: {
               select: {
                  imageUrl: true,
                  fullName: true,
               },
            },
            reviewReplies: {
               include: {
                  author: {
                     select: {
                        imageUrl: true,
                        fullName: true,
                     },
                  },
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
      console.error("Error fetching reviews:", error);
      return NextResponse.json(
         { message: "Error fetching reviews:", error },
         { status: 500 },
      );
   }
}

export async function POST(req: NextRequest) {
   const body = await req.json();

   if (!body) {
      return NextResponse.json({ message: "Not valid data" }, { status: 400 });
   }

   const { productId, authorId, rating, text, reply, reviewId, images } = body;

   if (!productId || !authorId || !text) {
      return NextResponse.json({ message: "Not valid data" }, { status: 400 });
   }

   if (reply && !reviewId) {
      return NextResponse.json(
         { message: "Feedback is required for a response" },
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

         // IF NEED IMAGES FOR REPLIES
         // if (images) {
         //    await prisma.reviewReply.update({
         //       where: { id: replyToReview.id },
         //       data: {
         //          images: {
         //             create: images.map((image: { url: string }) => ({
         //                url: image.url,
         //             })),
         //          },
         //       },
         //    });
         // }
         return NextResponse.json({
            message: "Feedback successfully added",
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

      return NextResponse.json({
         message: "Feedback successfully added",
         review,
      });
   } catch (error) {
      console.error("Error while creating a review:", error);
      return NextResponse.json(
         { message: "Error while creating a review", error },
         { status: 500 },
      );
   }
}
