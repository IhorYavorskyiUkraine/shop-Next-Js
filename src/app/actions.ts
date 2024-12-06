"use server";

import { Cart } from "@/@types/Cart";
import { OrderInput } from "@/@types/CheckOut";
import { UpdateUserProfileData } from "@/@types/Profile";
import { PayOrderTemplate } from "@/components/shared/emailTemplates/PayOrderTemplate";
import { VerificationUserTemplate } from "@/components/shared/emailTemplates/VerificationUserTemplate";
import { getUser, sendEmail, setFalseActiveAddress } from "@/lib";
import { AddressFormValues } from "@/lib/constants";
import { getSessionId } from "@/lib/getSessionId";
import { getUserCart } from "@/services";
import { OrderStatus, Prisma } from "@prisma/client";
import { prisma } from "@prisma/PrismaClient";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function registerUser(data: Prisma.UserCreateInput) {
   try {
      const user = await prisma.user.findFirst({
         where: {
            email: data.email,
         },
      });

      if (user) {
         if (!user?.verified) {
            throw new Error("User is not verified");
         }
         throw new Error("User already exists");
      }

      const newUser = await prisma.user.create({
         data: {
            email: data.email,
            fullName: data.fullName,
            password: hashSync(data.password, 10),
         },
      });

      const code = (Math.floor(Math.random() * 9000) + 1000).toString();

      await prisma.verificationCode.create({
         data: {
            userId: newUser.id,
            code,
         },
      });

      await sendEmail(
         newUser.email,
         "SHOP.CO | 📝 Verify Email",
         VerificationUserTemplate({
            code,
         }),
      );
   } catch (e) {
      console.error(e);
   }
}

export async function updateCartTotalAmount(
   userCart: Cart | null,
   userId?: number | null,
) {
   try {
      if (!userCart) {
         throw new Error("No cart found");
      }

      const totalCartPrice =
         userCart.items?.reduce((total, item) => {
            const itemPrice = item.productVariantOption?.price || 0;
            return total + itemPrice * item.quantity;
         }, 0) ?? 0;

      const ordersCount = await prisma.order.count({
         where: { userId },
      });

      const discount = ordersCount > 0 ? 0 : totalCartPrice * 0.2;
      const deliveryFee = 15;
      const totalAmount = Math.max(
         totalCartPrice - discount + (totalCartPrice > 0 ? deliveryFee : 0),
         0,
      );

      await prisma.cart.update({
         where: {
            id: userCart.id,
         },
         data: { totalAmount },
      });
   } catch (e) {
      console.error(e);
   }
}

export async function createOrder(
   data: OrderInput,
   fullName: string,
   firstOrder = false,
) {
   try {
      const cookieStore = cookies();
      const sessionId = await getSessionId();
      const token = cookieStore.get("cartToken")?.value;

      if (!token) {
         throw new Error("No token found");
      }

      const userCart = await getUserCart(sessionId, token);

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
            userId: sessionId,
            token,
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
            fullName,
            firstOrder,
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
            fullName,
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

export async function updateUserProfile(data: UpdateUserProfileData) {
   try {
      const sessionId = await getSessionId();

      const user = await getUser(sessionId);

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
            password: data.password
               ? hashSync(data.password, 10)
               : user?.password,
         },
      });
   } catch (e) {
      console.error(e);
   }
}

export async function createUserAddress(
   data: AddressFormValues,
   userId: number,
) {
   try {
      if (!userId || !data) {
         throw new Error("User ID or data is missing");
      }

      const addressBook = await prisma.userAddressBook.findFirst({
         where: { userId },
      });

      await setFalseActiveAddress();

      await prisma.address.create({
         data: {
            fullName: `${data.firstName} ${data.lastName}`,
            phone: data.phone,
            city: data.city,
            street: data.street,
            house: data.house,
            apartment: data.apartment || "",
            postcode: data.postcode,
            addressBookId: addressBook!.id,
            active: true,
         },
      });
   } catch (e) {
      console.error(e);
   }
}

export async function updateUserAddress(data: AddressFormValues, id: number) {
   return await prisma.address.update({
      where: { id },
      data: {
         fullName: `${data.firstName} ${data.lastName}`,
         phone: data.phone,
         city: data.city,
         street: data.street,
         house: data.house,
         apartment: data.apartment,
         postcode: data.postcode,
      },
   });
}

export async function isFirstOrder(userId?: number, email?: string) {
   if (!userId && !email) {
      throw new Error("userId или email обязательны");
   }

   const whereClause = userId ? { userId } : { email };
   const ordersCount = await prisma.order.count({
      where: whereClause,
   });

   return ordersCount === 0;
}
