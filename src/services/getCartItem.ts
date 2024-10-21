import { Cart } from "@/@types/Cart";

export async function getCartItem(userCart: Pick<Cart, "items">, id: number) {
   return userCart.items.find(item => item.id === Number(id));
}
