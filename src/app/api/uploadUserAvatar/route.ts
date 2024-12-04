import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@prisma/PrismaClient";

export async function POST(req: NextRequest) {
   try {
      const formData = await req.formData();
      const userId = formData.get("userId") as string;
      const file = formData.get("file") as File;

      if (!userId || !file) {
         return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 },
         );
      }

      const fileName = `UsersAvatars/${userId}_${file.name}`;
      const uploadedBlob = await put(fileName, file, {
         access: "public",
      });

      await prisma.user.update({
         where: { id: Number(userId) },
         data: { imageUrl: uploadedBlob.url },
      });

      return NextResponse.json({
         message: "Avatar uploaded",
         url: uploadedBlob.url,
      });
   } catch (error) {
      console.error("Error uploading avatar:", error);
      return NextResponse.json(
         { message: "Failed to upload avatar" },
         { status: 500 },
      );
   }
}
