export async function getCartItem(userCart: any, id: number) {
   return userCart.items.find(item => item.id === Number(id));
}
