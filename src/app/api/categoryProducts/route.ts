import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const categoryId = searchParams.get("categoryId");
   const minPrice = searchParams.get("minPrice");
   const maxPrice = searchParams.get("maxPrice");
   const sizes = searchParams.getAll("sizes");
   const colors = searchParams.getAll("colors");
   const dressStyleId = searchParams.get("dressStyleId");

   if (!categoryId) {
      return NextResponse.json(
         { message: "Category not provided" },
         { status: 400 },
      );
   }

   try {
      let whereCondition: any = { categoryId: Number(categoryId) };

      if (categoryId !== "1" && categoryId !== "2") {
         //on_sale
         whereCondition = { oldPrice: { not: null } };
      }

      if (minPrice && maxPrice) {
         whereCondition.price = {
            gte: Number(minPrice),
            lte: Number(maxPrice),
         };
      }

      console.log(whereCondition);

      if (sizes.length > 0) {
         whereCondition.productVariantOptions = {
            some: {
               sizes: {
                  some: {
                     size: { in: sizes },
                  },
               },
            },
         };
      }

      if (colors.length > 0) {
         whereCondition.productVariantOptions = {
            some: {
               colorId: Number(colors),
            },
         };
      }

      if (dressStyleId) {
         whereCondition.dressStyleId = { dressStyleId };
      }

      const products = await prisma.product.findMany({
         where: whereCondition,
         include: {
            productVariantOptions: {
               include: {
                  sizes: true,
                  color: true,
               },
            },
         },
      });

      return NextResponse.json(products);
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { message: "Error when fetching products" },
         { status: 500 },
      );
   }
}
