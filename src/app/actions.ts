"use server";

import { getUserSession } from "@/lib/getUserSession";
import { getUserCart } from "@/services/getUserCart";
import { cookies } from "next/headers";
import { prisma } from "../../prisma/PrismaClient";
import { OrderStatus } from "@prisma/client";
import { sendEmail } from "@/lib/sendEmail";
import { PayOrderTemplate } from "@/components/shared/emailTemplates/PayOrderTemplate";
import { getUser } from "@/lib/getUser";

export async function updateCartTotalAmount(userCart: any) {
   try {
      if (!userCart) {
         throw new Error("No cart found");
      }

      const totalCartPrice =
         userCart.items?.reduce((total, item) => {
            const itemPrice = item.productVariantOption?.price || 0;
            return total + itemPrice * item.quantity;
         }, 0) || 0;
      const discount = totalCartPrice * 0.2;
      const deliveryFee = 15;
      const totalAmount =
         totalCartPrice - discount + (totalCartPrice > 0 ? deliveryFee : 0) ||
         0;

      await prisma.cart.update({
         where: {
            id: userCart.id,
         },
         data: {
            totalAmount: totalAmount || 0,
         },
      });
   } catch (e) {
      console.error(e);
   }
}

export async function createOrder(data: any) {
   try {
      const cookieStore = cookies();
      const session = await getUserSession();
      const token = cookieStore.get("cartToken")?.value;

      if (!token) {
         throw new Error("No token found");
      }

      const userCart = await getUserCart(Number(session?.id), token);

      if (!userCart) {
         throw new Error("No cart found");
      }

      if (userCart?.items.length === 0) {
         throw new Error("Cart is empty");
      }

      await updateCartTotalAmount(userCart);

      const updatedCart = await prisma.cart.findFirst({
         where: { id: userCart.id },
      });

      if (!updatedCart) {
         throw new Error("Failed to retrieve updated cart");
      }

      const order = await prisma.order.create({
         data: {
            userId: Number(session?.id),
            token: token,
            totalAmount: updatedCart.totalAmount,
            status: OrderStatus.PENDING,
            items: {
               create: userCart.items.map(item => ({
                  productVariantOptionId: item.productVariantOptionId,
                  quantity: item.quantity,
                  price: item.productVariantOption.price,
                  sizeId: item.sizeId,
               })),
            },
            fullName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: data.address,
            comment: data.comment,
         },
      });

      await prisma.cart.update({
         where: {
            id: userCart.id,
         },
         data: {
            items: {
               deleteMany: {},
            },
            totalAmount: 0,
         },
      });

      await sendEmail(
         data.email,
         "New order",
         PayOrderTemplate({
            firstName: data.firstName,
            orderId: order.id,
            orderTotal: updatedCart.totalAmount,
            paymentLink: "https://example.com",
         }),
      );

      return "http://localhost:3000/profile";
   } catch (e) {
      console.error(e);
   }
}

export async function updateUserProfile(data: any) {
   try {
      const session = await getUserSession();

      if (!session) {
         throw new Error("No session found");
      }

      const user = await getUser(Number(session.id));

      if (!user) {
         throw new Error("No user found");
      }

      await prisma.user.update({
         where: {
            id: user.id,
         },
         data: {
            fullName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: data.address,
         },
      });
   } catch (e) {
      console.error(e);
   }
}
