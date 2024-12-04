import { getSessionId } from "@/lib/getSessionId";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";

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
