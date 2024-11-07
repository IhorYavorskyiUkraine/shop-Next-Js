import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const categoryId = searchParams.get("categoryId");
   const minPrice = searchParams.get("minPrice");
   const maxPrice = searchParams.get("maxPrice");
   const sizes = searchParams.getAll("sizes")
      ? searchParams.get("sizes")?.split(",")
      : [];
   const colors = searchParams.getAll("colors")
      ? searchParams.get("colors")?.split(",")
      : [];
   const dressStyleId = searchParams.get("dressStyleId");
   const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);
   const offset = parseInt(req.nextUrl.searchParams.get("offset") || "0", 10);

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

      if (sizes && sizes?.length > 0) {
         const normalizedSizes = sizes?.map(size => size.toLowerCase());
         whereCondition.productVariantOptions = {
            some: {
               sizes: {
                  some: {
                     size: {
                        in: normalizedSizes,
                     },
                  },
               },
            },
         };
      }

      if (colors && colors.length > 0) {
         whereCondition.productVariantOptions = {
            some: {
               colorId: {
                  in: colors.map(color => Number(color)),
               },
            },
         };
      }

      if (dressStyleId) {
         whereCondition.dressStyleId = Number(dressStyleId);
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
         take: limit,
         skip: offset,
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
