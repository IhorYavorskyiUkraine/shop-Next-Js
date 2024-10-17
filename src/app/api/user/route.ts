import { NextResponse } from "next/server";
import { getUser } from "@/lib/getUser";
import { getUserSession } from "@/lib/getUserSession";

export async function GET() {
   const session = await getUserSession();

   if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   try {
      const user = await getUser(Number(session.id));

      return NextResponse.json(user);
   } catch (error) {
      return NextResponse.json(
         { message: "Error when receiving a user", error },
         { status: 500 },
      );
   }
}
