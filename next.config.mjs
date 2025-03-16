/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "img.kitapyurdu.com",
      "www.panamayayincilik.com",
      "i.dr.com.tr",
      "cdn.idefix.com",
      "images-na.ssl-images-amazon.com",
      // Kitap kapağı URL'lerinin gelebileceği diğer domainler
    ],
  },
};

export default nextConfig;
