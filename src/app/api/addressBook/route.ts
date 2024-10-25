import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";
import { getSessionId } from "@/lib/getSessionId";

export async function GET() {
   const sessionId = await getSessionId();

   try {
      let userAddress = await prisma.userAddressBook.findFirst({
         where: { id: sessionId },
         include: {
            address: {
               orderBy: {
                  createdAt: "desc",
               },
            },
         },
      });

      if (!userAddress) {
         userAddress = await prisma.userAddressBook.create({
            data: {
               userId: sessionId,
            },
            include: {
               address: true,
            },
         });
      }

      return NextResponse.json(userAddress);
   } catch (error) {
      return NextResponse.json(
         { message: "Error when receiving a address book", error },
         { status: 500 },
      );
   }
}

export async function PATCH(req: NextRequest) {
   const sessionId = await getSessionId();
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id");

   if (!id) {
      return NextResponse.json({ message: "ID not provided" }, { status: 400 });
   }

   try {
      const userAddress = await prisma.userAddressBook.findFirst({
         where: { id: sessionId },
      });

      if (!userAddress) {
         return null;
      }

      await prisma.address.updateMany({
         data: {
            active: false,
         },
      });

      await prisma.address.update({
         where: { id: Number(id) },
         data: {
            active: true,
         },
      });

      return NextResponse.json(userAddress);
   } catch (error) {
      return NextResponse.json(
         { message: "Error when updating a address book", error },
         { status: 500 },
      );
   }
}

export async function DELETE(req: NextRequest) {
   const sessionId = await getSessionId();
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id");

   if (!id) {
      return NextResponse.json({ message: "ID not provided" }, { status: 400 });
   }

   try {
      const userAddress = await prisma.userAddressBook.findFirst({
         where: { id: sessionId },
         include: {
            address: true,
         },
      });

      if (!userAddress) {
         return null;
      }

      await prisma.address.delete({
         where: { id: Number(id) },
      });

      return NextResponse.json({ message: "Address deleted" });
   } catch (error) {
      return NextResponse.json(
         { message: "Error when deleting an address", error },
         { status: 500 },
      );
   }
}
