import { prisma } from "../../prisma/PrismaClient";

export const createCartItem = async ({
   findCartItem,
   userCartId,
   productId,
   productVariantOptionId,
   quantity,
   sizeId,
}: {
   findCartItem: {
      id: number;
      cartId: number;
      productId: number;
      productVariantOptionId: number;
      sizeId: number;
      quantity: number;
      createdAt: Date;
      updatedAt: Date;
   } | null;
   userCartId: number;
   productId: number;
   productVariantOptionId: number;
   quantity: number;
   sizeId: number;
}) => {
   if (findCartItem) {
      await prisma.cartItem.update({
         where: {
            id: findCartItem.id,
         },
         data: {
            quantity:
               findCartItem.quantity === quantity ? quantity + 1 : quantity,
         },
      });
   } else {
      await prisma.cartItem.create({
         data: {
            cartId: userCartId,
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
   }
};
