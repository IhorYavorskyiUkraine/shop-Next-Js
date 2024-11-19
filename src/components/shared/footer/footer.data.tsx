import { Facebook, Github, Instagram, Twitter } from "lucide-react";

export const socialLogos = [
   {
      name: "x",
      logo: <Twitter size={16} />,
      href: "x.com",
   },
   {
      name: "facebook",
      logo: <Facebook size={16} color={"white"} />,
      href: "facebook.com",
   },
   {
      name: "instagram",
      logo: <Instagram size={16} />,
      href: "instagram.com",
   },
   {
      name: "github",
      logo: <Github size={16} />,
      href: "github.com",
   },
];

export const menuData = [
   {
      title: "Company",
      name: [
         { name: "About", link: "/about" },
         { name: "Features", link: "/features" },
         { name: "Works", link: "/works" },
         { name: "Career", link: "/career" },
      ],
   },
   {
      title: "Help",
      name: [
         { name: "Customer Support", link: "/customer_support" },
         { name: "Delivery Details", link: "/delivery_details" },
         { name: "Terms & Conditions", link: "/terms&conditions" },
         { name: "Privacy Policy", link: "/privacy_policy" },
      ],
   },
   {
      title: "FAQ",
      name: [
         { name: "Account", link: "/account" },
         { name: "Manage Deliveries", link: "/manage_deliveries" },
         { name: "Orders", link: "/orders" },
         { name: "Payments", link: "/payments" },
      ],
   },
   {
      title: "Resources",
      name: [
         { name: "Free eBooks", link: "/free_ebooks" },
         { name: "Development Tutorial", link: "/development_tutorial" },
         { name: "How to - Blog", link: "/how_to_Blog" },
         { name: "Youtube Playlist", link: "/youtube_playlist" },
      ],
   },
];

export const payments = [
   { name: "Visa", image: "/images/footer/1.svg" },
   { name: "MasterCard", image: "/images/footer/2.svg" },
   { name: "PayPal", image: "/images/footer/3.svg" },
   { name: "Apple Pay", image: "/images/footer/4.svg" },
   { name: "Google Pay", image: "/images/footer/5.svg" },
];
