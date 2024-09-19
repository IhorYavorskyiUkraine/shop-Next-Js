import { hashSync } from "bcrypt";
import { prisma } from "./PrismaClient";
import {
   categories,
   productCategories,
   colors,
   dressStyle,
   sizes,
} from "./products";

const randomPrice = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

async function up() {
   await Promise.all([
      prisma.category.createMany({ data: categories }),
      prisma.productCategory.createMany({ data: productCategories }),
      prisma.dressStyle.createMany({ data: dressStyle }),
      prisma.size.createMany({ data: sizes }),
      prisma.color.createMany({ data: colors }),
   ]);

   const user1 = await prisma.user.create({
      data: {
         id: 1,
         fullName: "John Doe",
         email: "john.doe1@example.com",
         password: hashSync("password123", 10),
         role: "USER",
      },
   });

   await prisma.product.create({
      data: {
         name: "Skinny Fit Jeans",
         productCategoryId: 5,
         categoryId: 1,
         dressStyleId: 1,
         description: "Skinny Fit Jeans",
         imageUrl: "/images/newArrivals/2/2_blue.png",
         price: randomPrice(220, 250),
         oldPrice: 260,
         rating: 3.5,
         productVariantOptions: {
            create: [
               {
                  colorId: 5,
                  sizes: {
                     connect: [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                        { id: 4 },
                        { id: 5 },
                     ],
                  },
                  price: randomPrice(220, 250),
                  imageUrl: [
                     "/images/newArrivals/2/2_blue.png",
                     "/images/newArrivals/2/2_blue.png",
                     "/images/newArrivals/2/2_blue.png",
                  ],
                  stockQuantity: 100,
               },
               {
                  colorId: 8,
                  sizes: {
                     connect: [{ id: 1 }, { id: 2 }, { id: 5 }],
                  },
                  price: randomPrice(220, 250),
                  imageUrl: [
                     "/images/newArrivals/2/2_black.png",
                     "/images/newArrivals/2/2_black.png",
                     "/images/newArrivals/2/2_black.png",
                  ],
                  stockQuantity: 50,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Checkered Shirt",
         productCategoryId: 3,
         categoryId: 1,
         dressStyleId: 1,
         description: "Checkered Shirt",
         imageUrl: "/images/newArrivals/3/3_red.png",
         price: randomPrice(180, 190),
         rating: 4.5,
         productVariantOptions: {
            create: [
               {
                  colorId: 1,
                  sizes: {
                     connect: [{ id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }],
                  },
                  price: randomPrice(170, 189),
                  oldPrice: 190,
                  imageUrl: [
                     "/images/newArrivals/3/3_red.png",
                     "/images/newArrivals/3/3_red.png",
                     "/images/newArrivals/3/3_red.png",
                  ],
                  stockQuantity: 100,
               },
               {
                  colorId: 5,
                  sizes: {
                     connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
                  },
                  price: randomPrice(180, 190),
                  imageUrl: [
                     "/images/newArrivals/3/3_blue.png",
                     "/images/newArrivals/3/3_blue.png",
                     "/images/newArrivals/3/3_blue.png",
                  ],
                  stockQuantity: 50,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Sleeve Striped T-shirt",
         productCategoryId: 1,
         categoryId: 1,
         dressStyleId: 4,
         description: "Sleeve Striped T-shirt",
         imageUrl: "/images/newArrivals/4/4_orange.png",
         price: randomPrice(130, 140),
         oldPrice: 160,
         rating: 4.5,
         productVariantOptions: {
            create: [
               {
                  colorId: 2,
                  sizes: {
                     connect: [{ id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }],
                  },
                  price: randomPrice(130, 140),
                  oldPrice: 160,
                  imageUrl: [
                     "/images/newArrivals/4/4_orange.png",
                     "/images/newArrivals/4/4_orange.png",
                     "/images/newArrivals/4/4_orange.png",
                  ],
                  stockQuantity: 100,
               },
               {
                  colorId: 1,
                  sizes: {
                     connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
                  },
                  price: randomPrice(140, 160),
                  imageUrl: [
                     "/images/newArrivals/4/4_red.png",
                     "/images/newArrivals/4/4_red.png",
                     "/images/newArrivals/4/4_red.png",
                  ],
                  stockQuantity: 50,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Polo with Contrast Trims",
         productCategoryId: 1,
         categoryId: 1,
         dressStyleId: 1,
         description: "Polo with Contrast Trims",
         imageUrl: "/images/newArrivals/5/5_navy.png",
         price: randomPrice(210, 230),
         oldPrice: 242,
         rating: 4,
         productVariantOptions: {
            create: [
               {
                  colorId: 18,
                  sizes: {
                     connect: [{ id: 1 }, { id: 4 }, { id: 5 }],
                  },
                  price: randomPrice(210, 230),
                  oldPrice: 242,
                  imageUrl: [
                     "/images/newArrivals/5/5_navy.png",
                     "/images/newArrivals/5/5_navy.png",
                     "/images/newArrivals/5/5_navy.png",
                  ],
                  stockQuantity: 100,
               },
               {
                  colorId: 10,
                  sizes: {
                     connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
                  },
                  price: randomPrice(210, 230),
                  oldPrice: 242,
                  imageUrl: [
                     "/images/newArrivals/5/5_gray.png",
                     "/images/newArrivals/5/5_gray.png",
                     "/images/newArrivals/5/5_gray.png",
                  ],
                  stockQuantity: 50,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Gradient Graphic T-shirt",
         productCategoryId: 1,
         categoryId: 1,
         dressStyleId: 3,
         description: "Gradient Graphic T-shirt",
         imageUrl: "/images/newArrivals/6/6_white.png",
         price: randomPrice(140, 150),
         rating: 3.5,
         productVariantOptions: {
            create: [
               {
                  colorId: 9,
                  sizes: {
                     connect: [{ id: 1 }, { id: 4 }, { id: 5 }],
                  },
                  price: randomPrice(130, 140),
                  oldPrice: 160,
                  imageUrl: [
                     "/images/newArrivals/6/6_white.png",
                     "/images/newArrivals/6/6_white.png",
                     "/images/newArrivals/6/6_white.png",
                  ],
                  stockQuantity: 100,
               },
               {
                  colorId: 10,
                  sizes: {
                     connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
                  },
                  price: randomPrice(130, 140),
                  oldPrice: 150,
                  imageUrl: [
                     "/images/newArrivals/6/6_gray.png",
                     "/images/newArrivals/6/6_gray.png",
                     "/images/newArrivals/6/6_gray.png",
                  ],
                  stockQuantity: 50,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Polo with Tipping Details",
         productCategoryId: 1,
         categoryId: 1,
         dressStyleId: 1,
         description: "Polo with Tipping Details",
         imageUrl: "/images/newArrivals/7/7_pink.png",
         price: randomPrice(170, 180),
         rating: 4.5,
         productVariantOptions: {
            create: [
               {
                  colorId: 13,
                  sizes: {
                     connect: [{ id: 1 }, { id: 4 }, { id: 5 }],
                  },
                  price: randomPrice(170, 180),
                  oldPrice: 190,
                  imageUrl: [
                     "/images/newArrivals/7/7_pink.png",
                     "/images/newArrivals/7/7_pink.png",
                     "/images/newArrivals/7/7_pink.png",
                  ],
                  stockQuantity: 100,
               },
               {
                  colorId: 10,
                  sizes: {
                     connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
                  },
                  price: randomPrice(170, 180),
                  oldPrice: 190,
                  imageUrl: [
                     "/images/newArrivals/7/7_gray.png",
                     "/images/newArrivals/7/7_gray.png",
                     "/images/newArrivals/7/7_gray.png",
                  ],
                  stockQuantity: 50,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Striped Sleeve Polo",
         productCategoryId: 1,
         categoryId: 1,
         dressStyleId: 1,
         description: "Striped Sleeve Polo",
         imageUrl: "/images/newArrivals/8/8_gray.png",
         price: randomPrice(160, 170),
         oldPrice: 185,
         rating: 4,
         productVariantOptions: {
            create: [
               {
                  colorId: 10,
                  sizes: {
                     connect: [{ id: 1 }, { id: 4 }, { id: 5 }],
                  },
                  price: randomPrice(160, 170),
                  oldPrice: 185,
                  imageUrl: [
                     "/images/newArrivals/8/8_gray.png",
                     "/images/newArrivals/8/8_gray.png",
                     "/images/newArrivals/8/8_gray.png",
                  ],
                  stockQuantity: 100,
               },
               {
                  colorId: 8,
                  sizes: {
                     connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
                  },
                  price: randomPrice(170, 180),
                  oldPrice: 190,
                  imageUrl: [
                     "/images/newArrivals/8/8_black.png",
                     "/images/newArrivals/8/8_black.png",
                     "/images/newArrivals/8/8_black.png",
                  ],
                  stockQuantity: 50,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Vertical Striped Shirt",
         productCategoryId: 3,
         categoryId: 2,
         dressStyleId: 2,
         description: "Vertical Striped Shirt",
         imageUrl: "/images/topSelling/1.png",
         price: 220,
         oldPrice: 232,
         rating: 5,
         productVariantOptions: {
            create: [
               {
                  colorId: 8,
                  sizes: {
                     connect: [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                        { id: 4 },
                        { id: 5 },
                     ],
                  },
                  price: 220,
                  imageUrl: [
                     "/images/topSelling/1/black_1.png",
                     "/images/topSelling/1/black_2.png",
                     "/images/topSelling/1/black_3.png",
                  ],
                  stockQuantity: 100,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Courage Graphic T-shirt",
         productCategoryId: 1,
         categoryId: 2,
         dressStyleId: 4,
         description: "Courage Graphic T-shirt",
         imageUrl: "/images/topSelling/2.png",
         price: 140,
         rating: 4,
         productVariantOptions: {
            create: [
               {
                  colorId: 9,
                  sizes: {
                     connect: [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                        { id: 4 },
                        { id: 5 },
                     ],
                  },
                  price: 140,
                  imageUrl: [
                     "/images/topSelling/2/white_1.png",
                     "/images/topSelling/2/white_2.png",
                     "/images/topSelling/2/white_3.png",
                  ],
                  stockQuantity: 100,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Loose Fit Bermuda Shorts",
         productCategoryId: 2,
         categoryId: 2,
         dressStyleId: 3,
         description: "Loose Fit Bermuda Shorts",
         imageUrl: "/images/topSelling/3.png",
         price: 80,
         rating: 4.5,
         productVariantOptions: {
            create: [
               {
                  colorId: 18,
                  sizes: {
                     connect: [{ id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }],
                  },
                  price: 80,
                  imageUrl: [
                     "/images/topSelling/3/navy_1.png",
                     "/images/topSelling/3/navy_2.png",
                     "/images/topSelling/3/navy_3.png",
                  ],
                  stockQuantity: 100,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Faded Skinny Jeans",
         productCategoryId: 5,
         categoryId: 2,
         dressStyleId: 1,
         description: "Faded Skinny Jeans",
         imageUrl: "/images/topSelling/4.png",
         price: 210,
         rating: 4.5,
         productVariantOptions: {
            create: [
               {
                  colorId: 5,
                  sizes: {
                     connect: [{ id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }],
                  },
                  price: 210,
                  imageUrl: [
                     "/images/topSelling/4/blue_1.png",
                     "/images/topSelling/4/blue_2.png",
                     "/images/topSelling/4/blue_3.png",
                  ],
                  stockQuantity: 100,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "T-shirt with Tape Details",
         productCategoryId: 1,
         categoryId: 2,
         dressStyleId: 2,
         description: "T-shirt with Tape Details",
         imageUrl: "/images/newArrivals/1/1_black.png",
         price: 120,
         rating: 4.5,
         productVariantOptions: {
            create: [
               {
                  colorId: 8,
                  sizes: {
                     connect: [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                        { id: 4 },
                        { id: 5 },
                     ],
                  },
                  price: 120,
                  imageUrl: [
                     "/images/newArrivals/1/1_black_1.png",
                     "/images/newArrivals/1/1_black_2.png",
                     "/images/newArrivals/1/1_black_3.png",
                  ],
                  stockQuantity: 100,
               },
               {
                  colorId: 5,
                  sizes: {
                     connect: [{ id: 1 }, { id: 2 }],
                  },
                  price: 120,
                  imageUrl: [
                     "/images/newArrivals/1/1_blue.png",
                     "/images/newArrivals/1/1_blue.png",
                     "/images/newArrivals/1/1_blue.png",
                  ],
                  stockQuantity: 50,
               },
               {
                  colorId: 9,
                  sizes: {
                     connect: [{ id: 1 }, { id: 3 }, { id: 4 }],
                  },
                  price: 120,
                  imageUrl: [
                     "/images/newArrivals/1/1_white.png",
                     "/images/newArrivals/1/1_white.png",
                     "/images/newArrivals/1/1_white.png",
                  ],
                  stockQuantity: 50,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Skinny Fit Jeans",
         productCategoryId: 5,
         categoryId: 2,
         dressStyleId: 1,
         description: "Skinny Fit Jeans",
         imageUrl: "/images/newArrivals/2/2_blue.png",
         price: randomPrice(220, 250),
         oldPrice: 260,
         rating: 3.5,
         productVariantOptions: {
            create: [
               {
                  colorId: 5,
                  sizes: {
                     connect: [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                        { id: 4 },
                        { id: 5 },
                     ],
                  },
                  price: randomPrice(220, 250),
                  imageUrl: [
                     "/images/newArrivals/2/2_blue.png",
                     "/images/newArrivals/2/2_blue.png",
                     "/images/newArrivals/2/2_blue.png",
                  ],
                  stockQuantity: 100,
               },
               {
                  colorId: 8,
                  sizes: {
                     connect: [{ id: 1 }, { id: 2 }, { id: 5 }],
                  },
                  price: randomPrice(220, 250),
                  imageUrl: [
                     "/images/newArrivals/2/2_black.png",
                     "/images/newArrivals/2/2_black.png",
                     "/images/newArrivals/2/2_black.png",
                  ],
                  stockQuantity: 50,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Checkered Shirt",
         productCategoryId: 3,
         categoryId: 2,
         dressStyleId: 1,
         description: "Checkered Shirt",
         imageUrl: "/images/newArrivals/3/3_red.png",
         price: randomPrice(180, 190),
         rating: 4.5,
         productVariantOptions: {
            create: [
               {
                  colorId: 1,
                  sizes: {
                     connect: [{ id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }],
                  },
                  price: randomPrice(170, 189),
                  oldPrice: 190,
                  imageUrl: [
                     "/images/newArrivals/3/3_red.png",
                     "/images/newArrivals/3/3_red.png",
                     "/images/newArrivals/3/3_red.png",
                  ],
                  stockQuantity: 100,
               },
               {
                  colorId: 5,
                  sizes: {
                     connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
                  },
                  price: randomPrice(180, 190),
                  imageUrl: [
                     "/images/newArrivals/3/3_blue.png",
                     "/images/newArrivals/3/3_blue.png",
                     "/images/newArrivals/3/3_blue.png",
                  ],
                  stockQuantity: 50,
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: "Sleeve Striped T-shirt",
         productCategoryId: 1,
         categoryId: 2,
         dressStyleId: 4,
         description: "Sleeve Striped T-shirt",
         imageUrl: "/images/newArrivals/4/4_orange.png",
         price: randomPrice(130, 140),
         oldPrice: 160,
         rating: 4.5,
         productVariantOptions: {
            create: [
               {
                  colorId: 2,
                  sizes: {
                     connect: [{ id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }],
                  },
                  price: randomPrice(130, 140),
                  oldPrice: 160,
                  imageUrl: [
                     "/images/newArrivals/4/4_orange.png",
                     "/images/newArrivals/4/4_orange.png",
                     "/images/newArrivals/4/4_orange.png",
                  ],
                  stockQuantity: 100,
               },
               {
                  colorId: 1,
                  sizes: {
                     connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
                  },
                  price: randomPrice(140, 160),
                  imageUrl: [
                     "/images/newArrivals/4/4_red.png",
                     "/images/newArrivals/4/4_red.png",
                     "/images/newArrivals/4/4_red.png",
                  ],
                  stockQuantity: 50,
               },
            ],
         },
      },
   });

   await prisma.purchase.create({
      data: {
         user: {
            connect: { id: 1 },
         },
         product: {
            connect: { id: 1 },
         },
      },
   });

   await prisma.purchase.create({
      data: {
         user: {
            connect: { id: 1 },
         },
         product: {
            connect: { id: 2 },
         },
      },
   });

   await prisma.review.create({
      data: {
         rating: 5,
         text: "Amazing product, highly recommend!",
         author: {
            connect: { id: 1 },
         },
         product: {
            connect: { id: 1 },
         },
         purchase: {
            connect: { id: 1 },
         },
      },
   });

   await prisma.review.create({
      data: {
         rating: 5,
         text: "Amazing product, highly recommend!",
         author: {
            connect: { id: 1 },
         },
         product: {
            connect: { id: 2 },
         },
         purchase: {
            connect: { id: 2 },
         },
      },
   });
}

async function down() {
   await prisma.$executeRaw`TRUNCATE TABLE 
      "User", 
      "Cart", 
      "CartItem", 
      "Order", 
		"Purchase",
		"Review",
      "OrderItem", 
      "Product", 
      "ProductVariantOption", 
      "Category", 
		"ProductCategory", 
      "DressStyle", 
      "Size", 
      "Color" 
      RESTART IDENTITY CASCADE`;
}

async function main() {
   try {
      await down();
      await up();
   } catch (error) {
      console.log(error);
   }
}

main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async e => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
