export async function isProductBought(userOrders: any, productId: number) {
   const isBought = userOrders.some((order: any) =>
      // order.status === "delivered" &&
      order.items.some((item: any) => item.id === productId),
   );

   return isBought;
}
