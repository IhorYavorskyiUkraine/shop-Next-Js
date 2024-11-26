/** @type {import('next').NextConfig} */
const nextConfig = {
   async redirects() {
      return [
         {
            source: "/",
            destination: "/home",
            permanent: false,
         },
      ];
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "zs3zpsqnk3c0vmhn.public.blob.vercel-storage.com",
         },
      ],
   },
};

export default nextConfig;
