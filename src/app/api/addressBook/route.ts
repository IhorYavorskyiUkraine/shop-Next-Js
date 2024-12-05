import { setFalseActiveAddress } from "@/lib";
import { getSessionId } from "@/lib/getSessionId";
import { prisma } from "@prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
   const sessionId = await getSessionId();

   if (!sessionId) {
      return NextResponse.json(
         { message: "User not logged in" },
         { status: 401 },
      );
   }

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

   if (!id || !sessionId) {
      return NextResponse.json(
         { message: "ID or sessionId not provided" },
         { status: 400 },
      );
   }

   try {
      const userAddress = await prisma.userAddressBook.findFirst({
         where: { id: sessionId },
      });

      if (!userAddress) {
         return NextResponse.json(
            { message: "User address not found" },
            { status: 404 },
         );
      }

      await setFalseActiveAddress();

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

   if (!id || !sessionId) {
      return NextResponse.json(
         { message: "Id or sessionId not provided" },
         { status: 400 },
      );
   }

   try {
      const userAddress = await prisma.userAddressBook.findFirst({
         where: { id: sessionId },
         include: {
            address: true,
         },
      });

      if (!userAddress) {
         return NextResponse.json(
            { message: "User address not found" },
            { status: 404 },
         );
      }

      await prisma.address.delete({
         where: { id: Number(id) },
      });

      const remainingAddresses = await prisma.address.findMany({
         where: { addressBookId: userAddress.id },
      });

      await setFalseActiveAddress();

      if (remainingAddresses.length > 0) {
         const last = remainingAddresses[remainingAddresses.length - 1];

         await prisma.address.update({
            where: { id: last.id },
            data: { active: true },
         });
      }

      return NextResponse.json({ message: "Address deleted" });
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { message: "Error when deleting an address", error },
         { status: 500 },
      );
   }
}
