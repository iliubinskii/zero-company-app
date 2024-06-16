/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
        pathname: "/**",
        protocol: "https"
      }
    ]
  },
  productionBrowserSourceMaps: false
};

export default nextConfig;
