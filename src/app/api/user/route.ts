import { NextResponse } from "next/server";
import { getUser } from "@/lib/getUser";
import { getSessionId } from "@/lib/getSessionId";

export async function GET() {
   const sessionId = await getSessionId();

   try {
      const user = await getUser(sessionId);

      return NextResponse.json(user);
   } catch (error) {
      return NextResponse.json(
         { message: "Error when receiving a user", error },
         { status: 500 },
      );
   }
}
