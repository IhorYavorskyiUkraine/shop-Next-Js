import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function createCartToken() {
   const newToken = randomUUID();
   const response = NextResponse.json({
      cart: [],
   });

   response.cookies.set("cartToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
   });

   return { newToken, response };
}
