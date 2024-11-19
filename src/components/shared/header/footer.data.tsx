import { BadgePercent, PackagePlus, ShoppingBasket, Shirt } from "lucide-react";

export const burgerMenuData = [
   { name: "Top Selling", href: "top_selling" },
   { name: "On Sale", href: "on_sale" },
   { name: "New Arrivals", href: "new_arrivals" },
   { name: "Brands", href: "brands" },
];

export const menuData = [
   { name: "Shop", drop: true },
   { name: "On Sale", href: "on_sale", drop: false },
   { name: "New Arrivals", href: "new_arrivals", drop: false },
   { name: "Brands", href: "brands", drop: false },
];

export const navMenuData = [
   {
      name: "Top Selling",
      href: "top_selling",
      icon: <ShoppingBasket size={20} />,
   },
   { name: "On Sale", href: "on_sale", icon: <BadgePercent size={20} /> },
   {
      name: "New Arrivals",
      href: "new_arrivals",
      icon: <PackagePlus size={20} />,
   },
   { name: "Brands", href: "brands", icon: <Shirt size={20} /> },
];
