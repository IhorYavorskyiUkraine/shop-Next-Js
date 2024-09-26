import { UserRole } from "@prisma/client";

interface Author {
   id: number;
   fullName: string;
   email: string;
   password: string;
   role: UserRole;
   createdAt: string;
   updatedAt?: string;
}

interface Purchase {
   id: number;
   userId: number;
   productId: number;
   purchaseDate: Date;
}

export interface Review {
   id: number;
   authorId: number;
   productId: number;
   purchaseId: number;
   purchase: Purchase;
   rating: number;
   author: Author;
   text: string;
   createdAt: Date;
   updatedAt?: Date;
}
