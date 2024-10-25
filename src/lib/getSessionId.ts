import { NextResponse } from "next/server";
import { getUserSession } from "./getUserSession";

export async function getSessionId() {
   const session = await getUserSession();

   if (!session) {
      throw new Error("Unauthorized");
   }

   return Number(session.id);
}
