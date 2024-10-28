import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";
import { getWishList } from "@/lib/getWishList";

export async function GET() {
   try {
      const wishList = await getWishList();

      return NextResponse.json(wishList);
   } catch (error) {
      return NextResponse.json(
         { message: "Error when receiving a user", error },
         { status: 500 },
      );
   }
}

export async function POST(req: NextRequest) {
   try {
      const { searchParams } = new URL(req.url);
      const productId = searchParams.get("id");

      if (!productId) {
         return null;
      }

      const wishList = await getWishList();

      if (!wishList) {
         return null;
      }

      const product = await prisma.product.findFirst({
         where: { id: Number(productId) },
      });

      if (!product) {
         return NextResponse.json(
            { message: "Product not found" },
            { status: 404 },
         );
      }

      const { id, name, imageUrl, rating, price, oldPrice } = product;

      const existingProduct = wishList.items.find(
         item => item.productId === id,
      );

      if (existingProduct) {
         await prisma.wishList.update({
            where: { id: wishList.id },
            data: {
               items: {
                  delete: {
                     id: existingProduct.id,
                  },
               },
            },
         });

         return NextResponse.json({
            message: "Product removed from wish list",
         });
      }

      await prisma.wishList.update({
         where: { id: wishList.id },
         data: {
            items: {
               create: {
                  productId: id,
                  name,
                  imageUrl,
                  rating,
                  price,
                  oldPrice,
               },
            },
         },
      });

      return NextResponse.json({
         message: "Product added to wish list",
      });
   } catch (error) {
      return NextResponse.json(
         { message: "Error when receiving a user", error },
         { status: 500 },
      );
   }
}
