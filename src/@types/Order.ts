export interface OrderItem {
   size: {
      id: number;
      size: string;
   };
   productVariantOption: {
      imageUrl: string[];
      product: {
         id: number;
         name: string;
         description: string | null;
         imageUrl: string;
         productCategory: {
            id: number;
            name: string;
         };
      };
   };
   quantity: number;
   price: number;
}

export interface Order {
   id: number;
   address: string;
   status: string;
   comment: string | null;
   phone: string;
   totalAmount: number;
   items: OrderItem[];
}
