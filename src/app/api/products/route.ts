import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";
import { getProductsRating } from "@/lib/getProductsRating";

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
            { message: "Cant find category" },
            { status: 400 },
         );
      }

      const products = await prisma.product.findMany({
         where: { categoryId: Number(categoryId) },
         include: {
            productCategory: true,
            productDetails: true,
            productVariantOptions: {
               include: {
                  sizes: true,
               },
            },
            reviews: {
               include: {
                  author: true,
               },
            },
         },
         take: limit,
         skip: offset,
      });

      const updatedProducts = await getProductsRating(products);

      return NextResponse.json(updatedProducts);
   } catch (error) {
      return NextResponse.json(
         { message: "Something went wrong", error },
         { status: 500 },
      );
   }
}
