import { prisma } from "../../../../prisma/PrismaClient";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
   const product = await prisma.product.findMany();

   return NextResponse.json(product);
}

export async function POST(req: NextRequest) {
   const body = await req.json();

   const product = await prisma.product.create({
      data: body,
   });

   return NextResponse.json(product);
}
