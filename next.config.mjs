/** @type {import('next').NextConfig} */

const nextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma"],
  images: {
    domains: [
      "img.kitapyurdu.com",
      "www.panamayayincilik.com",
      "i.dr.com.tr",
      "cdn.idefix.com",
      "images-na.ssl-images-amazon.com",
    ],
  },
};

export default nextConfig;
