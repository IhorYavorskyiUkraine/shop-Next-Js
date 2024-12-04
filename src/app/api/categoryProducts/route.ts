import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@prisma/PrismaClient";

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const category = searchParams.get("category");
   const minPrice = searchParams.get("minPrice");
   const maxPrice = searchParams.get("maxPrice");
   const sizes =
      searchParams.getAll("sizes") && searchParams.get("sizes")?.split(",");
   const colors =
      searchParams.getAll("colors") && searchParams.get("colors")?.split(",");
   const dressStyleId = searchParams.get("dressStyleId");
   const productCategoryId = searchParams.get("productCategoryId");
   const sortBy = searchParams.get("sortBy") || "popularity";
   const productBrands = searchParams.getAll("brands");
   const limit = Number(searchParams.get("limit")) || 12;
   const offset = Number(searchParams.get("offset")) || 0;

   if (!category) {
      return NextResponse.json(
         { message: "Category not provided" },
         { status: 400 },
      );
   }

   try {
      let whereCondition: any = {};

      if (category === "1" || category === "2") {
         whereCondition.categoryId = Number(category);
      } else if (category === "all_products") {
         whereCondition = {};
      } else {
         whereCondition.oldPrice = { not: null };
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

      if (productBrands && productBrands.length > 0) {
         const validBrands = productBrands
            .map(brand => Number(brand))
            .filter(brand => !isNaN(brand));

         if (validBrands.length > 0) {
            whereCondition.productBrandId = {
               in: validBrands,
            };
         }
      }

      if (dressStyleId) {
         whereCondition.dressStyleId = Number(dressStyleId);
      }

      if (productCategoryId) {
         whereCondition.productCategoryId = Number(productCategoryId);
      }

      const totalProducts = await prisma.product.count({
         where: whereCondition,
      });

      const totalPages = Math.ceil(totalProducts / limit);

      const filters = await prisma.productVariantOption.findMany({
         select: {
            sizes: {
               select: { size: true },
            },
            color: {
               select: { id: true },
            },
            price: true,
         },
      });

      const brandsFilters = await prisma.product.findMany({
         select: {
            brand: true,
         },
         distinct: ["productBrandId"],
      });

      const minProductPrice = Math.min(...filters.map(option => option.price));
      const maxProductPrice = Math.max(...filters.map(option => option.price));

      const productFilters = {
         sizes: Array.from(
            new Set(filters.flatMap(option => option.sizes.map(s => s.size))),
         ),
         colors: Array.from(new Set(filters.map(option => option.color.id))),
         brands: Array.from(new Set(brandsFilters.map(brand => brand.brand))),
         minProductPrice,
         maxProductPrice,
      };

      let orderBy: { [key: string]: "asc" | "desc" } = {};
      if (sortBy === "price_asc") {
         orderBy = { price: "asc" };
      } else if (sortBy === "price_desc") {
         orderBy = { price: "desc" };
      } else if (sortBy === "popularity") {
         orderBy = { rating: "desc" };
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
         orderBy,
      });

      return NextResponse.json({
         products,
         totalPages,
         totalProducts,
         productFilters,
      });
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { message: "Error when fetching products" },
         { status: 500 },
      );
   }
}
