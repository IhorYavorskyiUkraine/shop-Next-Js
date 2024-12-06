import { Cart } from "@/@types/Cart";
import { updateCartTotalAmount } from "@/app/actions";
import { getSessionId } from "@/lib/getSessionId";
import {
   createCartItem,
   createCartToken,
   createUserCart,
   getCartItem,
   getUserCart,
} from "@/services";
import { prisma } from "@prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   try {
      const token = req.cookies.get("cartToken")?.value;
      const sessionId = await getSessionId();
      let newToken = token;

      if (!token) {
         const { response, newToken: createdToken } = await createCartToken();
         newToken = createdToken;
         return response;
      }

      const userCart =
         (await getUserCart(sessionId, newToken)) ||
         (await createUserCart(sessionId, newToken));

      if (userCart) {
         await updateCartTotalAmount(userCart as Cart, sessionId);
      }

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

      if (!token) {
         return NextResponse.json(
            { message: "No valid identifier for cart" },
            { status: 404 },
         );
      }

      const userCart = await getUserCart(sessionId, token);

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
   const productId = searchParams.get("id");
   const quantity = searchParams.get("quantity");
   const token = req.cookies.get("cartToken")?.value;
   const sessionId = await getSessionId();

   if (!productId) {
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

   const cartItem = await getCartItem(userCart, Number(productId));

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
         id: Number(productId),
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
      const productId = searchParams.get("id");
      const token = req.cookies.get("cartToken")?.value;
      const sessionId = await getSessionId();

      if (!productId) {
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

      const cartItem = await getCartItem(userCart, Number(productId));

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
            id: Number(productId),
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
