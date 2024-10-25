import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";
import { getUserSession } from "@/lib/getUserSession";
import { createCartToken } from "@/services/createCartToken";
import { getUserCart } from "@/services/getUserCart";
import { createUserCart } from "@/services/createUserCart";
import { createCartItem } from "@/services/createCartItem";
import { getCartItem } from "@/services/getCartItem";
import { updateCartTotalAmount } from "@/app/actions";
import { getSessionId } from "@/lib/getSessionId";

export async function GET(req: NextRequest) {
   try {
      const token = req.cookies.get("cartToken")?.value;
      const sessionId = await getSessionId();
      let newToken = token;

      if (!token) {
         const { response } = await createCartToken();
         return response;
      }

      const userCart =
         (await getUserCart(sessionId, newToken)) ||
         (await createUserCart(sessionId, newToken));

      await updateCartTotalAmount(userCart);

      return NextResponse.json(userCart);
   } catch (error) {
      return NextResponse.json(
         { message: "Error when receiving a shopping cart", error },
         { status: 500 },
      );
   }
}

export async function POST(req: NextRequest) {
   try {
      const token = req.cookies.get("cartToken")?.value;
      const sessionId = await getSessionId();
      let newToken = token;

      if (!token) {
         const { response } = await createCartToken();
         return response;
      }

      const userCart = await getUserCart(sessionId, newToken);

      if (!userCart) {
         return NextResponse.json(
            { message: "Shopping cart not found" },
            { status: 404 },
         );
      }

      const body = await req.json();

      const { productId, productVariantOptionId, quantity, sizeId } = body;

      const findCartItem = await prisma.cartItem.findFirst({
         where: {
            cartId: userCart.id,
            productVariantOptionId,
            sizeId,
         },
      });

      await createCartItem({
         findCartItem,
         userCartId: userCart.id,
         productId,
         productVariantOptionId,
         quantity,
         sizeId,
      });

      return NextResponse.json({ message: "Product added to cart" });
   } catch (error) {
      return NextResponse.json(
         { message: "An error in receiving the products", error },
         { status: 500 },
      );
   }
}

export async function PATCH(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id");
   const quantity = searchParams.get("quantity");
   const token = req.cookies.get("cartToken")?.value;
   const sessionId = await getSessionId();

   if (!id && !quantity) {
      return NextResponse.json(
         {
            message: "No product id",
         },
         { status: 400 },
      );
   }

   const userCart = await getUserCart(sessionId, token);

   if (!userCart) {
      return NextResponse.json({
         message: "Shopping cart not found",
      });
   }

   const cartItem = await getCartItem(userCart, Number(id));

   if (!cartItem) {
      return NextResponse.json(
         {
            message: "Product not found in shopping cart",
         },
         { status: 404 },
      );
   }

   await prisma.cartItem.update({
      where: {
         id: Number(id),
      },
      data: {
         quantity: Number(quantity),
      },
   });

   return NextResponse.json({ message: "Product quantity updated" });
}

export async function DELETE(req: NextRequest) {
   try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      const token = req.cookies.get("cartToken")?.value;
      const sessionId = await getSessionId();

      if (!id) {
         return NextResponse.json(
            {
               message: "No product id",
            },
            { status: 400 },
         );
      }

      const userCart = await getUserCart(sessionId, token);

      if (!userCart) {
         return NextResponse.json({
            message: "Shopping cart not found",
         });
      }

      const cartItem = await getCartItem(userCart, Number(id));

      if (!cartItem) {
         return NextResponse.json(
            {
               message: "Product not found in shopping cart",
            },
            { status: 404 },
         );
      }

      await prisma.cartItem.delete({
         where: {
            id: Number(id),
         },
      });

      return NextResponse.json({ message: "Product deleted" });
   } catch (error) {
      return NextResponse.json(
         { message: "An error in receiving the products", error },
         { status: 500 },
      );
   }
}
