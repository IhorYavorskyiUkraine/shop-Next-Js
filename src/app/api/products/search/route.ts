import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
   const query = req.nextUrl.searchParams.get("query") || "";

   if (!query) {
      return NextResponse.json(
         { error: "Query parameter is required" },
         { status: 400 },
      );
   }

   try {
      const products = await prisma.product.findMany({
         where: {
            name: {
               contains: query,
               mode: "insensitive",
            },
         },
      });

      return NextResponse.json(products);
   } catch (error) {
      return NextResponse.json(
         { error: "Something went wrong" },
         { status: 500 },
      );
   }
}
