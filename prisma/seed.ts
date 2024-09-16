import { prisma } from "./PrismaClient";
import { categories, colors, dressStyle, sizes } from "./products";

const randomPrice = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

async function up() {
   await Promise.all([
      prisma.category.createMany({ data: categories }),
      prisma.dressStyle.createMany({ data: dressStyle }),
      prisma.size.createMany({ data: sizes }),
      prisma.color.createMany({ data: colors }),
   ]);

   await prisma.product.create({
      data: {
         name: "T-Shirt",
         categoryId: 1,
         dressStyleId: 2,
         productVariants: {
            create: [
               {
                  description: "T-SHIRT WITH TAPE DETAILS",
                  imageUrl: "/images/tshirt_black.png",
                  price: 17.99,
                  oldPrice: 20.0,
                  productVariantOptions: {
                     create: [
                        {
                           colorId: 1,
                           sizes: {
                              connect: [{ id: 1 }, { id: 2 }],
                           },
                           price: 19.99,
                           imageUrl: [
                              "/images/tshirt_black.png",
                              "/images/tshirt_black.png",
                              "/images/tshirt_black.png",
                           ],
                           stockQuantity: 100,
                        },
                        {
                           colorId: 2,
                           sizes: {
                              connect: [{ id: 1 }, { id: 2 }],
                           },
                           price: 21.99,
                           stockQuantity: 50,
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   // const productVariants = [
   //    {
   //       price: randomPrice(100, 119),
   //       description: "Чёрная футболка из хлопка",
   //       imageUrl: "/images/newArrivals/1/1_black_1.png",
   //       productId: 1,
   //       oldPrice: 120,
   //       sizes: [{ id: 1 }, { id: 2 }],
   //       color: { id: 1 },
   //       images: [
   //          { imageUrl: "/images/newArrivals/1/1_black_1.png" },
   //          { imageUrl: "/images/newArrivals/1/1_black_2.png" },
   //          { imageUrl: "/images/newArrivals/1/1_black_3.png" },
   //       ],
   //    },
   //    {
   //       price: randomPrice(100, 119),
   //       description: "Синяя футболка из хлопка",
   //       imageUrl: "/images/newArrivals/1/1_blue.png",
   //       productId: 1,
   //       oldPrice: 120,
   //       sizes: [{ id: 2 }, { id: 3 }],
   //       colors: [{ id: 2 }, { id: 3 }],
   //       images: [
   //          { imageUrl: "/images/newArrivals/1/1_blue.png" },
   //          { imageUrl: "/images/newArrivals/1/1_blue.png" },
   //          { imageUrl: "/images/newArrivals/1/1_blue.png" },
   //       ],
   //    },
   //    {
   //       price: randomPrice(80, 100),
   //       description: "Белая футболка из хлопка",
   //       imageUrl: "/images/newArrivals/1/1_blue.png",
   //       productId: 1,
   //       sizes: [{ id: 2 }, { id: 3 }],
   //       colors: [{ id: 2 }, { id: 3 }],
   //       images: [
   //          { imageUrl: "/images/newArrivals/1/1_white.png" },
   //          { imageUrl: "/images/newArrivals/1/1_white.png" },
   //          { imageUrl: "/images/newArrivals/1/1_white.png" },
   //       ],
   //    },
   // ];

   // for (const variant of productVariants) {
   //    await prisma.productVariant.create({
   //       data: {
   //          price: variant.price,
   //          description: variant.description,
   //          imageUrl: variant.imageUrl,
   //          oldPrice: variant.oldPrice,
   //          product: {
   //             connect: { id: variant.productId },
   //          },
   //          sizes: {
   //             connect: variant.sizes,
   //          },
   //          color: {
   //             connect: variant.colors,
   //          },
   //          images: {
   //             create: variant.images,
   //          },
   //       },
   //    });
   // }
}

async function down() {
   await prisma.$executeRaw`TRUNCATE TABLE 
      "User", 
      "Cart", 
      "CartItem", 
      "Order", 
      "OrderItem", 
      "Product", 
      "ProductVariant", 
      "Category", 
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
