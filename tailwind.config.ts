import type { Config } from "tailwindcss";

const config: Config = {
   darkMode: ["class"],
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         fontFamily: {
            "satoshi-r": ["Satoshi-Regular", "sans-serif"],
            "satoshi-m": ["Satoshi-Medium", "sans-serif"],
            "satoshi-b": ["Satoshi-Bold", "sans-serif"],
            "integral-b": ["IntegralCF-Bold", "sans-serif"],
         },
         fontSize: {
            xs: "0.75rem", //  12px
            sm: "0.875rem", //  14px
            md: "1rem", //  16px
            lg: "1.25rem", //  20px
            xl: "1.5rem", //  24px
            "2xl": "2rem", //  32px
            "3xl": "2.25rem", //  36px
            "4xl": "2.5rem", //  40px
            "5xl": "3rem", //  48px
            "6xl": "4rem", //  64px
         },
         lineHeight: {
            19: "19px",
            22: "22px",
            30: "30px",
         },
         fontWeight: {
            hairline: "100",
            thin: "200",
            light: "300",
            normal: "400",
            medium: "500",
            semibold: "600",
            bold: "700",
            extrabold: "800",
            black: "900",
         },
         colors: {
            gray: "#F0F0F0",
         },
      },
   },
   plugins: [require("tailwindcss-animate")],
};
export default config;
