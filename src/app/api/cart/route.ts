import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/PrismaClient";
import { getUserSession } from "@/lib/getUserSession";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
   try {
      const token = req.cookies.get("cartToken")?.value;
      const session = await getUserSession();
      let newToken = token;

      if (!token && !session) {
         newToken = randomUUID();

         const response = NextResponse.json({
            cart: [],
         });

         response.cookies.set("cartToken", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
         });

         return response;
      }

      const whereClause = session
         ? { userId: Number(session.id) }
         : { token: newToken };

      const userCart = await prisma.cart.findFirst({
         where: whereClause,
         include: {
            items: {
               orderBy: {
                  createdAt: "desc",
               },
               include: {
                  product: true,
                  productVariantOption: {
                     include: {
                        sizes: true,
                        color: true,
                     },
                  },
                  size: true,
               },
            },
         },
      });

      if (!userCart) {
         await prisma.cart.create({
            data: {
               token: newToken,
               userId: session ? Number(session.id) : undefined,
            },
         });
      }

      return NextResponse.json(userCart);
   } catch (error) {
      return NextResponse.json(
         { message: "Ошибка при получении продуктов", error },
         { status: 500 },
      );
   }
}

export async function POST(req: NextRequest) {
   try {
      const token = req.cookies.get("cartToken")?.value;
      const session = await getUserSession();

      let newToken = token;

      if (!token && !session) {
         newToken = randomUUID();
         const response = NextResponse.json({});
         response.cookies.set("cartToken", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
         });
         return response;
      }

      const whereClause = session
         ? { userId: Number(session.id) }
         : { token: newToken };

      const userCart =
         (await prisma.cart.findFirst({ where: whereClause })) ||
         (await prisma.cart.create({
            data: {
               token: newToken,
               userId: session ? Number(session.id) : undefined,
            },
         }));

      if (!userCart) {
         return NextResponse.json(
            { message: "Корзина не найдена" },
            { status: 404 },
         );
      }

      const body = await req.json();

      const { productId, productVariantOptionId, quantity, sizeId } = body;

      const cartItem = await prisma.cartItem.create({
         data: {
            cartId: userCart.id,
            productId,
            productVariantOptionId,
            quantity,
            sizeId,
         },
         include: {
            product: true,
            productVariantOption: {
               include: {
                  color: true,
               },
            },
            size: true,
         },
      });

      return NextResponse.json(cartItem);
   } catch (error) {
      return NextResponse.json(
         { message: "Ошибка при получении продуктов", error },
         { status: 500 },
      );
   }
}

export async function PATCH(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id");
   const quantity = searchParams.get("quantity");

   if (!id ?? !quantity) {
      return NextResponse.json(
         {
            message: "Идентификатор товара не указан",
         },
         { status: 400 },
      );
   }

   const token = req.cookies.get("cartToken")?.value;
   const session = await getUserSession();

   const whereClause = session ? { userId: Number(session.id) } : { token };

   const userCart = await prisma.cart.findFirst({
      where: whereClause,
      include: {
         items: true,
      },
   });

   if (!userCart) {
      return NextResponse.json({
         message: "Корзина не найдена",
      });
   }

   const cartItem = userCart.items.find(item => item.id === Number(id));

   if (!cartItem) {
      return NextResponse.json(
         {
            message: "Товар не найден в корзине",
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

   return NextResponse.json({ message: "Товар удален из корзины" });
}

export async function DELETE(req: NextRequest) {
   try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id) {
         return NextResponse.json(
            {
               message: "Идентификатор товара не указан",
            },
            { status: 400 },
         );
      }

      const token = req.cookies.get("cartToken")?.value;
      const session = await getUserSession();

      const whereClause = session ? { userId: Number(session.id) } : { token };

      const userCart = await prisma.cart.findFirst({
         where: whereClause,
         include: {
            items: true,
         },
      });

      if (!userCart) {
         return NextResponse.json({
            message: "Корзина не найдена",
         });
      }

      const cartItem = userCart.items.find(item => item.id === Number(id));

      if (!cartItem) {
         return NextResponse.json(
            {
               message: "Товар не найден в корзине",
            },
            { status: 404 },
         );
      }

      await prisma.cartItem.delete({
         where: {
            id: Number(id),
         },
      });

      return NextResponse.json({ message: "Товар удален из корзины" });
   } catch (error) {
      return NextResponse.json(
         { message: "Ошибка при удалении продукта", error },
         { status: 500 },
      );
   }
}
